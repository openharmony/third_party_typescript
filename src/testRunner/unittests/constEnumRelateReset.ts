import * as ts from '../_namespaces/ts';

describe('unittests:: const-enum relate reset on program reuse', () => {
    // Reproduces the scenario fixed by `BuilderProgram.resetConstEnumRelateUpdateFlag`:
    // during incremental/watch compilation, when `synchronizeHostData` reuses an up-to-date
    // program (no file changes this cycle), the `constEnumRelatePerFile[path].isUpdate`
    // markers left true by the previous build's semantic diagnostics are stale and would
    // cause the consumer (`checkRelateToConstEnum`) to re-transform const-enum-referencing
    // files on every unchanged build. The reset clears them on the reuse path.
    //
    // `use.ts` references const-enum members of `enum.ts`, so running the builder's
    // per-file semantic diagnostics populates `constEnumRelatePerFile` for `use.ts`
    // with `isUpdate = true`. The assertions below guard that:
    //   - on a no-change second `getBuilderProgram()`, the program is reused and the flag
    //     is reset to `false` (the fix);
    //   - on a real const-enum change, the flag legitimately becomes `true` again, so the
    //     reset does not suppress genuine re-transforms.
    function createLanguageService(files: { [name: string]: string }, getVersion: () => string): ts.LanguageService {
        return ts.createLanguageService({
            getCompilationSettings: (): ts.CompilerOptions => ({ incremental: true, target: ts.ScriptTarget.ESNext, lib: [], noLib: true }),
            getScriptFileNames: (): string[] => Object.keys(files),
            getScriptVersion: getVersion,
            getScriptSnapshot: (fileName: string): ts.IScriptSnapshot | undefined => {
                const text = files[fileName];
                return text !== undefined ? ts.ScriptSnapshot.fromString(text) : undefined;
            },
            getCurrentDirectory: (): string => '/',
            getDefaultLibFileName: (): string => 'lib.d.ts',
            fileExists: (fileName: string): boolean => fileName in files,
            readFile: (fileName: string): string | undefined => (fileName in files ? files[fileName] : undefined),
            useCaseSensitiveFileNames: (): boolean => true,
        });
    }

    it('resets isUpdate to false when the program is reused without changes', () => {
        const files = {
            '/enum.ts': 'export const enum E { A = 1, B = 2 }\n',
            '/use.ts': 'import { E } from "./enum"; const x = E.A; const y = E.B;\n',
        };
        const ls = createLanguageService(files, () => '0');

        // Round 1: build + drive builder semantic diagnostics -> isUpdate becomes true.
        const bp1 = ls.getBuilderProgram()!;
        const useFile1 = bp1.getProgram().getSourceFile('/use.ts')!;
        bp1.getSemanticDiagnostics(useFile1);
        assert.strictEqual(bp1.isFileUpdateInConstEnumCache!(useFile1), true, 'round 1 should mark use.ts as updated');

        // Round 2: no file changes -> isProgramUptoDate -> program reused -> reset fires.
        const bp2 = ls.getBuilderProgram()!;
        const useFile2 = bp2.getProgram().getSourceFile('/use.ts')!;
        assert.strictEqual(bp2, bp1, 'round 2 with no changes should reuse the same builder program');
        assert.strictEqual(bp2.isFileUpdateInConstEnumCache!(useFile2), false, 'round 2 reuse should reset the isUpdate flag');
    });

    it('marks isUpdate true again when a const enum actually changes', () => {
        const files = {
            '/enum.ts': 'export const enum E { A = 1, B = 2 }\n',
            '/use.ts': 'import { E } from "./enum"; const x = E.A; const y = E.B;\n',
        };
        let version = '0';
        const ls = createLanguageService(files, () => version);

        // Round 1: establish the const-enum relate cache + isUpdate = true.
        const bp1 = ls.getBuilderProgram()!;
        const useFile1 = bp1.getProgram().getSourceFile('/use.ts')!;
        bp1.getSemanticDiagnostics(useFile1);
        assert.strictEqual(bp1.isFileUpdateInConstEnumCache!(useFile1), true, 'round 1 should mark use.ts as updated');

        // Round 2: real const-enum change -> program rebuilt -> isUpdate legitimately true again.
        files['/enum.ts'] = 'export const enum E { A = 9, B = 2 }\n';
        version = '1';
        const bp2 = ls.getBuilderProgram()!;
        const useFile2 = bp2.getProgram().getSourceFile('/use.ts')!;
        assert.notStrictEqual(bp2, bp1, 'a real const-enum change should rebuild the program');
        bp2.getSemanticDiagnostics(useFile2);
        assert.strictEqual(bp2.isFileUpdateInConstEnumCache!(useFile2), true, 'a real const-enum change should re-mark use.ts as updated');
    });
});
