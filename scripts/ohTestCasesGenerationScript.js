const fs = require("fs");
const path = require("path");

const fourslashCasesNameArray = [
    "addMemberNotInNodeModulesDeclarationFile.ts",
    "codeFixAddMissingFunctionDeclaration16.ts",
    "codeFixCannotFindModule_all.ts",
    "codeFixCannotFindModule_suggestion_falsePositive.ts",
    "codeFixCannotFindModule_suggestion_js.ts",
    "codeFixCannotFindModule_suggestion.ts",
    "codeFixCannotFindModule.ts",
    "codeFixGenerateDefinitions.ts",
    "completionEntryForClassMembers_StaticWhenBaseTypeIsNotResolved.ts",
    "completionForStringLiteralNonrelativeImport1.ts",
    "completionForStringLiteralNonrelativeImport2.ts",
    "completionForStringLiteralNonrelativeImport3.ts",
    "completionForStringLiteralNonrelativeImport4.ts",
    "completionForStringLiteralNonrelativeImport7.ts",
    "completionForStringLiteralNonrelativeImport10.ts",
    "completionForStringLiteralNonrelativeImport11.ts",
    "completionForStringLiteralNonrelativeImport13.ts",
    "completionForStringLiteralNonrelativeImportTypings3.ts",
    "completionInJsDocQualifiedNames.ts",
    "completionListForExportEquals.ts",
    "completionListForExportEquals2.ts",
    "completionListInImportClause05.ts",
    "completionsImport_compilerOptionsModule.ts",
    "completionsImport_default_symbolName.ts",
    "completionsImport_defaultFalsePositive.ts",
    "completionsImport_exportEqualsNamespace_noDuplicate.ts",
    "completionsImport_filteredByInvalidPackageJson_direct.ts",
    "completionsImport_filteredByPackageJson_@typesImplicit.ts",
    "completionsImport_filteredByPackageJson_@typesOnly.ts",
    "completionsImport_filteredByPackageJson_ambient.ts",
    "completionsImport_filteredByPackageJson_direct.ts",
    "completionsImport_filteredByPackageJson_nested.ts",
    "completionsImport_filteredByPackageJson_peerDependencies.ts",
    "completionsImport_filteredByPackageJson_reexport.ts",
    "completionsImport_filteredByPackageJson_reexport2.ts",
    "completionsImport_filteredByPackageJson_reexport3.ts",
    "completionsImport_filteredByPackageJson_reexport4.ts",
    "completionsImport_notFromUnrelatedNodeModules.ts",
    "completionsImport_umdModules1_globalAccess.ts",
    "completionsImport_umdModules2_moduleExports.ts",
    "completionsImport_umdModules3_script.ts",
    "completionsPathsJsonModule.ts",
    "completionsPaths.ts",
    "completionsPaths_fromTypings.ts",
    "completionsPaths_importType.ts",
    "documentHighlights_moduleImport_filesToSearch.ts",
    "documentHighlights_moduleImport_filesToSearchWithInvalidFile.ts",
    "duplicatePackageServices_fileChanges.ts",
    "duplicatePackageServices.ts",
    "exportEqualNamespaceClassESModuleInterop.ts",
    "findAllReferencesTripleSlash.ts",
    "findAllReferencesUmdModuleAsGlobalConst.ts",
    "findAllRefsExportAsNamespace.ts",
    "findAllRefsForModuleGlobal.ts",
    "findAllRefsImportStarOfExportEquals.ts",
    "findAllRefsModuleAugmentation.ts",
    "getEditsForFileRename_ambientModule.ts",
    "getEditsForFileRename_directory_noUpdateNodeModulesImport.ts",
    "getEditsForFileRename_nodeModuleDirectoryCase.ts",
    "getEditsForFileRename_symlink.ts",
    "goToDefinition_untypedModule.ts",
    "importFixesGlobalTypingsCache.ts",
    "importFixesWithPackageJsonInSideAnotherPackage.ts",
    "importJsNodeModule1.ts",
    "importJsNodeModule2.ts",
    "importJsNodeModule3.ts",
    "importJsNodeModule4.ts",
    "importNameCodeFixExistingImport5.ts",
    "importNameCodeFixExistingImport6.ts",
    "importNameCodeFixNewImportFromAtTypes.ts",
    "importNameCodeFixNewImportFromAtTypesScopedPackage.ts",
    "importNameCodeFixNewImportIndex_notForClassicResolution.ts",
    "importNameCodeFixNewImportNodeModules0.ts",
    "importNameCodeFixNewImportNodeModules1.ts",
    "importNameCodeFixNewImportNodeModules2.ts",
    "importNameCodeFixNewImportNodeModules3.ts",
    "importNameCodeFixNewImportNodeModules4.ts",
    "importNameCodeFixNewImportNodeModules5.ts",
    "importNameCodeFixNewImportNodeModules6.ts",
    "importNameCodeFixNewImportNodeModules7.ts",
    "importNameCodeFixNewImportNodeModules8.ts",
    "importNameCodeFix_avoidRelativeNodeModules.ts",
    "importNameCodeFix_getCanonicalFileName.ts",
    "importNameCodeFix_symlink.ts",
    "importNameCodeFix_symlink_own_package.ts",
    "importNameCodeFix_symlink_own_package_2.ts",
    "importNameCodeFix_types_classic.ts",
    "importNameCodeFixOptionalImport1.ts",
    "importNameCodeFixUMDGlobalReact0.ts",
    "importNameCodeFixUMDGlobalReact1.ts",
    "importTypesDeclarationDiagnosticsNoServerError.ts",
    "moduleReexportedIntoGlobalQuickInfo.ts",
    "noImportCompletionsInOtherJavaScriptFile.ts"
];

