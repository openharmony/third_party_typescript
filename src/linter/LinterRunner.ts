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

function makeDiag(category: DiagnosticCategory, code: number, file: SourceFile, start: number, length: number, messageText: string): Diagnostic {
  return { category, code, file, start, length, messageText };
}

export function translateDiag(srcFile: SourceFile, problemInfo: ProblemInfo): Diagnostic {
  const LINTER_MSG_CODE_START = -1;
  return makeDiag(DiagnosticCategory.Error, LINTER_MSG_CODE_START /*+ problemInfo.ruleTag */, srcFile , problemInfo.start, (problemInfo.end - problemInfo.start + 1), problemInfo.rule);
}

export function runArkTSLinter(tsProgram: Program, srcFile?: SourceFile): Diagnostic[] {
  TypeScriptLinter.errorLineNumbersString = "";
  TypeScriptLinter.warningLineNumbersString = "";
  let diagnostics: Diagnostic[] = [];

  LinterConfig.initStatic();

  let srcFiles: SourceFile[] = [];
  if(!!srcFile) {
    srcFiles.push(srcFile);
  }
  else {
    srcFiles = tsProgram.getSourceFiles() as SourceFile[];
  }

  const tscDiagnosticsLinter = new TSCCompiledProgram(tsProgram, srcFiles.map((x) => x.fileName));
  const tscStrictDiagnostics = getTscDiagnostics(tscDiagnosticsLinter, srcFiles);

  for(const fileToLint of srcFiles) {
    TypeScriptLinter.initStatic();
    if(TypeScriptLinter.lintEtsOnly && fileToLint.scriptKind !==ScriptKind.ETS) {
      continue;
    }

    const linter = new TypeScriptLinter(fileToLint, tsProgram, tscStrictDiagnostics);
    Utils.setTypeChecker(TypeScriptLinter.tsTypeChecker);
    linter.lint();

    // Get list of bad nodes from the current run.
    const currentDiagnostics = tscStrictDiagnostics.get(fileToLint.fileName) ?? [];
    TypeScriptLinter.problemsInfos.forEach(
      (x) => currentDiagnostics.push(translateDiag(fileToLint, x))
    );
    diagnostics.push(...currentDiagnostics);
  }

  return diagnostics;
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