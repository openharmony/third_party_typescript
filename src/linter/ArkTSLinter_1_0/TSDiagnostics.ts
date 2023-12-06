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

  constructor(program: Program, host: CompilerHost) {
    const { strict, nonStrict, wasStrict } = getTwoCompiledVersions(program, host);
    this.diagnosticsExtractor = new TypeScriptDiagnosticsExtractor(strict, nonStrict);
    this.wasStrict = wasStrict;
  }

  public getOriginalProgram(): Program {
    return this.wasStrict
      ? this.diagnosticsExtractor.strictProgram
      : this.diagnosticsExtractor.nonStrictProgram;
  }

  public getStrictProgram(): Program {
    return this.diagnosticsExtractor.strictProgram;
  }

  public getStrictDiagnostics(fileName: string): Diagnostic[] {
    return this.diagnosticsExtractor.getStrictDiagnostics(fileName);
  }
}

function getStrictOptions(strict = true) {
  return {
    strictNullChecks: strict,
    strictFunctionTypes: strict,
    strictPropertyInitialization: strict,
    noImplicitReturns: strict,
  };
}

function compile(rootNames: readonly string[], compilerOptions: CompilerOptions, host: CompilerHost, extraOptions?: any): Program {
  const createProgramOptions = formTscOptions(rootNames, compilerOptions, host, extraOptions);
  const program = createProgram(createProgramOptions);
  return program;
}

function formTscOptions(rootNames: readonly string[], compilerOptions: CompilerOptions, host: CompilerHost, extraOptions?: any): CreateProgramOptions {
  const options: CreateProgramOptions = {
    rootNames,
    host,
    options: compilerOptions,
  };

  if (extraOptions) {
    options.options = Object.assign(options.options, extraOptions);
  }

  options.options.allowJs = true;
  options.options.checkJs = true;

  return options;
}

function getTwoCompiledVersions(
  program: Program,
  host: CompilerHost,
): { strict: Program; nonStrict: Program; wasStrict: boolean } {
  const compilerOptions = { ...program.getCompilerOptions() };

  const wasStrict = inverseStrictOptions(compilerOptions);
  const inversedOptions = getStrictOptions(!wasStrict);
  const withInversedOptions = compile(program.getRootFileNames(), compilerOptions, host, inversedOptions);

  return {
    strict: wasStrict ? program : withInversedOptions,
    nonStrict: wasStrict ? withInversedOptions : program,
    wasStrict,
  };
}

/**
 * Returns true if options were initially strict
 */
function inverseStrictOptions(compilerOptions: CompilerOptions): boolean {
  const strictOptions = getStrictOptions();
  let wasStrict = false;
  Object.keys(strictOptions).forEach(x => {
    wasStrict = wasStrict || !!compilerOptions[x];
  });
  // wasStrict evaluates true if any of the strict options was set
  return wasStrict;
}

class TypeScriptDiagnosticsExtractor {
  constructor(public strictProgram: Program, public nonStrictProgram: Program) {
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
}

function getAllDiagnostics(program: Program, fileName: string): Diagnostic[] {
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