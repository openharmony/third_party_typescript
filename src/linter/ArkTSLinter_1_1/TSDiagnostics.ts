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
import {
    ArkTSLinterTimePrinter, BuilderProgram, Diagnostic, Program, PerformanceDotting, Set, SourceFile, TimePhase,
} from "../_namespaces/ts";

export class TSCCompiledProgram {
  private diagnosticsExtractor: TypeScriptDiagnosticsExtractor;

  constructor(program: BuilderProgram) {
    this.diagnosticsExtractor = new TypeScriptDiagnosticsExtractor(program);
  }

  public getProgram(): Program {
    return this.diagnosticsExtractor.nonStrictProgram.getProgram();
  }

  public getBuilderProgram(): BuilderProgram {
    return this.diagnosticsExtractor.nonStrictProgram;
  }

  public getStrictDiagnostics(sourceFile: SourceFile): Diagnostic[] {
    return this.diagnosticsExtractor.getStrictDiagnostics(sourceFile);
  }

  public doAllGetDiagnostics(): void {
    PerformanceDotting.start("doAllGetDiagnostics");
    this.diagnosticsExtractor.doAllGetDiagnostics();
    PerformanceDotting.stop("doAllGetDiagnostics");
  }
}

class TypeScriptDiagnosticsExtractor {
  constructor(public nonStrictProgram: BuilderProgram) {
  }

  /**
  * Returns diagnostics which appear in strict compilation mode only
  */
  public getStrictDiagnostics(sourceFile: SourceFile): Diagnostic[] {
    // workaround for a tsc bug
    const strict = getAllDiagnostics(this.nonStrictProgram, sourceFile, /* isStrict */ true).filter(
      diag => !(diag.length === 0 && diag.start === 0));
    const nonStrict = getAllDiagnostics(this.nonStrictProgram, sourceFile, /* isStrict */ false);

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

  public doAllGetDiagnostics(): void {
    const timePrinterInstance = ArkTSLinterTimePrinter.getInstance();
    PerformanceDotting.startAdvanced(TimePhase.NON_STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS);
    this.nonStrictProgram.getSemanticDiagnostics();
    timePrinterInstance.appendTime(TimePhase.NON_STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS);
    PerformanceDotting.stopAdvanced(TimePhase.NON_STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS);
    PerformanceDotting.startAdvanced(TimePhase.NON_STRICT_PROGRAM_GET_SYNTACTIC_DIAGNOSTICS);
    this.nonStrictProgram.getSyntacticDiagnostics();
    timePrinterInstance.appendTime(TimePhase.NON_STRICT_PROGRAM_GET_SYNTACTIC_DIAGNOSTICS);
    PerformanceDotting.stopAdvanced(TimePhase.NON_STRICT_PROGRAM_GET_SYNTACTIC_DIAGNOSTICS);
    PerformanceDotting.startAdvanced(TimePhase.STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS);
    this.nonStrictProgram.builderProgramForLinter?.getSemanticDiagnostics();
    timePrinterInstance.appendTime(TimePhase.STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS);
    PerformanceDotting.stopAdvanced(TimePhase.STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS);
  }
}

/**
* Actually, we only run `getSemanticDiagnostics`, 
* because the linter care only about strict errors, which do not include syntactic diagnostics.
*/
function getAllDiagnostics(builderProgram: BuilderProgram, sourceFile: SourceFile, isStrict: boolean = false): Diagnostic[] {
  if (isStrict) {
    if (!builderProgram.builderProgramForLinter) {
      return [];
    }
    return builderProgram.builderProgramForLinter.getSemanticDiagnostics(sourceFile)
      .filter(diag => diag.file === sourceFile);
  }
  return builderProgram.getSemanticDiagnostics(sourceFile)
  .filter(diag => diag.file === sourceFile);
}

function hashDiagnostic(diagnostic: Diagnostic): string | undefined {
  if (diagnostic.start === undefined || diagnostic.length === undefined) {
    return undefined;
  }
  return `${diagnostic.code}%${diagnostic.start}%${diagnostic.length}`;
}