const compilerCasesNameArray = [
    "declarationEmitForGlobalishSpecifierSymlink.ts",
    "declarationEmitForGlobalishSpecifierSymlink2.ts",
    "declarationEmitHasTypesRefOnNamespaceUse.ts",
    "declarationEmitReexportedSymlinkReference.ts",
    "declarationEmitReexportedSymlinkReference2.ts",
    "declarationEmitReexportedSymlinkReference3.ts",
    "declarationEmitSymlinkPaths.ts",
    "declarationEmitUnnessesaryTypeReferenceNotAdded.ts",
    "declarationEmitWithInvalidPackageJsonTypings.ts",
    "duplicatePackage_globalMerge.ts",
    "duplicatePackage.ts",
    "duplicatePackage_packageIdIncludesSubModule.ts",
    "duplicatePackage_referenceTypes.ts",
    "duplicatePackage_relativeImportWithinPackage.ts",
    "duplicatePackage_relativeImportWithinPackage_scoped.ts",
    "duplicatePackage_subModule.ts",
    "duplicatePackage_withErrors.ts",
    "moduleLocalImportNotIncorrectlyRedirected.ts",
    "moduleResolutionPackageIdWithRelativeAndAbsolutePath.ts",
    "moduleResolutionWithExtensions_unexpected.ts",
    "moduleResolutionWithExtensions_unexpected2.ts",
    "moduleResolution_packageJson_notAtPackageRoot.ts",
    "moduleResolution_packageJson_notAtPackageRoot_fakeScopedPackage.ts",
    "moduleResolution_packageJson_scopedPackage.ts",
    "moduleResolution_packageJson_yesAtPackageRoot.ts",
    "moduleResolution_packageJson_yesAtPackageRoot_fakeScopedPackage.ts",
    "moduleResolution_packageJson_yesAtPackageRoot_mainFieldInSubDirectory.ts",
    "symbolLinkDeclarationEmitModuleNamesImportRef.ts"
];

