/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace ts {
export namespace ArkTSLinter_1_1 {

function makeDiag(category: DiagnosticCategory, code: number, file: SourceFile, start: number, length: number, messageText: string): Diagnostic {
  return { category, code, file, start, length, messageText };
}

export function translateDiag(srcFile: SourceFile, problemInfo: ProblemInfo): Diagnostic {
  const severity = (problemInfo.severity === Common.ProblemSeverity.ERROR ? DiagnosticCategory.Error : DiagnosticCategory.Warning);
  return makeDiag(severity, problemInfo.ruleTag, srcFile, problemInfo.start, (problemInfo.end - problemInfo.start + 1), problemInfo.rule);
}

export function runArkTSLinter(tsBuilderProgram: BuilderProgram, srcFile?: SourceFile,
  buildInfoWriteFile?: WriteFileCallback, arkTSVersion?: string): Diagnostic[] {
  TypeScriptLinter.errorLineNumbersString = "";
  TypeScriptLinter.warningLineNumbersString = "";
  InteropTypescriptLinter.errorLineNumbersString = '';
  InteropTypescriptLinter.warningLineNumbersString = '';
  let diagnostics: Diagnostic[] = [];

  LinterConfig.initStatic();

  // Retrieve list of changed files from the old program state. This needs
  // to be done before re-evaluating program diagnostics through the call
  // 'tscDiagnosticsLinter.doAllGetDiagnostics()' below, as it will update
  // program state, clearing the changedFiles list.
  let programState = tsBuilderProgram.getState();
  const oldDiagnostics = programState.arktsLinterDiagnosticsPerFile;
  programState.arktsLinterDiagnosticsPerFile = new Map();

  const tscDiagnosticsLinter = new TSCCompiledProgram(tsBuilderProgram);
  const program = tscDiagnosticsLinter.getProgram();
  const compilerOptions = program.getCompilerOptions();
  const changedFiles = collectChangedFilesFromProgramState(
    programState,
    arkTSVersion,
    compilerOptions.compatibleSdkVersion,
    compilerOptions.compatibleSdkVersionStage
  );
  // Set arkTSVersion info for file .tsbuildinfo.
  // File .tsbuildinfo.linter dosen't need to set arkTSVersion because it dosen't contain linter diagnostics.
  programState.arkTSVersion = arkTSVersion;
  // Record the compatible version information configured in 'build-profile.json5', 
  // so that incremental compilation needs to recheck all files when the configuration changes.
  programState.compatibleSdkVersion = compilerOptions.compatibleSdkVersion;
  programState.compatibleSdkVersionStage = compilerOptions.compatibleSdkVersionStage;

  const timePrinterInstance = ts.ArkTSLinterTimePrinter.getInstance();
  timePrinterInstance.appendTime(ts.TimePhase.INIT);

  tscDiagnosticsLinter.doAllGetDiagnostics();

  let srcFiles: SourceFile[] = [];
  if (!!srcFile) {
    srcFiles.push(srcFile);
  } else {
    srcFiles = program.getSourceFiles() as SourceFile[];
  }

  const tscStrictDiagnostics = getTscDiagnostics(tscDiagnosticsLinter, srcFiles.filter(file => changedFiles.has(file.resolvedPath)));
  timePrinterInstance.appendTime(ts.TimePhase.GET_TSC_DIAGNOSTICS);

  TypeScriptLinter.initGlobals();
  InteropTypescriptLinter.initGlobals();
  LibraryTypeCallDiagnosticCheckerNamespace.LibraryTypeCallDiagnosticChecker.instance.rebuildTscDiagnostics(tscStrictDiagnostics);

  for (const fileToLint of srcFiles) {
    if (fileToLint.scriptKind !== ScriptKind.ETS && fileToLint.scriptKind !== ScriptKind.TS) {
      continue;
    }

    let currentDiagnostics: Diagnostic[];
    if (changedFiles.has(fileToLint.resolvedPath)) {
      if (fileToLint.scriptKind === ScriptKind.ETS) {
        TypeScriptLinter.initStatic();
        const linter = new TypeScriptLinter(fileToLint, program, tscStrictDiagnostics);
        Utils.setTypeChecker(TypeScriptLinter.tsTypeChecker);
        linter.lint();

        // Get list of bad nodes from the current run.
        currentDiagnostics = tscStrictDiagnostics.get(normalizePath(fileToLint.fileName)) ?? [];
        TypeScriptLinter.problemsInfos.forEach((x) => currentDiagnostics.push(translateDiag(fileToLint, x)));
      } else {
        InteropTypescriptLinter.initStatic();
        const isKit = ts.getBaseFileName(fileToLint.fileName).indexOf('@kit.') === 0;
        const etsLoaderPath = program.getCompilerOptions().etsLoaderPath;
        const isInSdk = etsLoaderPath ? normalizePath(fileToLint.fileName).indexOf(resolvePath(etsLoaderPath, '../..')) === 0 : false;
        const isInOhModules = isOHModules(fileToLint.fileName);
        const tsImportSendableEnable = program.getCompilerOptions().tsImportSendableEnable;
        if (isKit || isInOhModules || (!tsImportSendableEnable && !isInSdk)) {
          continue;
        }
        const InteropLinter = new InteropTypescriptLinter(fileToLint, program, isInSdk);
        Utils.setTypeChecker(InteropTypescriptLinter.tsTypeChecker);
        InteropLinter.lint();

        currentDiagnostics = [];
        InteropTypescriptLinter.problemsInfos.forEach((x) => currentDiagnostics.push(translateDiag(fileToLint, x)));
      } 
    } else {
      // Get diagnostics from old run.
      currentDiagnostics = (oldDiagnostics?.get(fileToLint.resolvedPath) as Diagnostic[]) ?? [];
    }
    diagnostics.push(...currentDiagnostics);

    // Add linter diagnostics to new cache.
    programState.arktsLinterDiagnosticsPerFile.set(fileToLint.resolvedPath, currentDiagnostics);
  }
  timePrinterInstance.appendTime(ts.TimePhase.LINT);

  // Write tsbuildinfo file only after we cached the linter diagnostics.
  if (!!buildInfoWriteFile) {
    tscDiagnosticsLinter.getBuilderProgram().emitBuildInfo(buildInfoWriteFile);
    timePrinterInstance.appendTime(ts.TimePhase.EMIT_BUILD_INFO);
  }

  releaseReferences();

  return diagnostics;
}

// reclaiming memory for Hvigor with "no-parallel" and "daemon", .
function releaseReferences(): void {
  TypeScriptLinter.clearTsTypeChecker();
  InteropTypescriptLinter.clearTsTypeChecker();
  Utils.clearTypeChecker();
  Utils.clearTrueSymbolAtLocationCache();
  Utils.clearUtilsGlobalvariables();
  LibraryTypeCallDiagnosticCheckerNamespace.LibraryTypeCallDiagnosticChecker.instance.clear();
}

function collectChangedFilesFromProgramState(
  state: ReusableBuilderProgramState,
  arkTSVersion?: string,
  compatibleSdkVersion?: number,
  compatibleSdkVersionStage?: string
): Set<Path> {
  const changedFiles = new Set<Path>(state.changedFilesSet);

  // If old arkTSVersion from last run is not same current arkTSVersion from ets_loader,
  // the process all files in project.
  // The compatibleSdkVersion and compatibleSdkVersionStage is the same as arkTSVersion
  if (
    state.arkTSVersion !== arkTSVersion ||
    state.compatibleSdkVersion !== compatibleSdkVersion ||
    state.compatibleSdkVersionStage !== compatibleSdkVersionStage
  ) {
    return new Set<Path>(arrayFrom(state.fileInfos.keys()));
  }

  // If any source file that affects global scope has been changed,
  // then process all files in project.
  for (const changedFile of arrayFrom(changedFiles.keys())) {
    const fileInfo = state.fileInfos.get(changedFile);
    if (fileInfo?.affectsGlobalScope) {
      return new Set<Path>(arrayFrom(state.fileInfos.keys()));
    }
  }

  if (!state.referencedMap) {
    return changedFiles;
  }

  const seenPaths = new Set<Path>();
  const queue = arrayFrom(changedFiles.keys());
  while (queue.length) {
    const path = queue.pop()!;
    if (!seenPaths.has(path)) {
      seenPaths.add(path);

      // Collect all files that import this file
      queue.push(...BuilderState.getReferencedByPaths(state, path));
    }
  }
  return seenPaths;
}

/**
 * Extracts TSC diagnostics emitted by strict checks.
 * Function might be time-consuming, as it runs second compilation.
 * @param sourceFiles AST of the processed files
 * @param tscDiagnosticsLinter linter initialized with the processed program
 * @returns problems found by TSC, mapped by `SourceFile.fileName` field
 */
function getTscDiagnostics(
  tscDiagnosticsLinter: TSCCompiledProgram,
  sourceFiles: SourceFile[],
): Map<Diagnostic[]> {
  const strictDiagnostics = new Map<string, Diagnostic[]>();
  sourceFiles.forEach(file => {
    const diagnostics = tscDiagnosticsLinter.getStrictDiagnostics(file);
    if (diagnostics.length !== 0) {
      strictDiagnostics.set(normalizePath(file.fileName), diagnostics);
    }
  });
  return strictDiagnostics;
}
}
}