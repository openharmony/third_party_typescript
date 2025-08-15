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

import {
  ArkTSLinterTimePrinter, arrayFrom, BuilderProgram, Diagnostic, DiagnosticCategory, getBaseFileName,
  isOHModules, Map, normalizePath, Path, PerformanceDotting, resolvePath, ReusableBuilderProgramState, ScriptKind, Set, SourceFile,
  TimePhase, TypeChecker, WriteFileCallback, MemoryUtils
} from "../_namespaces/ts";
import { 
  LibraryTypeCallDiagnosticChecker, TypeScriptLinter, InteropTypescriptLinter, ProblemSeverity, ProblemInfo, setTypeChecker, clearTypeChecker,
  clearTrueSymbolAtLocationCache, LinterConfig, TSCCompiledProgram, clearUtilsGlobalvariables, setMixCompile
} from "../_namespaces/ts.ArkTSLinter_1_1";

function makeDiag(category: DiagnosticCategory, code: number, file: SourceFile, start: number, length: number, messageText: string): Diagnostic {
  return { category, code, file, start, length, messageText };
}

export function translateDiag(srcFile: SourceFile, problemInfo: ProblemInfo): Diagnostic {
  const severity = (problemInfo.severity === ProblemSeverity.ERROR ? DiagnosticCategory.Error : DiagnosticCategory.Warning);
  return makeDiag(severity, problemInfo.ruleTag, srcFile, problemInfo.start, (problemInfo.end - problemInfo.start + 1), problemInfo.rule);
}

export function runArkTSLinter(tsBuilderProgram: BuilderProgram, srcFile?: SourceFile,
buildInfoWriteFile?: WriteFileCallback, arkTSVersion?: string): Diagnostic[] {
  PerformanceDotting.startAdvanced(TimePhase.INIT);
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

  const timePrinterInstance = ArkTSLinterTimePrinter.getInstance();
  timePrinterInstance.appendTime(TimePhase.INIT);
  PerformanceDotting.stopAdvanced(TimePhase.INIT);

  tscDiagnosticsLinter.doAllGetDiagnostics();
  const changedFiles = collectChangedFilesFromProgramState(
    programState,
    program.getLinterTypeChecker(),
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

  let srcFiles: SourceFile[] = [];
  if (!!srcFile) {
    srcFiles.push(srcFile);
  } else {
    srcFiles = program.getSourceFiles() as SourceFile[];
  }

  PerformanceDotting.startAdvanced(TimePhase.GET_TSC_DIAGNOSTICS);
  const tscStrictDiagnostics = getTscDiagnostics(tscDiagnosticsLinter, srcFiles.filter(file => changedFiles.has(file.resolvedPath)));
  timePrinterInstance.appendTime(TimePhase.GET_TSC_DIAGNOSTICS);
  PerformanceDotting.stopAdvanced(TimePhase.GET_TSC_DIAGNOSTICS);

  PerformanceDotting.startAdvanced(TimePhase.LINT);
  TypeScriptLinter.initGlobals();
  InteropTypescriptLinter.initGlobals();
  LibraryTypeCallDiagnosticChecker.instance.rebuildTscDiagnostics(tscStrictDiagnostics);

  var lintLoop = function(fileToLint: SourceFile) {
    if (fileToLint.scriptKind !== ScriptKind.ETS && fileToLint.scriptKind !== ScriptKind.TS) {
      return "continue";
    }

    let currentDiagnostics: Diagnostic[];
    if (changedFiles.has(fileToLint.resolvedPath)) {
      const skipOhModulesLint = compilerOptions.skipOhModulesLint && isOHModules(fileToLint.fileName);
      if (skipOhModulesLint) {
        return "continue";
      }
    
      if (fileToLint.scriptKind === ScriptKind.ETS) {
        TypeScriptLinter.initStatic();
        const linter = new TypeScriptLinter(fileToLint, program, tscStrictDiagnostics);
        setTypeChecker(TypeScriptLinter.tsTypeChecker);
        setMixCompile(!!compilerOptions.mixCompile);
        linter.lint();

        // Get list of bad nodes from the current run.
        currentDiagnostics = tscStrictDiagnostics.get(normalizePath(fileToLint.fileName)) ?? [];
        TypeScriptLinter.problemsInfos.forEach((x) => currentDiagnostics.push(translateDiag(fileToLint, x)));
      } else {
        InteropTypescriptLinter.initStatic();
        const isKit = getBaseFileName(fileToLint.fileName).indexOf('@kit.') === 0;
        const etsLoaderPath = program.getCompilerOptions().etsLoaderPath;
        const isInSdk = etsLoaderPath ? normalizePath(fileToLint.fileName).indexOf(resolvePath(etsLoaderPath, '../..')) === 0 : false;
        const isInOhModules = isOHModules(fileToLint.fileName);
        const tsImportSendableEnable = program.getCompilerOptions().tsImportSendableEnable;
        if (isKit || isInOhModules || (!tsImportSendableEnable && !isInSdk)) {
          return "continue";
        }
        const InteropLinter = new InteropTypescriptLinter(fileToLint, program, isInSdk);
        setTypeChecker(InteropTypescriptLinter.tsTypeChecker);
        setMixCompile(!!compilerOptions.mixCompile);
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
    programState.arktsLinterDiagnosticsPerFile?.set(fileToLint.resolvedPath, currentDiagnostics);
  };

  MemoryUtils.initializeBaseMemory();
  for (const fileToLint of srcFiles) {
    lintLoop(fileToLint);
    MemoryUtils.tryGC();
  }

  timePrinterInstance.appendTime(TimePhase.LINT);
  PerformanceDotting.stopAdvanced(TimePhase.LINT);

  // Write tsbuildinfo file only after we cached the linter diagnostics.
  PerformanceDotting.startAdvanced(TimePhase.EMIT_BUILD_INFO);
  if (!!buildInfoWriteFile) {
    tscDiagnosticsLinter.getBuilderProgram().emitBuildInfo(buildInfoWriteFile);
    timePrinterInstance.appendTime(TimePhase.EMIT_BUILD_INFO);
  }
  PerformanceDotting.stopAdvanced(TimePhase.EMIT_BUILD_INFO);

  releaseReferences();

  return diagnostics;
}

// reclaiming memory for Hvigor with "no-parallel" and "daemon", .
function releaseReferences(): void {
  TypeScriptLinter.clearQualifiedNameCache();
  TypeScriptLinter.clearTsTypeChecker();
  InteropTypescriptLinter.clearTsTypeChecker();
  clearTypeChecker();
  clearTrueSymbolAtLocationCache();
  clearUtilsGlobalvariables();
  LibraryTypeCallDiagnosticChecker.instance.clear();
}

function collectChangedFilesFromProgramState(
  state: ReusableBuilderProgramState,
  tsTypeChecker: TypeChecker,
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

  const changeSources = tsTypeChecker.getCheckedSourceFiles();
  const targetSet = new Set<Path>();
  changeSources.forEach(x => targetSet.add(x.path));
  return targetSet;
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