/*
 * Copyright (c) 2023-2023 Huawei Device Co., Ltd.
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

export class TSCCompiledProgram {
  private diagnosticsExtractor: TypeScriptDiagnosticsExtractor;
  private wasStrict: boolean;

  constructor(program: ArkTSProgram, reverseStrictBuilderProgram: ArkTSProgram) {
    const strict = program.wasStrict ? program.builderProgram : reverseStrictBuilderProgram.builderProgram;
    const nonStrict = program.wasStrict ? reverseStrictBuilderProgram.builderProgram : program.builderProgram;
    this.diagnosticsExtractor = new TypeScriptDiagnosticsExtractor(strict, nonStrict);
    this.wasStrict = program.wasStrict;
  }

  public getOriginalProgram(): Program {
    return this.wasStrict
      ? this.diagnosticsExtractor.strictProgram.getProgram()
      : this.diagnosticsExtractor.nonStrictProgram.getProgram();
  }

  public getStrictProgram(): Program {
    return this.diagnosticsExtractor.strictProgram.getProgram();
  }

  public getStrictBuilderProgram(): BuilderProgram {
    return this.diagnosticsExtractor.strictProgram;
  }

  public getNonStrictBuilderProgram(): BuilderProgram {
    return this.diagnosticsExtractor.nonStrictProgram;
  }

  public getStrictDiagnostics(fileName: string): Diagnostic[] {
    return this.diagnosticsExtractor.getStrictDiagnostics(fileName);
  }

  public doAllGetDiagnostics() {
    this.diagnosticsExtractor.doAllGetDiagnostics();
  }
}

class TypeScriptDiagnosticsExtractor {
  constructor(public strictProgram: BuilderProgram, public nonStrictProgram: BuilderProgram) {
  }

  /**
   * Returns diagnostics which appear in strict compilation mode only
   */
   public getStrictDiagnostics(fileName: string): Diagnostic[] {
    // workaround for a tsc bug
    const strict = getAllDiagnostics(this.strictProgram, fileName).filter(diag => !(diag.length === 0 && diag.start === 0));
    const nonStrict = getAllDiagnostics(this.nonStrictProgram, fileName);

    // collect hashes for later easier comparison
    const nonStrictHashes = nonStrict.reduce((result, value) => {
      const hash = hashDiagnostic(value);
      if (hash) {
        result.add(hash);
      }
      return result;
    }, new Set<string>());
    // return diagnostics which weren't detected in non-strict mode
    return strict.filter(value => {
      const hash = hashDiagnostic(value);
      return (hash && !nonStrictHashes.has(hash));
    });
  }

  public doAllGetDiagnostics() {
    this.strictProgram.getSemanticDiagnostics();
    const timePrinterInstance = ts.ArkTSLinterTimePrinter.getInstance();
    timePrinterInstance.appendTime(ts.TimePhase.STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS);
    this.strictProgram.getSyntacticDiagnostics();
    timePrinterInstance.appendTime(ts.TimePhase.STRICT_PROGRAM_GET_SYNTACTIC_DIAGNOSTICS);
    this.nonStrictProgram.getSemanticDiagnostics();
    timePrinterInstance.appendTime(ts.TimePhase.NON_STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS);
    this.nonStrictProgram.getSyntacticDiagnostics();
    timePrinterInstance.appendTime(ts.TimePhase.NON_STRICT_PROGRAM_GET_SYNTACTIC_DIAGNOSTICS);
  }
}

function getAllDiagnostics(program: BuilderProgram, fileName: string): Diagnostic[] {
  const sourceFile = program.getSourceFile(fileName);
  return program.getSemanticDiagnostics(sourceFile)
    .concat(program.getSyntacticDiagnostics(sourceFile))
    .filter(diag => diag.file === sourceFile);
}

function hashDiagnostic(diagnostic: Diagnostic): string | undefined {
  if (diagnostic.start === undefined || diagnostic.length === undefined) {
    return undefined;
  }
  return `${diagnostic.code}%${diagnostic.start}%${diagnostic.length}`;
}

}
}