const thisFilePath = __dirname;
function GenOHFourslashTestCases() {
    const ohFourslashCasesDir = path.join(thisFilePath, "../tests/cases/fourslash/oh");
    if (!fs.existsSync(ohFourslashCasesDir)) {
        fs.mkdirSync(ohFourslashCasesDir);
    }
    for (const caseName of fourslashCasesNameArray) {
        const fourslashCasesNamePath = path.join(thisFilePath, "../tests/cases/fourslash", caseName);

        const ohFourslashCasesName = caseName.replace(/NodeModules/g, "OHModules").replace(/PackageJson/g, "OHPackageJson5");
        const ohFourslashCasesNamePath = path.join(ohFourslashCasesDir, ohFourslashCasesName);

        const fileContent = fs.readFileSync(fourslashCasesNamePath).toString();
        let ohfileContent = fileContent.replace(/node_modules/g, "oh_modules").replace(/package.json/g, "oh-package.json5");
        if (caseName === "completionForStringLiteralNonrelativeImport7.ts" || caseName === "completionForStringLiteralNonrelativeImport11.ts") {
            ohfileContent = ohfileContent.replace("fourslash/modules", "fourslash/oh/modules")
        }
        fs.writeFileSync(ohFourslashCasesNamePath, ohfileContent);
    }
}

function GenOHCompilerTestCases() {
    const ohCompilerCasesDir = path.join(thisFilePath, "../tests/cases/compiler-oh");
    const baselineDir = path.join(thisFilePath, "../tests/baselines/reference");
    const baselineTypes = [".js", ".symbols", ".types", ".errors.txt", ".trace.json"];
    if (!fs.existsSync(ohCompilerCasesDir)) {
        fs.mkdirSync(ohCompilerCasesDir);
    }

    for (const caseName of compilerCasesNameArray) {
        const compilerCasesNamePath = path.join(thisFilePath, "../tests/cases/compiler", caseName);
        let ohCompilerCasesName = "";
        if (RegExp(/NodeModules|PackageJson/g).test(caseName)) {
            ohCompilerCasesName = caseName.replace(/NodeModules/g, "OHModules").replace(/PackageJson/g, "OHPackageJson5");
        }
        else {
            ohCompilerCasesName = caseName.replace(".ts", "_isohpm.ts");
        }
        const ohCompilerCasesNamePath = path.join(ohCompilerCasesDir, ohCompilerCasesName);
        const fileContent = fs.readFileSync(compilerCasesNamePath).toString();
        let ohfileContent = "";
        if (fileContent.startsWith("// @filename")) {
            ohfileContent = "// @packageManagerType: ohpm\r\n" + fileContent.replace(/node_modules/g, "oh_modules").replace(/package.json/g, "oh-package.json5");
        } else {
            ohfileContent = "// @packageManagerType: ohpm\n" + fileContent.replace(/node_modules/g, "oh_modules").replace(/package.json/g, "oh-package.json5");
        }
        fs.writeFileSync(ohCompilerCasesNamePath, ohfileContent);

        const baselineCaseNamePath = path.join(baselineDir, caseName);
        for (const type of baselineTypes) {
            const baselineNamePath = baselineCaseNamePath.replace(".ts", type);
            if (!fs.existsSync(baselineNamePath)) {
                continue;
            }
            const content = fs.readFileSync(baselineNamePath).toString();
            let ohContent = content.replace(/node_modules/g, "oh_modules").replace(/package.json/g, "oh-package.json5").replace(caseName, ohCompilerCasesName);
            if (type == ".js") {
                ohContent = ohContent.replace("tests/cases/compiler", "tests/cases/compiler-oh");
            }
            const ohBaselineNamePath = path.join(baselineDir, ohCompilerCasesName).replace(".ts", type);
            fs.writeFileSync(ohBaselineNamePath, ohContent);
        }
    }
}

function main() {
    GenOHFourslashTestCases();
    GenOHCompilerTestCases();
}

main()