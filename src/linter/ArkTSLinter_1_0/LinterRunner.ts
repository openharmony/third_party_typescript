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
export namespace ArkTSLinter_1_0 {

function makeDiag(category: DiagnosticCategory, code: number, file: SourceFile, start: number, length: number, messageText: string): Diagnostic {
  return { category, code, file, start, length, messageText };
}

export function translateDiag(srcFile: SourceFile, problemInfo: ProblemInfo): Diagnostic {
  const LINTER_MSG_CODE_START = -1;
  const severity = (problemInfo.severity === Utils.ProblemSeverity.ERROR ? DiagnosticCategory.Error : DiagnosticCategory.Warning);
  return makeDiag(severity, LINTER_MSG_CODE_START /*+ problemInfo.ruleTag */, srcFile , problemInfo.start, (problemInfo.end - problemInfo.start + 1), problemInfo.rule);
}

export function runArkTSLinter(tsBuilderProgram: BuilderProgram, host: CompilerHost, srcFile?: SourceFile, buildInfoWriteFile?: WriteFileCallback): Diagnostic[] {
  TypeScriptLinter.errorLineNumbersString = "";
  TypeScriptLinter.warningLineNumbersString = "";
  let diagnostics: Diagnostic[] = [];

  LinterConfig.initStatic();

  const tscDiagnosticsLinter = new TSCCompiledProgram(tsBuilderProgram, host);
  const strictProgram = tscDiagnosticsLinter.getStrictProgram();

  let srcFiles: SourceFile[] = [];
  if(!!srcFile) {
    srcFiles.push(srcFile);
  }
  else {
    srcFiles = strictProgram.getSourceFiles() as SourceFile[];
  }

  const tscStrictDiagnostics = getTscDiagnostics(tscDiagnosticsLinter, srcFiles);

  if (!!buildInfoWriteFile) {
    tscDiagnosticsLinter.getStrictBuilderProgram().emitBuildInfo(buildInfoWriteFile);
    tscDiagnosticsLinter.getNonStrictBuilderProgram().emitBuildInfo(buildInfoWriteFile);
  }

  TypeScriptLinter.initGlobals();

  for(const fileToLint of srcFiles) {
    TypeScriptLinter.initStatic();
    if(TypeScriptLinter.lintEtsOnly && fileToLint.scriptKind !==ScriptKind.ETS) {
      continue;
    }

    const linter = new TypeScriptLinter(fileToLint, strictProgram, tscStrictDiagnostics);
    Utils.setTypeChecker(TypeScriptLinter.tsTypeChecker);
    linter.lint();

    // Get list of bad nodes from the current run.
    const currentDiagnostics = tscStrictDiagnostics.get(fileToLint.fileName) ?? [];
    TypeScriptLinter.problemsInfos.forEach(
      (x) => currentDiagnostics.push(translateDiag(fileToLint, x))
    );
    diagnostics.push(...currentDiagnostics);
  }

  releaseReferences();
  return diagnostics;
}

// reclaiming memory for Hvigor with "no-parallel" and "daemon", .
function releaseReferences(): void {
  TypeScriptLinter.clearTsTypeChecker();
  Utils.clearTypeChecker();
  Utils.clearTrueSymbolAtLocationCache();
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
    const diagnostics = tscDiagnosticsLinter.getStrictDiagnostics(file.fileName);
    if (diagnostics.length !== 0) {
      strictDiagnostics.set(normalizePath(file.fileName), diagnostics);
    }
  });
  return strictDiagnostics;
}

export function getDiagnosticsFromStrictProgram(strictBuilderProgram: BuilderProgram, buildInfoWriteFile?: ts.WriteFileCallback) {
  const strictProgram = strictBuilderProgram.getProgram();
  let diagnostics = new Map<string, {strictDiagnostics:Diagnostic[], arkTSDiagnostics:Diagnostic[]}>()
  LinterConfig.initStatic();
  const srcFiles = strictProgram.getSourceFiles().filter(sourcefile => sourcefile.scriptKind === ScriptKind.ETS);
  const tscStrictDiagnostics = getTscStrictDiagnostics(strictProgram, srcFiles);
  TypeScriptLinter.initGlobals();

  for(const fileToLint of srcFiles) {
    TypeScriptLinter.initStatic();

    const linter = new TypeScriptLinter(fileToLint, strictProgram, tscStrictDiagnostics);
    Utils.setTypeChecker(TypeScriptLinter.tsTypeChecker);
    linter.lint();

    // Get list of bad nodes from the current run.
    const currentStaticDiagnostics: Diagnostic[] = tscStrictDiagnostics.get(fileToLint.fileName) ?? [];
    const currentArkTSDiagnostics: Diagnostic[] = [];
    TypeScriptLinter.problemsInfos.forEach(
      (x) => currentArkTSDiagnostics.push(translateDiag(fileToLint, x))
    );
    diagnostics.set(normalizePath(fileToLint.fileName), {
      strictDiagnostics : currentStaticDiagnostics,
      arkTSDiagnostics: currentArkTSDiagnostics,
    });
  }

  if (!!buildInfoWriteFile) {
    strictBuilderProgram.emitBuildInfo(buildInfoWriteFile);
  }

  releaseReferences();
  return diagnostics;
}

function getTscStrictDiagnostics(
  strictProgram: Program,
  sourceFiles: SourceFile[],
): Map<Diagnostic[]> {
  const strictDiagnostics = new Map<string, Diagnostic[]>();
  const diagnostics = strictProgram.getSemanticDiagnostics().concat(strictProgram.getSyntacticDiagnostics());
  diagnostics.forEach(diag => {
    if (diag.file && sourceFiles.some(file=>{ return file === diag.file; })) {
      const fileName = normalizePath(diag.file.fileName);
      if (!strictDiagnostics.has(fileName)) {
        strictDiagnostics.set(fileName, []);
      }
      strictDiagnostics.get(fileName)?.push(diag);
    }
  });
  return strictDiagnostics;
}

}
}