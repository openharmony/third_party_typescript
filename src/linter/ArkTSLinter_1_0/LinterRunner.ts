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
    ArkTSLinterTimePrinter, arrayFrom, BuilderProgram, BuilderState, Diagnostic, DiagnosticCategory, Map, normalizePath,
    Path, ReusableBuilderProgramState, ScriptKind, Set, SourceFile, TimePhase, WriteFileCallback, 
} from "../_namespaces/ts";
import { 
  clearTypeChecker, clearTrueSymbolAtLocationCache, TypeScriptLinter, ProblemSeverity, ProblemInfo, setTypeChecker, LinterConfig, TSCCompiledProgram
} from "../_namespaces/ts.ArkTSLinter_1_0";

function makeDiag(category: DiagnosticCategory, code: number, file: SourceFile, start: number, length: number, messageText: string): Diagnostic {
  return { category, code, file, start, length, messageText };
}

export function translateDiag(srcFile: SourceFile, problemInfo: ProblemInfo): Diagnostic {
  const LINTER_MSG_CODE_START = -1;
  const severity = (problemInfo.severity === ProblemSeverity.ERROR ? DiagnosticCategory.Error : DiagnosticCategory.Warning);
  return makeDiag(severity, LINTER_MSG_CODE_START /*+ problemInfo.ruleTag */, srcFile, problemInfo.start, (problemInfo.end - problemInfo.start + 1), problemInfo.rule);
}

export function runArkTSLinter(tsBuilderProgram: BuilderProgram, srcFile?: SourceFile,
buildInfoWriteFile?: WriteFileCallback, arkTSVersion?: string): Diagnostic[] {
  TypeScriptLinter.errorLineNumbersString = "";
  TypeScriptLinter.warningLineNumbersString = "";
  let diagnostics: Diagnostic[] = [];

  LinterConfig.initStatic();

  // Retrieve list of changed files from the old program state. This needs
  // to be done before re-evaluating program diagnostics through the call
  // 'tscDiagnosticsLinter.doAllGetDiagnostics()' below, as it will update
  // program state, clearing the changedFiles list.
  let programState = tsBuilderProgram.getState();
  const oldDiagnostics = programState.arktsLinterDiagnosticsPerFile;
  programState.arktsLinterDiagnosticsPerFile = new Map();
  const changedFiles = collectChangedFilesFromProgramState(programState, arkTSVersion);
  // Set arkTSVersion info for file .tsbuildinfo.
  // File .tsbuildinfo.linter dosen't need to set arkTSVersion because it dosen't contain linter diagnostics.
  programState.arkTSVersion = arkTSVersion;

  const tscDiagnosticsLinter = new TSCCompiledProgram(tsBuilderProgram);
  const program = tscDiagnosticsLinter.getProgram();

  const timePrinterInstance = ArkTSLinterTimePrinter.getInstance();
  timePrinterInstance.appendTime(TimePhase.INIT);

  tscDiagnosticsLinter.doAllGetDiagnostics();

  let srcFiles: SourceFile[] = [];
  if (!!srcFile) {
    srcFiles.push(srcFile);
  } else {
    srcFiles = program.getSourceFiles() as SourceFile[];
  }

  const tscStrictDiagnostics = getTscDiagnostics(tscDiagnosticsLinter, srcFiles.filter(file => changedFiles.has(file.resolvedPath)));
  timePrinterInstance.appendTime(TimePhase.GET_TSC_DIAGNOSTICS);

  TypeScriptLinter.initGlobals();

  for (const fileToLint of srcFiles) {
    TypeScriptLinter.initStatic();
    if (TypeScriptLinter.lintEtsOnly && fileToLint.scriptKind !== ScriptKind.ETS) {
      continue;
    }

    let currentDiagnostics: Diagnostic[];
    if (changedFiles.has(fileToLint.resolvedPath)) {
      const linter = new TypeScriptLinter(fileToLint, program, tscStrictDiagnostics);
      setTypeChecker(TypeScriptLinter.tsTypeChecker);
      linter.lint();

      // Get list of bad nodes from the current run.
      currentDiagnostics = tscStrictDiagnostics.get(normalizePath(fileToLint.fileName)) ?? [];
      TypeScriptLinter.problemsInfos.forEach((x) => currentDiagnostics.push(translateDiag(fileToLint, x)));
    } else {
      // Get diagnostics from old run.
      currentDiagnostics = (oldDiagnostics?.get(fileToLint.resolvedPath) as Diagnostic[]) ?? [];
    }
    diagnostics.push(...currentDiagnostics);

    // Add linter diagnostics to new cache.
    programState.arktsLinterDiagnosticsPerFile.set(fileToLint.resolvedPath, currentDiagnostics);
  }

  timePrinterInstance.appendTime(TimePhase.LINT);

  // Write tsbuildinfo file only after we cached the linter diagnostics.
  if (!!buildInfoWriteFile) {
    tscDiagnosticsLinter.getBuilderProgram().emitBuildInfo(buildInfoWriteFile);
    timePrinterInstance.appendTime(TimePhase.EMIT_BUILD_INFO);
  }

  releaseReferences();

  return diagnostics;
}

// reclaiming memory for Hvigor with "no-parallel" and "daemon", .
function releaseReferences(): void {
  TypeScriptLinter.clearQualifiedNameCache();
  TypeScriptLinter.clearTsTypeChecker();
  clearTypeChecker();
  clearTrueSymbolAtLocationCache();
}

function collectChangedFilesFromProgramState(state: ReusableBuilderProgramState, arkTSVersion?: string): Set<Path> {
  const changedFiles = new Set<Path>(state.changedFilesSet);

  // If old arkTSVersion from last run is not same current arkTSVersion from ets_loader,
  // then process all files in project.
  if (state.arkTSVersion !== arkTSVersion) {
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
function getTscDiagnostics(tscDiagnosticsLinter: TSCCompiledProgram, sourceFiles: SourceFile[]): Map<Diagnostic[]> {
  const strictDiagnostics = new Map<string, Diagnostic[]>();
  sourceFiles.forEach(file => {
    const diagnostics = tscDiagnosticsLinter.getStrictDiagnostics(file.fileName);
    if (diagnostics.length !== 0) {
      strictDiagnostics.set(normalizePath(file.fileName), diagnostics);
    }
  });
  return strictDiagnostics;
}
