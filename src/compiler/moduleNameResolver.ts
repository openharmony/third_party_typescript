import {
    append, appendIfUnique, arrayFrom, changeAnyExtension, CharacterCodes, choosePathContainsModules, combinePaths,
    comparePaths, Comparison, CompilerOptions, contains, containsPath, createCompilerDiagnostic, Debug, Diagnostic,
    DiagnosticMessage, DiagnosticReporter, Diagnostics, directoryProbablyExists, directorySeparator, emptyArray,
    endsWith, ensureTrailingDirectorySeparator, ESMap, every, Extension, extensionIsTS, fileExtensionIs,
    fileExtensionIsOneOf, FileReference, filter, firstDefined, forEach, forEachAncestorDirectory, formatMessage,
    getBaseFileName, GetCanonicalFileName, getCommonSourceDirectory, getDirectoryPath, GetEffectiveTypeRootsHost,
    getEmitModuleKind, getEmitModuleResolutionKind, getModeForResolutionAtIndex, getModuleByPMType,
    getModulePathPartByPMType, getNormalizedAbsolutePath, getOwnKeys, getPackageJsonByPMType, getPathComponents,
    getPathFromPathComponents, getPathsBasePath, getPossibleOriginalInputExtensionForExtension,
    getRelativePathFromDirectory, getRootLength, hasJSFileExtension, hasProperty, hasTrailingDirectorySeparator,
    hasTSFileExtension, hostGetCanonicalFileName, isArray, isExternalModuleNameRelative, isOhpm, isRootedDiskPath,
    isString, lastOrUndefined, length, Map, MapLike, matchedText, MatchingKeys, matchPatternOrExact, ModuleKind,
    ModuleResolutionHost, ModuleResolutionKind, noop, noopPush, normalizePath, normalizeSlashes,
    optionsHaveModuleResolutionChanges, PackageId, packageIdToString, ParsedCommandLine, Path, pathContainsOHModules,
    pathIsRelative, Pattern, patternText, perfLogger, Push, readJson, removeExtension, removeFileExtension,
    removePrefix, ResolvedModuleWithFailedLookupLocations, ResolvedProjectReference, ResolvedTypeReferenceDirective,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations, some, sort, SourceFile, startsWith, stringContains,
    supportedTSExtensionsFlat, toPath, tryExtractTSExtension, tryGetExtensionFromPath, tryParsePatterns,
    tryRemoveExtension, version, Version, versionMajorMinor, VersionRange,
} from "./_namespaces/ts";

/** @internal */
export function trace(host: ModuleResolutionHost, message: DiagnosticMessage, ...args: any[]): void;
export function trace(host: ModuleResolutionHost): void {
    host.trace!(formatMessage.apply(undefined, arguments));
}

/** @internal */
export function isTraceEnabled(compilerOptions: CompilerOptions, host: ModuleResolutionHost): boolean {
    return !!compilerOptions.traceResolution && host.trace !== undefined;
}

function withPackageId(packageInfo: PackageJsonInfo | undefined, r: PathAndExtension | undefined): Resolved | undefined {
    let packageId: PackageId | undefined;
    if (r && packageInfo) {
        const packageJsonContent = packageInfo.contents.packageJsonContent as PackageJson;
        if (typeof packageJsonContent.name === "string" && typeof packageJsonContent.version === "string") {
            packageId = {
                name: packageJsonContent.name,
                subModuleName: r.path.slice(packageInfo.packageDirectory.length + directorySeparator.length),
                version: packageJsonContent.version
            };
        }
    }
    return r && { path: r.path, extension: r.ext, packageId };
}

function noPackageId(r: PathAndExtension | undefined): Resolved | undefined {
    return withPackageId(/*packageInfo*/ undefined, r);
}

function removeIgnoredPackageId(r: Resolved | undefined): PathAndExtension | undefined {
    if (r) {
        Debug.assert(r.packageId === undefined);
        return { path: r.path, ext: r.extension };
    }
}

/** Result of trying to resolve a module. */
interface Resolved {
    path: string;
    extension: Extension;
    packageId: PackageId | undefined;
    /**
     * When the resolved is not created from cache, the value is
     *  - string if it is symbolic link to the resolved `path`
     *  - undefined if `path` is not a symbolic link
     * When the resolved is created using value from cache of ResolvedModuleWithFailedLookupLocations, the value is:
     *  - string if it is symbolic link to the resolved `path`
     *  - true if `path` is not a symbolic link - this indicates that the `originalPath` calculation is already done and needs to be skipped
     * Note: This is a file name with preserved original casing, not a normalized `Path`.
     */
    originalPath?: string | true;
}

/** Result of trying to resolve a module at a file. Needs to have 'packageId' added later. */
interface PathAndExtension {
    path: string;
    // (Use a different name than `extension` to make sure Resolved isn't assignable to PathAndExtension.)
    ext: Extension;
}

/**
 * Kinds of file that we are currently looking for.
 * Typically there is one pass with Extensions.TypeScript, then a second pass with Extensions.JavaScript.
 */
enum Extensions {
    TypeScript, /** '.ts', '.tsx', '.d.ts', '.ets' or '.d.ets' */
    JavaScript, /** '.js' or '.jsx' */
    Json,       /** '.json' */
    TSConfig,   /** '.json' with `tsconfig` used instead of `index` */
    DtsOnly,    /** Only '.d.ts' */
    TsOnly,     /** '.[cm]tsx?' but not .d.ts variants */
}

interface PathAndPackageId {
    readonly fileName: string;
    readonly packageId: PackageId | undefined;
}
/** Used with `Extensions.DtsOnly` to extract the path from TypeScript results. */
function resolvedTypeScriptOnly(resolved: Resolved | undefined): PathAndPackageId | undefined {
    if (!resolved) {
        return undefined;
    }
    Debug.assert(extensionIsTS(resolved.extension));
    return { fileName: resolved.path, packageId: resolved.packageId };
}

function createResolvedModuleWithFailedLookupLocations(
    resolved: Resolved | undefined,
    isExternalLibraryImport: boolean | undefined,
    failedLookupLocations: string[],
    affectingLocations: string[],
    diagnostics: Diagnostic[],
    resultFromCache: ResolvedModuleWithFailedLookupLocations | undefined
): ResolvedModuleWithFailedLookupLocations {
    if (resultFromCache) {
        resultFromCache.failedLookupLocations.push(...failedLookupLocations);
        resultFromCache.affectingLocations.push(...affectingLocations);
        return resultFromCache;
    }
    return {
        resolvedModule: resolved && { resolvedFileName: resolved.path, originalPath: resolved.originalPath === true ? undefined : resolved.originalPath, extension: resolved.extension, isExternalLibraryImport, packageId: resolved.packageId },
        failedLookupLocations,
        affectingLocations,
        resolutionDiagnostics: diagnostics,
    };
}

/** @internal */
export interface ModuleResolutionState {
    host: ModuleResolutionHost;
    compilerOptions: CompilerOptions;
    traceEnabled: boolean;
    failedLookupLocations: Push<string>;
    affectingLocations: Push<string>;
    resultFromCache?: ResolvedModuleWithFailedLookupLocations;
    packageJsonInfoCache: PackageJsonInfoCache | undefined;
    features: NodeResolutionFeatures;
    conditions: readonly string[];
    requestContainingDirectory: string | undefined;
    reportDiagnostic: DiagnosticReporter;
}

/** Just the fields that we use for module resolution.
 * 
 * @internal
 */
export interface PackageJsonPathFields {
    typings?: string;
    types?: string;
    typesVersions?: MapLike<MapLike<string[]>>;
    main?: string;
    tsconfig?: string;
    type?: string;
    imports?: object;
    exports?: object;
    name?: string;
}

interface PackageJson extends PackageJsonPathFields {
    name?: string;
    version?: string;
}

function readPackageJsonField<TMatch, K extends MatchingKeys<PackageJson, string | undefined>>(jsonContent: PackageJson, fieldName: K, typeOfTag: "string", state: ModuleResolutionState): PackageJson[K] | undefined;
function readPackageJsonField<K extends MatchingKeys<PackageJson, object | undefined>>(jsonContent: PackageJson, fieldName: K, typeOfTag: "object", state: ModuleResolutionState): PackageJson[K] | undefined;
function readPackageJsonField<K extends keyof PackageJson>(jsonContent: PackageJson, fieldName: K, typeOfTag: "string" | "object", state: ModuleResolutionState): PackageJson[K] | undefined {
    if (!hasProperty(jsonContent, fieldName)) {
        if (state.traceEnabled) {
            const message = isOhpm(state.compilerOptions.packageManagerType) ? Diagnostics.oh_package_json5_does_not_have_a_0_field : Diagnostics.package_json_does_not_have_a_0_field;
            trace(state.host, message, fieldName);
        }
        return;
    }
    const value = jsonContent[fieldName];
    if (typeof value !== typeOfTag || value === null) { // eslint-disable-line no-null/no-null
        if (state.traceEnabled) {
            // eslint-disable-next-line no-null/no-null
            trace(state.host, Diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2, fieldName, typeOfTag, value === null ? "null" : typeof value);
        }
        return;
    }
    return value;
}

function readPackageJsonPathField<K extends "typings" | "types" | "main" | "tsconfig">(jsonContent: PackageJson, fieldName: K, baseDirectory: string, state: ModuleResolutionState): PackageJson[K] | undefined {
    const fileName = readPackageJsonField(jsonContent, fieldName, "string", state);
    if (fileName === undefined) {
        return;
    }
    if (!fileName) {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.package_json_had_a_falsy_0_field, fieldName);
        }
        return;
    }
    const path = normalizePath(combinePaths(baseDirectory, fileName));
    if (state.traceEnabled) {
        const message = isOhpm(state.compilerOptions.packageManagerType) ? Diagnostics.oh_package_json5_has_0_field_1_that_references_2 : Diagnostics.package_json_has_0_field_1_that_references_2;
        trace(state.host, message, fieldName, fileName, path);
    }
    return path;
}

function readPackageJsonTypesFields(jsonContent: PackageJson, baseDirectory: string, state: ModuleResolutionState) {
    return readPackageJsonPathField(jsonContent, "typings", baseDirectory, state)
        || readPackageJsonPathField(jsonContent, "types", baseDirectory, state);
}

function readPackageJsonTSConfigField(jsonContent: PackageJson, baseDirectory: string, state: ModuleResolutionState) {
    return readPackageJsonPathField(jsonContent, "tsconfig", baseDirectory, state);
}

function readPackageJsonMainField(jsonContent: PackageJson, baseDirectory: string, state: ModuleResolutionState) {
    return readPackageJsonPathField(jsonContent, "main", baseDirectory, state);
}

function readPackageJsonTypesVersionsField(jsonContent: PackageJson, state: ModuleResolutionState) {
    const typesVersions = readPackageJsonField(jsonContent, "typesVersions", "object", state);
    if (typesVersions === undefined) return;

    if (state.traceEnabled) {
        trace(state.host, Diagnostics.package_json_has_a_typesVersions_field_with_version_specific_path_mappings);
    }

    return typesVersions;
}

/** @internal */
export interface VersionPaths {
    version: string;
    paths: MapLike<string[]>;
}

function readPackageJsonTypesVersionPaths(jsonContent: PackageJson, state: ModuleResolutionState): VersionPaths | undefined {
    const typesVersions = readPackageJsonTypesVersionsField(jsonContent, state);
    if (typesVersions === undefined) return;

    if (state.traceEnabled) {
        for (const key in typesVersions) {
            if (hasProperty(typesVersions, key) && !VersionRange.tryParse(key)) {
                trace(state.host, Diagnostics.package_json_has_a_typesVersions_entry_0_that_is_not_a_valid_semver_range, key);
            }
        }
    }

    const result = getPackageJsonTypesVersionsPaths(typesVersions);
    if (!result) {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.package_json_does_not_have_a_typesVersions_entry_that_matches_version_0, versionMajorMinor);
        }
        return;
    }

    const { version: bestVersionKey, paths: bestVersionPaths } = result;
    if (typeof bestVersionPaths !== "object") {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2, `typesVersions['${bestVersionKey}']`, "object", typeof bestVersionPaths);
        }
        return;
    }

    return result;
}

let typeScriptVersion: Version | undefined;

/** @internal */
export function getPackageJsonTypesVersionsPaths(typesVersions: MapLike<MapLike<string[]>>) {
    if (!typeScriptVersion) typeScriptVersion = new Version(version);

    for (const key in typesVersions) {
        if (!hasProperty(typesVersions, key)) continue;

        const keyRange = VersionRange.tryParse(key);
        if (keyRange === undefined) {
            continue;
        }

        // return the first entry whose range matches the current compiler version.
        if (keyRange.test(typeScriptVersion)) {
            return { version: key, paths: typesVersions[key] };
        }
    }
}

export function getEffectiveTypeRoots(options: CompilerOptions, host: GetEffectiveTypeRootsHost): string[] | undefined {
    if (options.typeRoots) {
        return options.typeRoots;
    }

    let currentDirectory: string | undefined;
    if (options.configFilePath) {
        currentDirectory = getDirectoryPath(options.configFilePath);
    }
    else if (host.getCurrentDirectory) {
        currentDirectory = host.getCurrentDirectory();
    }

    if (currentDirectory !== undefined) {
        return getDefaultTypeRoots(currentDirectory, host, options.packageManagerType);
    }
}

/**
 * Returns the path to every node_modules/@types or oh_modules/@types directory from some ancestor directory.
 * Returns undefined if there are none.
 */
function getDefaultTypeRoots(currentDirectory: string, host: { directoryExists?: (directoryName: string) => boolean }, packageManagerType?: string): string[] | undefined {
    const modulesAtTypes = combinePaths(getModuleByPMType(packageManagerType), "@types");

    if (!host.directoryExists) {
        return [combinePaths(currentDirectory, modulesAtTypes)];
        // And if it doesn't exist, tough.
    }

    let typeRoots: string[] | undefined;
    forEachAncestorDirectory(normalizePath(currentDirectory), directory => {
        const atTypes = combinePaths(directory, modulesAtTypes);
        if (host.directoryExists!(atTypes)) {
            (typeRoots || (typeRoots = [])).push(atTypes);
        }
        return undefined;
    });
    return typeRoots;
}

function arePathsEqual(path1: string, path2: string, host: ModuleResolutionHost): boolean {
    const useCaseSensitiveFileNames = typeof host.useCaseSensitiveFileNames === "function" ? host.useCaseSensitiveFileNames() : host.useCaseSensitiveFileNames;
    return comparePaths(path1, path2, !useCaseSensitiveFileNames) === Comparison.EqualTo;
}

/**
 * @param {string | undefined} containingFile - file that contains type reference directive, can be undefined if containing file is unknown.
 * This is possible in case if resolution is performed for directives specified via 'types' parameter. In this case initial path for secondary lookups
 * is assumed to be the same as root directory of the project.
 */
export function resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string | undefined, options: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference, cache?: TypeReferenceDirectiveResolutionCache, resolutionMode?: SourceFile["impliedNodeFormat"]): ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
    Debug.assert(typeof typeReferenceDirectiveName === "string", "Non-string value passed to `ts.resolveTypeReferenceDirective`, likely by a wrapping package working with an outdated `resolveTypeReferenceDirectives` signature. This is probably not a problem in TS itself.");
    const traceEnabled = isTraceEnabled(options, host);
    if (redirectedReference) {
        options = redirectedReference.commandLine.options;
    }

    const containingDirectory = containingFile ? getDirectoryPath(containingFile) : undefined;
    const perFolderCache = containingDirectory ? cache && cache.getOrCreateCacheForDirectory(containingDirectory, redirectedReference) : undefined;
    let result = perFolderCache && perFolderCache.get(typeReferenceDirectiveName, /*mode*/ resolutionMode);
    if (result) {
        if (traceEnabled) {
            trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_1, typeReferenceDirectiveName, containingFile);
            if (redirectedReference) trace(host, Diagnostics.Using_compiler_options_of_project_reference_redirect_0, redirectedReference.sourceFile.fileName);
            trace(host, Diagnostics.Resolution_for_type_reference_directive_0_was_found_in_cache_from_location_1, typeReferenceDirectiveName, containingDirectory);
            traceResult(result);
        }
        return result;
    }

    const typeRoots = getEffectiveTypeRoots(options, host);
    if (traceEnabled) {
        if (containingFile === undefined) {
            if (typeRoots === undefined) {
                trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_not_set_root_directory_not_set, typeReferenceDirectiveName);
            }
            else {
                trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_not_set_root_directory_1, typeReferenceDirectiveName, typeRoots);
            }
        }
        else {
            if (typeRoots === undefined) {
                trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_1_root_directory_not_set, typeReferenceDirectiveName, containingFile);
            }
            else {
                trace(host, Diagnostics.Resolving_type_reference_directive_0_containing_file_1_root_directory_2, typeReferenceDirectiveName, containingFile, typeRoots);
            }
        }
        if (redirectedReference) {
            trace(host, Diagnostics.Using_compiler_options_of_project_reference_redirect_0, redirectedReference.sourceFile.fileName);
        }
    }

    const failedLookupLocations: string[] = [];
    const affectingLocations: string[] = [];
    let features = getDefaultNodeResolutionFeatures(options);
    // Unlike `import` statements, whose mode-calculating APIs are all guaranteed to return `undefined` if we're in an un-mode-ed module resolution
    // setting, type references will return their target mode regardless of options because of how the parser works, so we guard against the mode being
    // set in a non-modal module resolution setting here. Do note that our behavior is not particularly well defined when these mode-overriding imports
    // are present in a non-modal project; while in theory we'd like to either ignore the mode or provide faithful modern resolution, depending on what we feel is best,
    // in practice, not every cache has the options available to intelligently make the choice to ignore the mode request, and it's unclear how modern "faithful modern
    // resolution" should be (`node16`? `nodenext`?). As such, witnessing a mode-overriding triple-slash reference in a non-modal module resolution
    // context should _probably_ be an error - and that should likely be handled by the `Program` (which is what we do).
    if (resolutionMode === ModuleKind.ESNext && (getEmitModuleResolutionKind(options) === ModuleResolutionKind.Node16 || getEmitModuleResolutionKind(options) === ModuleResolutionKind.NodeNext)) {
        features |= NodeResolutionFeatures.EsmMode;
    }
    const conditions = features & NodeResolutionFeatures.Exports ? features & NodeResolutionFeatures.EsmMode ? ["node", "import", "types"] : ["node", "require", "types"] : [];
    const diagnostics: Diagnostic[] = [];
    const moduleResolutionState: ModuleResolutionState = {
        compilerOptions: options,
        host,
        traceEnabled,
        failedLookupLocations,
        affectingLocations,
        packageJsonInfoCache: cache,
        features,
        conditions,
        requestContainingDirectory: containingDirectory,
        reportDiagnostic: diag => void diagnostics.push(diag),
    };
    let resolved = primaryLookup();
    let primary = true;
    if (!resolved) {
        resolved = secondaryLookup();
        primary = false;
    }

    let resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective | undefined;
    if (resolved) {
        const { fileName, packageId } = resolved;
        const resolvedFileName = options.preserveSymlinks ? fileName : realPath(fileName, host, traceEnabled);
        const pathsAreEqual = arePathsEqual(fileName, resolvedFileName, host);
        resolvedTypeReferenceDirective = {
            primary,
            // If the fileName and realpath are differing only in casing prefer fileName so that we can issue correct errors for casing under forceConsistentCasingInFileNames
            resolvedFileName: pathsAreEqual ? fileName : resolvedFileName,
            originalPath: pathsAreEqual ? undefined : fileName,
            packageId,
            isExternalLibraryImport: choosePathContainsModules(options.packageManagerType, fileName),
        };
    }
    result = { resolvedTypeReferenceDirective, failedLookupLocations, affectingLocations, resolutionDiagnostics: diagnostics };
    perFolderCache?.set(typeReferenceDirectiveName, /*mode*/ resolutionMode, result);
    if (traceEnabled) traceResult(result);
    return result;

    function traceResult(result: ResolvedTypeReferenceDirectiveWithFailedLookupLocations) {
        if (!result.resolvedTypeReferenceDirective?.resolvedFileName) {
            trace(host, Diagnostics.Type_reference_directive_0_was_not_resolved, typeReferenceDirectiveName);
        }
        else if (result.resolvedTypeReferenceDirective.packageId) {
            trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_with_Package_ID_2_primary_Colon_3, typeReferenceDirectiveName, result.resolvedTypeReferenceDirective.resolvedFileName, packageIdToString(result.resolvedTypeReferenceDirective.packageId), result.resolvedTypeReferenceDirective.primary);
        }
        else {
            trace(host, Diagnostics.Type_reference_directive_0_was_successfully_resolved_to_1_primary_Colon_2, typeReferenceDirectiveName, result.resolvedTypeReferenceDirective.resolvedFileName, result.resolvedTypeReferenceDirective.primary);
        }
    }

    function primaryLookup(): PathAndPackageId | undefined {
        // Check primary library paths
        if (typeRoots && typeRoots.length) {
            if (traceEnabled) {
                trace(host, Diagnostics.Resolving_with_primary_search_path_0, typeRoots.join(", "));
            }
            return firstDefined(typeRoots, typeRoot => {
                const candidate = combinePaths(typeRoot, typeReferenceDirectiveName);
                const candidateDirectory = getDirectoryPath(candidate);
                const directoryExists = directoryProbablyExists(candidateDirectory, host);
                if (!directoryExists && traceEnabled) {
                    trace(host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, candidateDirectory);
                }
                return resolvedTypeScriptOnly(
                    loadNodeModuleFromDirectory(Extensions.DtsOnly, candidate,
                        !directoryExists, moduleResolutionState));
            });
        }
        else {
            if (traceEnabled) {
                trace(host, Diagnostics.Root_directory_cannot_be_determined_skipping_primary_search_paths);
            }
        }
    }

    function secondaryLookup(): PathAndPackageId | undefined {
        const initialLocationForSecondaryLookup = containingFile && getDirectoryPath(containingFile);
        const packageManagerType = options.packageManagerType;
        if (initialLocationForSecondaryLookup !== undefined) {
            // check secondary locations
            if (traceEnabled) {
                const message = isOhpm(packageManagerType) ? Diagnostics.Looking_up_in_oh_modules_folder_initial_location_0: Diagnostics.Looking_up_in_node_modules_folder_initial_location_0;
                trace(host, message, initialLocationForSecondaryLookup);
            }
            let result: Resolved | undefined;
            if (!isExternalModuleNameRelative(typeReferenceDirectiveName)) {
                const searchResult = loadModuleFromNearestNodeModulesDirectory(Extensions.DtsOnly, typeReferenceDirectiveName, initialLocationForSecondaryLookup, moduleResolutionState, /*cache*/ undefined, /*redirectedReference*/ undefined);
                result = searchResult && searchResult.value;
            }
            else {
                const { path: candidate } = normalizePathForCJSResolution(initialLocationForSecondaryLookup, typeReferenceDirectiveName);
                result = nodeLoadModuleByRelativeName(Extensions.DtsOnly, candidate, /*onlyRecordFailures*/ false, moduleResolutionState, /*considerPackageJson*/ true);
            }
            return resolvedTypeScriptOnly(result);
        }
        else {
            if (traceEnabled) {
                const message = isOhpm(packageManagerType) ? Diagnostics.Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_oh_modules_folder :
                  Diagnostics.Containing_file_is_not_specified_and_root_directory_cannot_be_determined_skipping_lookup_in_node_modules_folder;
                trace(host, message);
            }
        }
    }
}

function getDefaultNodeResolutionFeatures(options: CompilerOptions) {
    return getEmitModuleResolutionKind(options) === ModuleResolutionKind.Node16 ? NodeResolutionFeatures.Node16Default :
        getEmitModuleResolutionKind(options) === ModuleResolutionKind.NodeNext ? NodeResolutionFeatures.NodeNextDefault :
            NodeResolutionFeatures.None;
}

/**
 * @internal
 * Does not try `@types/${packageName}` - use a second pass if needed.
 */
export function resolvePackageNameToPackageJson(
    packageName: string,
    containingDirectory: string,
    options: CompilerOptions,
    host: ModuleResolutionHost,
    cache: ModuleResolutionCache | undefined,
): PackageJsonInfo | undefined {
    const moduleResolutionState = getTemporaryModuleResolutionState(cache?.getPackageJsonInfoCache(), host, options);

    return forEachAncestorDirectory(containingDirectory, ancestorDirectory => {
        if (getBaseFileName(ancestorDirectory) !== "node_modules" && getBaseFileName(ancestorDirectory) !== "oh_modules") {
            const modulePathPart = getModuleByPMType(options.packageManagerType)
            const nodeModulesFolder = combinePaths(ancestorDirectory, modulePathPart);
            const candidate = combinePaths(nodeModulesFolder, packageName);
            return getPackageJsonInfo(candidate, /*onlyRecordFailures*/ false, moduleResolutionState);
        }
    });
}

/**
 * Given a set of options, returns the set of type directive names
 *   that should be included for this program automatically.
 * This list could either come from the config file,
 *   or from enumerating the types root + initial secondary types lookup location.
 * More type directives might appear in the program later as a result of loading actual source files;
 *   this list is only the set of defaults that are implicitly included.
 */
export function getAutomaticTypeDirectiveNames(options: CompilerOptions, host: ModuleResolutionHost): string[] {
    // Use explicit type list from tsconfig.json
    if (options.types) {
        return options.types;
    }

    // Walk the primary type lookup locations
    const result: string[] = [];
    if (host.directoryExists && host.getDirectories) {
        const typeRoots = getEffectiveTypeRoots(options, host);
        if (typeRoots) {
            for (const root of typeRoots) {
                if (host.directoryExists(root)) {
                    for (const typeDirectivePath of host.getDirectories(root)) {
                        const normalized = normalizePath(typeDirectivePath);
                        const packageJsonPath = combinePaths(root, normalized, getPackageJsonByPMType(options.packageManagerType));
                        // `types-publisher` sometimes creates packages with `"typings": null` for packages that don't provide their own types.
                        // See `createNotNeededPackageJSON` in the types-publisher` repo.
                        // eslint-disable-next-line no-null/no-null
                        let isNotNeededPackage: boolean;
                        if (isOhpm(options.packageManagerType)) {
                            isNotNeededPackage = host.fileExists(packageJsonPath) && require("json5").parse(host.readFile!(packageJsonPath)!).typings === null;
                        }
                        else {
                            isNotNeededPackage = host.fileExists(packageJsonPath) && (readJson(packageJsonPath, host) as PackageJson).typings === null;
                        }
                        if (!isNotNeededPackage) {
                            const baseFileName = getBaseFileName(normalized);

                            // At this stage, skip results with leading dot.
                            if (baseFileName.charCodeAt(0) !== CharacterCodes.dot) {
                                // Return just the type directive names
                                result.push(baseFileName);
                            }
                        }
                    }
                }
            }
        }
    }
    return result;
}

export interface TypeReferenceDirectiveResolutionCache extends PerDirectoryResolutionCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>, PackageJsonInfoCache {
    /** @internal */clearAllExceptPackageJsonInfoCache(): void;
}

export interface ModeAwareCache<T> {
    get(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined): T | undefined;
    set(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined, value: T): this;
    delete(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined): this;
    has(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined): boolean;
    forEach(cb: (elem: T, key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined) => void): void;
    size(): number;
}

/**
 * Cached resolutions per containing directory.
 * This assumes that any module id will have the same resolution for sibling files located in the same folder.
 */
export interface PerDirectoryResolutionCache<T> {
    getOrCreateCacheForDirectory(directoryName: string, redirectedReference?: ResolvedProjectReference): ModeAwareCache<T>;
    clear(): void;
    /**
     *  Updates with the current compilerOptions the cache will operate with.
     *  This updates the redirects map as well if needed so module resolutions are cached if they can across the projects
     */
    update(options: CompilerOptions): void;
}

export interface ModuleResolutionCache extends PerDirectoryResolutionCache<ResolvedModuleWithFailedLookupLocations>, NonRelativeModuleNameResolutionCache, PackageJsonInfoCache {
    getPackageJsonInfoCache(): PackageJsonInfoCache;
    /** @internal */ clearAllExceptPackageJsonInfoCache(): void;
}

/**
 * Stored map from non-relative module name to a table: directory -> result of module lookup in this directory
 * We support only non-relative module names because resolution of relative module names is usually more deterministic and thus less expensive.
 */
export interface NonRelativeModuleNameResolutionCache extends PackageJsonInfoCache {
    getOrCreateCacheForModuleName(nonRelativeModuleName: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined, redirectedReference?: ResolvedProjectReference): PerModuleNameCache;
}

export interface PackageJsonInfoCache {
    /** @internal */ getPackageJsonInfo(packageJsonPath: string): PackageJsonInfo | boolean | undefined;
    /** @internal */ setPackageJsonInfo(packageJsonPath: string, info: PackageJsonInfo | boolean): void;
    /** @internal */ entries(): [Path, PackageJsonInfo | boolean][];
    /** @internal */ getInternalMap(): ESMap<Path, PackageJsonInfo | boolean> | undefined;
    clear(): void;
}

export interface PerModuleNameCache {
    get(directory: string): ResolvedModuleWithFailedLookupLocations | undefined;
    set(directory: string, result: ResolvedModuleWithFailedLookupLocations): void;
}

/** @internal */
export interface CacheWithRedirects<T> {
    getOwnMap: () => ESMap<string, T>;
    redirectsMap: ESMap<Path, ESMap<string, T>>;
    getOrCreateMapOfCacheRedirects(redirectedReference: ResolvedProjectReference | undefined): ESMap<string, T>;
    clear(): void;
    setOwnOptions(newOptions: CompilerOptions): void;
    setOwnMap(newOwnMap: ESMap<string, T>): void;
}

/** @internal */
export function createCacheWithRedirects<T>(options?: CompilerOptions): CacheWithRedirects<T> {
    let ownMap: ESMap<string, T> = new Map();
    const redirectsMap = new Map<Path, ESMap<string, T>>();
    return {
        getOwnMap,
        redirectsMap,
        getOrCreateMapOfCacheRedirects,
        clear,
        setOwnOptions,
        setOwnMap
    };

    function getOwnMap() {
        return ownMap;
    }

    function setOwnOptions(newOptions: CompilerOptions) {
        options = newOptions;
    }

    function setOwnMap(newOwnMap: ESMap<string, T>) {
        ownMap = newOwnMap;
    }

    function getOrCreateMapOfCacheRedirects(redirectedReference: ResolvedProjectReference | undefined) {
        if (!redirectedReference) {
            return ownMap;
        }
        const path = redirectedReference.sourceFile.path;
        let redirects = redirectsMap.get(path);
        if (!redirects) {
            // Reuse map if redirected reference map uses same resolution
            redirects = !options || optionsHaveModuleResolutionChanges(options, redirectedReference.commandLine.options) ? new Map() : ownMap;
            redirectsMap.set(path, redirects);
        }
        return redirects;
    }

    function clear() {
        ownMap.clear();
        redirectsMap.clear();
    }
}

function createPackageJsonInfoCache(currentDirectory: string, getCanonicalFileName: (s: string) => string): PackageJsonInfoCache {
    let cache: ESMap<Path, PackageJsonInfo | boolean> | undefined;
    return { getPackageJsonInfo, setPackageJsonInfo, clear, entries, getInternalMap };
    function getPackageJsonInfo(packageJsonPath: string) {
        return cache?.get(toPath(packageJsonPath, currentDirectory, getCanonicalFileName));
    }
    function setPackageJsonInfo(packageJsonPath: string, info: PackageJsonInfo | boolean) {
        (cache ||= new Map()).set(toPath(packageJsonPath, currentDirectory, getCanonicalFileName), info);
    }
    function clear() {
        cache = undefined;
    }
    function entries() {
        const iter = cache?.entries();
        return iter ? arrayFrom(iter) : [];
    }
    function getInternalMap() {
        return cache;
    }
}

function getOrCreateCache<T>(cacheWithRedirects: CacheWithRedirects<T>, redirectedReference: ResolvedProjectReference | undefined, key: string, create: () => T): T {
    const cache = cacheWithRedirects.getOrCreateMapOfCacheRedirects(redirectedReference);
    let result = cache.get(key);
    if (!result) {
        result = create();
        cache.set(key, result);
    }
    return result;
}

function updateRedirectsMap<T>(
    options: CompilerOptions,
    directoryToModuleNameMap: CacheWithRedirects<ModeAwareCache<T>>,
    moduleNameToDirectoryMap?: CacheWithRedirects<PerModuleNameCache>
) {
    if (!options.configFile) return;
    if (directoryToModuleNameMap.redirectsMap.size === 0) {
        // The own map will be for projectCompilerOptions
        Debug.assert(!moduleNameToDirectoryMap || moduleNameToDirectoryMap.redirectsMap.size === 0);
        Debug.assert(directoryToModuleNameMap.getOwnMap().size === 0);
        Debug.assert(!moduleNameToDirectoryMap || moduleNameToDirectoryMap.getOwnMap().size === 0);
        directoryToModuleNameMap.redirectsMap.set(options.configFile.path, directoryToModuleNameMap.getOwnMap());
        moduleNameToDirectoryMap?.redirectsMap.set(options.configFile.path, moduleNameToDirectoryMap.getOwnMap());
    }
    else {
        // Set correct own map
        Debug.assert(!moduleNameToDirectoryMap || moduleNameToDirectoryMap.redirectsMap.size > 0);
        const ref: ResolvedProjectReference = {
            sourceFile: options.configFile,
            commandLine: { options } as ParsedCommandLine
        };
        directoryToModuleNameMap.setOwnMap(directoryToModuleNameMap.getOrCreateMapOfCacheRedirects(ref));
        moduleNameToDirectoryMap?.setOwnMap(moduleNameToDirectoryMap.getOrCreateMapOfCacheRedirects(ref));
    }
    directoryToModuleNameMap.setOwnOptions(options);
    moduleNameToDirectoryMap?.setOwnOptions(options);
}

function createPerDirectoryResolutionCache<T>(currentDirectory: string, getCanonicalFileName: GetCanonicalFileName, directoryToModuleNameMap: CacheWithRedirects<ModeAwareCache<T>>): PerDirectoryResolutionCache<T> {
    return {
        getOrCreateCacheForDirectory,
        clear,
        update,
    };

    function clear() {
        directoryToModuleNameMap.clear();
    }

    function update(options: CompilerOptions) {
        updateRedirectsMap(options, directoryToModuleNameMap);
    }

    function getOrCreateCacheForDirectory(directoryName: string, redirectedReference?: ResolvedProjectReference) {
        const path = toPath(directoryName, currentDirectory, getCanonicalFileName);
        return getOrCreateCache<ModeAwareCache<T>>(directoryToModuleNameMap, redirectedReference, path, () => createModeAwareCache());
    }
}

/** @internal */
export function createModeAwareCache<T>(): ModeAwareCache<T> {
    const underlying = new Map<string, T>();
    const memoizedReverseKeys = new Map<string, [specifier: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined]>();

    const cache: ModeAwareCache<T> = {
        get(specifier, mode) {
            return underlying.get(getUnderlyingCacheKey(specifier, mode));
        },
        set(specifier, mode, value) {
            underlying.set(getUnderlyingCacheKey(specifier, mode), value);
            return cache;
        },
        delete(specifier, mode) {
            underlying.delete(getUnderlyingCacheKey(specifier, mode));
            return cache;
        },
        has(specifier, mode) {
            return underlying.has(getUnderlyingCacheKey(specifier, mode));
        },
        forEach(cb) {
            return underlying.forEach((elem, key) => {
                const [specifier, mode] = memoizedReverseKeys.get(key)!;
                return cb(elem, specifier, mode);
            });
        },
        size() {
            return underlying.size;
        }
    };
    return cache;

    function getUnderlyingCacheKey(specifier: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined) {
        const result = mode === undefined ? specifier : `${mode}|${specifier}`;
        memoizedReverseKeys.set(result, [specifier, mode]);
        return result;
    }
}

/** @internal */
export function zipToModeAwareCache<V>(file: SourceFile, keys: readonly string[] | readonly FileReference[], values: readonly V[]): ModeAwareCache<V> {
    Debug.assert(keys.length === values.length);
    const map = createModeAwareCache<V>();
    for (let i = 0; i < keys.length; ++i) {
        const entry = keys[i];
        // We lower-case all type references because npm automatically lowercases all packages. See GH#9824.
        const name = !isString(entry) ? entry.fileName.toLowerCase() : entry;
        const mode = !isString(entry) ? entry.resolutionMode || file.impliedNodeFormat : getModeForResolutionAtIndex(file, i);
        map.set(name, mode, values[i]);
    }
    return map;
}

export function createModuleResolutionCache(
    currentDirectory: string,
    getCanonicalFileName: (s: string) => string,
    options?: CompilerOptions
): ModuleResolutionCache;
/** @internal */
export function createModuleResolutionCache(
    currentDirectory: string,
    getCanonicalFileName: GetCanonicalFileName,
    options: undefined,
    directoryToModuleNameMap: CacheWithRedirects<ModeAwareCache<ResolvedModuleWithFailedLookupLocations>>,
    moduleNameToDirectoryMap: CacheWithRedirects<PerModuleNameCache>,
): ModuleResolutionCache;
export function createModuleResolutionCache(
    currentDirectory: string,
    getCanonicalFileName: GetCanonicalFileName,
    options?: CompilerOptions,
    directoryToModuleNameMap?: CacheWithRedirects<ModeAwareCache<ResolvedModuleWithFailedLookupLocations>>,
    moduleNameToDirectoryMap?: CacheWithRedirects<PerModuleNameCache>,
): ModuleResolutionCache {
    const perDirectoryResolutionCache = createPerDirectoryResolutionCache(currentDirectory, getCanonicalFileName, directoryToModuleNameMap ||= createCacheWithRedirects(options));
    moduleNameToDirectoryMap ||= createCacheWithRedirects(options);
    const packageJsonInfoCache = createPackageJsonInfoCache(currentDirectory, getCanonicalFileName);

    return {
        ...packageJsonInfoCache,
        ...perDirectoryResolutionCache,
        getOrCreateCacheForModuleName,
        clear,
        update,
        getPackageJsonInfoCache: () => packageJsonInfoCache,
        clearAllExceptPackageJsonInfoCache,
    };

    function clear() {
        clearAllExceptPackageJsonInfoCache();
        packageJsonInfoCache.clear();
    }

    function clearAllExceptPackageJsonInfoCache() {
        perDirectoryResolutionCache.clear();
        moduleNameToDirectoryMap!.clear();
    }

    function update(options: CompilerOptions) {
        updateRedirectsMap(options, directoryToModuleNameMap!, moduleNameToDirectoryMap);
    }

    function getOrCreateCacheForModuleName(nonRelativeModuleName: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined, redirectedReference?: ResolvedProjectReference): PerModuleNameCache {
        Debug.assert(!isExternalModuleNameRelative(nonRelativeModuleName));
        return getOrCreateCache(moduleNameToDirectoryMap!, redirectedReference, mode === undefined ? nonRelativeModuleName : `${mode}|${nonRelativeModuleName}`, createPerModuleNameCache);
    }

    function createPerModuleNameCache(): PerModuleNameCache {
        const directoryPathMap = new Map<string, ResolvedModuleWithFailedLookupLocations>();

        return { get, set };

        function get(directory: string): ResolvedModuleWithFailedLookupLocations | undefined {
            return directoryPathMap.get(toPath(directory, currentDirectory, getCanonicalFileName));
        }

        /**
         * At first this function add entry directory -> module resolution result to the table.
         * Then it computes the set of parent folders for 'directory' that should have the same module resolution result
         * and for every parent folder in set it adds entry: parent -> module resolution. .
         * Lets say we first directory name: /a/b/c/d/e and resolution result is: /a/b/bar.ts.
         * Set of parent folders that should have the same result will be:
         * [
         *     /a/b/c/d, /a/b/c, /a/b
         * ]
         * this means that request for module resolution from file in any of these folder will be immediately found in cache.
         */
        function set(directory: string, result: ResolvedModuleWithFailedLookupLocations): void {
            const path = toPath(directory, currentDirectory, getCanonicalFileName);
            // if entry is already in cache do nothing
            if (directoryPathMap.has(path)) {
                return;
            }
            directoryPathMap.set(path, result);

            const resolvedFileName = result.resolvedModule &&
                (result.resolvedModule.originalPath || result.resolvedModule.resolvedFileName);
            // find common prefix between directory and resolved file name
            // this common prefix should be the shortest path that has the same resolution
            // directory: /a/b/c/d/e
            // resolvedFileName: /a/b/foo.d.ts
            // commonPrefix: /a/b
            // for failed lookups cache the result for every directory up to root
            const commonPrefix = resolvedFileName && getCommonPrefix(path, resolvedFileName);
            let current = path;
            while (current !== commonPrefix) {
                const parent = getDirectoryPath(current);
                if (parent === current || directoryPathMap.has(parent)) {
                    break;
                }
                directoryPathMap.set(parent, result);
                current = parent;
            }
        }

        function getCommonPrefix(directory: Path, resolution: string) {
            const resolutionDirectory = toPath(getDirectoryPath(resolution), currentDirectory, getCanonicalFileName);

            // find first position where directory and resolution differs
            let i = 0;
            const limit = Math.min(directory.length, resolutionDirectory.length);
            while (i < limit && directory.charCodeAt(i) === resolutionDirectory.charCodeAt(i)) {
                i++;
            }
            if (i === directory.length && (resolutionDirectory.length === i || resolutionDirectory[i] === directorySeparator)) {
                return directory;
            }
            const rootLength = getRootLength(directory);
            if (i < rootLength) {
                return undefined;
            }
            const sep = directory.lastIndexOf(directorySeparator, i - 1);
            if (sep === -1) {
                return undefined;
            }
            return directory.substr(0, Math.max(sep, rootLength));
        }
    }
}

export function createTypeReferenceDirectiveResolutionCache(
    currentDirectory: string,
    getCanonicalFileName: (s: string) => string,
    options?: CompilerOptions,
    packageJsonInfoCache?: PackageJsonInfoCache,
): TypeReferenceDirectiveResolutionCache;
/** @internal */
export function createTypeReferenceDirectiveResolutionCache(
    currentDirectory: string,
    getCanonicalFileName: GetCanonicalFileName,
    options: undefined,
    packageJsonInfoCache: PackageJsonInfoCache | undefined,
    directoryToModuleNameMap: CacheWithRedirects<ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>,
): TypeReferenceDirectiveResolutionCache;
export function createTypeReferenceDirectiveResolutionCache(
    currentDirectory: string,
    getCanonicalFileName: GetCanonicalFileName,
    options?: CompilerOptions,
    packageJsonInfoCache?: PackageJsonInfoCache | undefined,
    directoryToModuleNameMap?: CacheWithRedirects<ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>>,
): TypeReferenceDirectiveResolutionCache {
    const perDirectoryResolutionCache = createPerDirectoryResolutionCache(currentDirectory, getCanonicalFileName, directoryToModuleNameMap ||= createCacheWithRedirects(options));
    packageJsonInfoCache ||= createPackageJsonInfoCache(currentDirectory, getCanonicalFileName);

    return {
        ...packageJsonInfoCache,
        ...perDirectoryResolutionCache,
        clear,
        clearAllExceptPackageJsonInfoCache,
    };

    function clear() {
        clearAllExceptPackageJsonInfoCache();
        packageJsonInfoCache!.clear();
    }

    function clearAllExceptPackageJsonInfoCache() {
        perDirectoryResolutionCache.clear();
    }
}

export function resolveModuleNameFromCache(moduleName: string, containingFile: string, cache: ModuleResolutionCache, mode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations | undefined {
    const containingDirectory = getDirectoryPath(containingFile);
    const perFolderCache = cache && cache.getOrCreateCacheForDirectory(containingDirectory);
    if (!perFolderCache) return undefined;
    return perFolderCache.get(moduleName, mode);
}

export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference, resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations {
    const traceEnabled = isTraceEnabled(compilerOptions, host);
    if (redirectedReference) {
        compilerOptions = redirectedReference.commandLine.options;
    }
    if (traceEnabled) {
        trace(host, Diagnostics.Resolving_module_0_from_1, moduleName, containingFile);
        if (redirectedReference) {
            trace(host, Diagnostics.Using_compiler_options_of_project_reference_redirect_0, redirectedReference.sourceFile.fileName);
        }
    }
    const containingDirectory = getDirectoryPath(containingFile);
    const perFolderCache = cache && cache.getOrCreateCacheForDirectory(containingDirectory, redirectedReference);
    let result = perFolderCache && perFolderCache.get(moduleName, resolutionMode);

    if (result) {
        if (traceEnabled) {
            trace(host, Diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1, moduleName, containingDirectory);
        }
    }
    else {
        let moduleResolution = compilerOptions.moduleResolution;
        if (moduleResolution === undefined) {
            switch (getEmitModuleKind(compilerOptions)) {
                case ModuleKind.CommonJS:
                    moduleResolution = ModuleResolutionKind.NodeJs;
                    break;
                case ModuleKind.Node16:
                    moduleResolution = ModuleResolutionKind.Node16;
                    break;
                case ModuleKind.NodeNext:
                    moduleResolution = ModuleResolutionKind.NodeNext;
                    break;
                default:
                    moduleResolution = ModuleResolutionKind.Classic;
                    break;
            }
            if (traceEnabled) {
                trace(host, Diagnostics.Module_resolution_kind_is_not_specified_using_0, ModuleResolutionKind[moduleResolution]);
            }
        }
        else {
            if (traceEnabled) {
                trace(host, Diagnostics.Explicitly_specified_module_resolution_kind_Colon_0, ModuleResolutionKind[moduleResolution]);
            }
        }

        perfLogger.logStartResolveModule(moduleName /* , containingFile, ModuleResolutionKind[moduleResolution]*/);
        switch (moduleResolution) {
            case ModuleResolutionKind.Node16:
                result = node16ModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode);
                break;
            case ModuleResolutionKind.NodeNext:
                result = nodeNextModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode);
                break;
            case ModuleResolutionKind.NodeJs:
                result = nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference);
                break;
            case ModuleResolutionKind.Classic:
                result = classicNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference);
                break;
            default:
                return Debug.fail(`Unexpected moduleResolution: ${moduleResolution}`);
        }
        if (result && result.resolvedModule) perfLogger.logInfoEvent(`Module "${moduleName}" resolved to "${result.resolvedModule.resolvedFileName}"`);
        perfLogger.logStopResolveModule((result && result.resolvedModule) ? "" + result.resolvedModule.resolvedFileName : "null");

        if (perFolderCache) {
            perFolderCache.set(moduleName, resolutionMode, result);
            if (!isExternalModuleNameRelative(moduleName)) {
                // put result in per-module name cache
                cache.getOrCreateCacheForModuleName(moduleName, resolutionMode, redirectedReference).set(containingDirectory, result);
            }
        }
    }

    if (traceEnabled) {
        if (result.resolvedModule) {
            if (result.resolvedModule.packageId) {
                trace(host, Diagnostics.Module_name_0_was_successfully_resolved_to_1_with_Package_ID_2, moduleName, result.resolvedModule.resolvedFileName, packageIdToString(result.resolvedModule.packageId));
            }
            else {
                trace(host, Diagnostics.Module_name_0_was_successfully_resolved_to_1, moduleName, result.resolvedModule.resolvedFileName);
            }
        }
        else {
            trace(host, Diagnostics.Module_name_0_was_not_resolved, moduleName);
        }
    }

    return result;
}

/*
 * Every module resolution kind can has its specific understanding how to load module from a specific path on disk
 * I.e. for path '/a/b/c':
 * - Node loader will first to try to check if '/a/b/c' points to a file with some supported extension and if this fails
 * it will try to load module from directory: directory '/a/b/c' should exist and it should have either 'package.json' with
 * 'typings' entry or file 'index' with some supported extension
 * - Classic loader will only try to interpret '/a/b/c' as file.
 */
type ResolutionKindSpecificLoader = (extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState) => Resolved | undefined;

/**
 * Any module resolution kind can be augmented with optional settings: 'baseUrl', 'paths' and 'rootDirs' - they are used to
 * mitigate differences between design time structure of the project and its runtime counterpart so the same import name
 * can be resolved successfully by TypeScript compiler and runtime module loader.
 * If these settings are set then loading procedure will try to use them to resolve module name and it can of failure it will
 * fallback to standard resolution routine.
 *
 * - baseUrl - this setting controls how non-relative module names are resolved. If this setting is specified then non-relative
 * names will be resolved relative to baseUrl: i.e. if baseUrl is '/a/b' then candidate location to resolve module name 'c/d' will
 * be '/a/b/c/d'
 * - paths - this setting can only be used when baseUrl is specified. allows to tune how non-relative module names
 * will be resolved based on the content of the module name.
 * Structure of 'paths' compiler options
 * 'paths': {
 *    pattern-1: [...substitutions],
 *    pattern-2: [...substitutions],
 *    ...
 *    pattern-n: [...substitutions]
 * }
 * Pattern here is a string that can contain zero or one '*' character. During module resolution module name will be matched against
 * all patterns in the list. Matching for patterns that don't contain '*' means that module name must be equal to pattern respecting the case.
 * If pattern contains '*' then to match pattern "<prefix>*<suffix>" module name must start with the <prefix> and end with <suffix>.
 * <MatchedStar> denotes part of the module name between <prefix> and <suffix>.
 * If module name can be matches with multiple patterns then pattern with the longest prefix will be picked.
 * After selecting pattern we'll use list of substitutions to get candidate locations of the module and the try to load module
 * from the candidate location.
 * Substitution is a string that can contain zero or one '*'. To get candidate location from substitution we'll pick every
 * substitution in the list and replace '*' with <MatchedStar> string. If candidate location is not rooted it
 * will be converted to absolute using baseUrl.
 * For example:
 * baseUrl: /a/b/c
 * "paths": {
 *     // match all module names
 *     "*": [
 *         "*",        // use matched name as is,
 *                     // <matched name> will be looked as /a/b/c/<matched name>
 *
 *         "folder1/*" // substitution will convert matched name to 'folder1/<matched name>',
 *                     // since it is not rooted then final candidate location will be /a/b/c/folder1/<matched name>
 *     ],
 *     // match module names that start with 'components/'
 *     "components/*": [ "/root/components/*" ] // substitution will convert /components/folder1/<matched name> to '/root/components/folder1/<matched name>',
 *                                              // it is rooted so it will be final candidate location
 * }
 *
 * 'rootDirs' allows the project to be spreaded across multiple locations and resolve modules with relative names as if
 * they were in the same location. For example lets say there are two files
 * '/local/src/content/file1.ts'
 * '/shared/components/contracts/src/content/protocols/file2.ts'
 * After bundling content of '/shared/components/contracts/src' will be merged with '/local/src' so
 * if file1 has the following import 'import {x} from "./protocols/file2"' it will be resolved successfully in runtime.
 * 'rootDirs' provides the way to tell compiler that in order to get the whole project it should behave as if content of all
 * root dirs were merged together.
 * I.e. for the example above 'rootDirs' will have two entries: [ '/local/src', '/shared/components/contracts/src' ].
 * Compiler will first convert './protocols/file2' into absolute path relative to the location of containing file:
 * '/local/src/content/protocols/file2' and try to load it - failure.
 * Then it will search 'rootDirs' looking for a longest matching prefix of this absolute path and if such prefix is found - absolute path will
 * be converted to a path relative to found rootDir entry './content/protocols/file2' (*). As a last step compiler will check all remaining
 * entries in 'rootDirs', use them to build absolute path out of (*) and try to resolve module from this location.
 */
function tryLoadModuleUsingOptionalResolutionSettings(extensions: Extensions, moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader,
    state: ModuleResolutionState): Resolved | undefined {

    const resolved = tryLoadModuleUsingPathsIfEligible(extensions, moduleName, loader, state);
    if (resolved) return resolved.value;

    if (!isExternalModuleNameRelative(moduleName)) {
        return tryLoadModuleUsingBaseUrl(extensions, moduleName, loader, state);
    }
    else {
        return tryLoadModuleUsingRootDirs(extensions, moduleName, containingDirectory, loader, state);
    }
}

function tryLoadModuleUsingPathsIfEligible(extensions: Extensions, moduleName: string, loader: ResolutionKindSpecificLoader, state: ModuleResolutionState) {
    const { baseUrl, paths, configFile } = state.compilerOptions;
    if (paths && !pathIsRelative(moduleName)) {
        if (state.traceEnabled) {
            if (baseUrl) {
                trace(state.host, Diagnostics.baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1, baseUrl, moduleName);
            }
            trace(state.host, Diagnostics.paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0, moduleName);
        }
        const baseDirectory = getPathsBasePath(state.compilerOptions, state.host)!; // Always defined when 'paths' is defined
        const pathPatterns = configFile?.configFileSpecs ? configFile.configFileSpecs.pathPatterns ||= tryParsePatterns(paths) : undefined;
        return tryLoadModuleUsingPaths(extensions, moduleName, baseDirectory, paths, pathPatterns, loader, /*onlyRecordFailures*/ false, state);
    }
}

function tryLoadModuleUsingRootDirs(extensions: Extensions, moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader,
    state: ModuleResolutionState): Resolved | undefined {

    if (!state.compilerOptions.rootDirs) {
        return undefined;
    }

    if (state.traceEnabled) {
        trace(state.host, Diagnostics.rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0, moduleName);
    }

    const candidate = normalizePath(combinePaths(containingDirectory, moduleName));

    let matchedRootDir: string | undefined;
    let matchedNormalizedPrefix: string | undefined;
    for (const rootDir of state.compilerOptions.rootDirs) {
        // rootDirs are expected to be absolute
        // in case of tsconfig.json this will happen automatically - compiler will expand relative names
        // using location of tsconfig.json as base location
        let normalizedRoot = normalizePath(rootDir);
        if (!endsWith(normalizedRoot, directorySeparator)) {
            normalizedRoot += directorySeparator;
        }
        const isLongestMatchingPrefix =
            startsWith(candidate, normalizedRoot) &&
            (matchedNormalizedPrefix === undefined || matchedNormalizedPrefix.length < normalizedRoot.length);

        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Checking_if_0_is_the_longest_matching_prefix_for_1_2, normalizedRoot, candidate, isLongestMatchingPrefix);
        }

        if (isLongestMatchingPrefix) {
            matchedNormalizedPrefix = normalizedRoot;
            matchedRootDir = rootDir;
        }
    }
    if (matchedNormalizedPrefix) {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Longest_matching_prefix_for_0_is_1, candidate, matchedNormalizedPrefix);
        }
        const suffix = candidate.substr(matchedNormalizedPrefix.length);

        // first - try to load from a initial location
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, matchedNormalizedPrefix, candidate);
        }
        const resolvedFileName = loader(extensions, candidate, !directoryProbablyExists(containingDirectory, state.host), state);
        if (resolvedFileName) {
            return resolvedFileName;
        }

        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Trying_other_entries_in_rootDirs);
        }
        // then try to resolve using remaining entries in rootDirs
        for (const rootDir of state.compilerOptions.rootDirs) {
            if (rootDir === matchedRootDir) {
                // skip the initially matched entry
                continue;
            }
            const candidate = combinePaths(normalizePath(rootDir), suffix);
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, rootDir, candidate);
            }
            const baseDirectory = getDirectoryPath(candidate);
            const resolvedFileName = loader(extensions, candidate, !directoryProbablyExists(baseDirectory, state.host), state);
            if (resolvedFileName) {
                return resolvedFileName;
            }
        }
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Module_resolution_using_rootDirs_has_failed);
        }
    }
    return undefined;
}

function tryLoadModuleUsingBaseUrl(extensions: Extensions, moduleName: string, loader: ResolutionKindSpecificLoader, state: ModuleResolutionState): Resolved | undefined {
    const { baseUrl } = state.compilerOptions;
    if (!baseUrl) {
        return undefined;
    }
    if (state.traceEnabled) {
        trace(state.host, Diagnostics.baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1, baseUrl, moduleName);
    }
    const candidate = normalizePath(combinePaths(baseUrl, moduleName));
    if (state.traceEnabled) {
        trace(state.host, Diagnostics.Resolving_module_name_0_relative_to_base_url_1_2, moduleName, baseUrl, candidate);
    }
    return loader(extensions, candidate, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
}

/**
 * Expose resolution logic to allow us to use Node module resolution logic from arbitrary locations.
 * No way to do this with `require()`: https://github.com/nodejs/node/issues/5963
 * Throws an error if the module can't be resolved.
 * 
 * @internal
 */
export function resolveJSModule(moduleName: string, initialDir: string, host: ModuleResolutionHost): string {
    const { resolvedModule, failedLookupLocations } = tryResolveJSModuleWorker(moduleName, initialDir, host);
    if (!resolvedModule) {
        throw new Error(`Could not resolve JS module '${moduleName}' starting at '${initialDir}'. Looked in: ${failedLookupLocations.join(", ")}`);
    }
    return resolvedModule.resolvedFileName;
}

/** @internal */
export enum NodeResolutionFeatures {
    None = 0,
    // resolving `#local` names in your own package.json
    Imports = 1 << 1,
    // resolving `your-own-name` from your own package.json
    SelfName = 1 << 2,
    // respecting the `.exports` member of packages' package.json files and its (conditional) mappings of export names
    Exports = 1 << 3,
    // allowing `*` in the LHS of an export to be followed by more content, eg `"./whatever/*.js"`
    // not supported in node 12 - https://github.com/nodejs/Release/issues/690
    ExportsPatternTrailers = 1 << 4,
    AllFeatures = Imports | SelfName | Exports | ExportsPatternTrailers,

    Node16Default = Imports | SelfName | Exports | ExportsPatternTrailers,

    NodeNextDefault = AllFeatures,

    EsmMode = 1 << 5,
}

function node16ModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions,
        host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference,
        resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations {
    return nodeNextModuleNameResolverWorker(
        NodeResolutionFeatures.Node16Default,
        moduleName,
        containingFile,
        compilerOptions,
        host,
        cache,
        redirectedReference,
        resolutionMode
    );
}

function nodeNextModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions,
        host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference,
        resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations {
    return nodeNextModuleNameResolverWorker(
        NodeResolutionFeatures.NodeNextDefault,
        moduleName,
        containingFile,
        compilerOptions,
        host,
        cache,
        redirectedReference,
        resolutionMode
    );
}

const jsOnlyExtensions = [Extensions.JavaScript];
const tsExtensions = [Extensions.TypeScript, Extensions.JavaScript];
const tsPlusJsonExtensions = [...tsExtensions, Extensions.Json];
const tsconfigExtensions = [Extensions.TSConfig];
function nodeNextModuleNameResolverWorker(features: NodeResolutionFeatures, moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference, resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations {
    const containingDirectory = getDirectoryPath(containingFile);

    // es module file or cjs-like input file, use a variant of the legacy cjs resolver that supports the selected modern features
    const esmMode = resolutionMode === ModuleKind.ESNext ? NodeResolutionFeatures.EsmMode : 0;
    let extensions = compilerOptions.noDtsResolution ? [Extensions.TsOnly, Extensions.JavaScript] : tsExtensions;
    if (compilerOptions.resolveJsonModule) {
        extensions = [...extensions, Extensions.Json];
    }
    return nodeModuleNameResolverWorker(features | esmMode, moduleName, containingDirectory, compilerOptions, host, cache, extensions, redirectedReference);
}

function tryResolveJSModuleWorker(moduleName: string, initialDir: string, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
    return nodeModuleNameResolverWorker(NodeResolutionFeatures.None, moduleName, initialDir, { moduleResolution: ModuleResolutionKind.NodeJs, allowJs: true }, host, /*cache*/ undefined, jsOnlyExtensions, /*redirectedReferences*/ undefined);
}

export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference): ResolvedModuleWithFailedLookupLocations;
/** @internal */ export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference, lookupConfig?: boolean): ResolvedModuleWithFailedLookupLocations; // eslint-disable-line @typescript-eslint/unified-signatures
export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference, lookupConfig?: boolean): ResolvedModuleWithFailedLookupLocations {
    let extensions;
    if (lookupConfig) {
        extensions = tsconfigExtensions;
    }
    else if (compilerOptions.noDtsResolution) {
        extensions = [Extensions.TsOnly];
        if (compilerOptions.allowJs) extensions.push(Extensions.JavaScript);
        if (compilerOptions.resolveJsonModule) extensions.push(Extensions.Json);
    }
    else {
        extensions = compilerOptions.resolveJsonModule ? tsPlusJsonExtensions : tsExtensions;
    }
    return nodeModuleNameResolverWorker(NodeResolutionFeatures.None, moduleName, getDirectoryPath(containingFile), compilerOptions, host, cache, extensions, redirectedReference);
}

function nodeModuleNameResolverWorker(features: NodeResolutionFeatures, moduleName: string, containingDirectory: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache: ModuleResolutionCache | undefined, extensions: Extensions[], redirectedReference: ResolvedProjectReference | undefined): ResolvedModuleWithFailedLookupLocations {
    const traceEnabled = isTraceEnabled(compilerOptions, host);

    const failedLookupLocations: string[] = [];
    const affectingLocations: string[] = [];
    // conditions are only used by the node16/nodenext resolver - there's no priority order in the list,
    //it's essentially a set (priority is determined by object insertion order in the object we look at).
    const conditions = features & NodeResolutionFeatures.EsmMode ? ["node", "import", "types"] : ["node", "require", "types"];
    if (compilerOptions.noDtsResolution) {
        conditions.pop();
    }

    const diagnostics: Diagnostic[] = [];
    const state: ModuleResolutionState = {
        compilerOptions,
        host,
        traceEnabled,
        failedLookupLocations,
        affectingLocations,
        packageJsonInfoCache: cache,
        features,
        conditions,
        requestContainingDirectory: containingDirectory,
        reportDiagnostic: diag => void diagnostics.push(diag),
    };

    if (traceEnabled && getEmitModuleResolutionKind(compilerOptions) >= ModuleResolutionKind.Node16 && getEmitModuleResolutionKind(compilerOptions) <= ModuleResolutionKind.NodeNext) {
        trace(host, Diagnostics.Resolving_in_0_mode_with_conditions_1, features & NodeResolutionFeatures.EsmMode ? "ESM" : "CJS", conditions.map(c => `'${c}'`).join(", "));
    }

    const result = forEach(extensions, ext => tryResolve(ext));
    return createResolvedModuleWithFailedLookupLocations(
        result?.value?.resolved,
        result?.value?.isExternalLibraryImport,
        failedLookupLocations,
        affectingLocations,
        diagnostics,
        state.resultFromCache
    );

    function tryResolve(extensions: Extensions): SearchResult<{ resolved: Resolved, isExternalLibraryImport: boolean }> {
        const loader: ResolutionKindSpecificLoader = (extensions, candidate, onlyRecordFailures, state) => nodeLoadModuleByRelativeName(extensions, candidate, onlyRecordFailures, state, /*considerPackageJson*/ true);
        const isOHModules: boolean = isOhpm(compilerOptions.packageManagerType);
        const resolved = tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loader, state);
        if (resolved) {
            return toSearchResult({ resolved, isExternalLibraryImport: isOHModules ? pathContainsOHModules(resolved.path) :
              pathContainsNodeModules(resolved.path) });
        }

        if (!isExternalModuleNameRelative(moduleName)) {
            let resolved: SearchResult<Resolved> | undefined;
            if (features & NodeResolutionFeatures.Imports && startsWith(moduleName, "#")) {
                resolved = loadModuleFromImports(extensions, moduleName, containingDirectory, state, cache, redirectedReference);
            }
            if (!resolved && features & NodeResolutionFeatures.SelfName) {
                resolved = loadModuleFromSelfNameReference(extensions, moduleName, containingDirectory, state, cache, redirectedReference);
            }
            if (!resolved) {
                if (traceEnabled) {
                    const message = isOHModules ? Diagnostics.Loading_module_0_from_oh_modules_folder_target_file_type_1 : Diagnostics.Loading_module_0_from_node_modules_folder_target_file_type_1;
                    trace(host, message, moduleName, Extensions[extensions]);
                }
                resolved = loadModuleFromNearestNodeModulesDirectory(extensions, moduleName, containingDirectory, state, cache, redirectedReference);
            }
            if (!resolved) return undefined;

            let resolvedValue = resolved.value;
            if (!compilerOptions.preserveSymlinks && resolvedValue && !resolvedValue.originalPath) {
                const path = realPath(resolvedValue.path, host, traceEnabled);
                const pathsAreEqual = arePathsEqual(path, resolvedValue.path, host);
                const originalPath = pathsAreEqual ? undefined : resolvedValue.path;
                // If the path and realpath are differing only in casing prefer path so that we can issue correct errors for casing under forceConsistentCasingInFileNames
                resolvedValue = { ...resolvedValue, path: pathsAreEqual ? resolvedValue.path : path, originalPath };
            }
            // For node_modules or oh_modules lookups, get the real path so that multiple accesses to an `npm link`-ed module do not create duplicate files.
            return { value: resolvedValue && { resolved: resolvedValue, isExternalLibraryImport: true } };
        }
        else {
            const { path: candidate, parts } = normalizePathForCJSResolution(containingDirectory, moduleName);
            const resolved = nodeLoadModuleByRelativeName(extensions, candidate, /*onlyRecordFailures*/ false, state, /*considerPackageJson*/ true);
            // Treat explicit "node_modules" or "oh_modules" import as an external library import.
            return resolved && toSearchResult({ resolved, isExternalLibraryImport: contains(parts, getModuleByPMType(compilerOptions.packageManagerType)) });
        }
    }

}

// If you import from "." inside a containing directory "/foo", the result of `normalizePath`
// would be "/foo", but this loses the information that `foo` is a directory and we intended
// to look inside of it. The Node CommonJS resolution algorithm doesn't call this out
// (https://nodejs.org/api/modules.html#all-together), but it seems that module paths ending
// in `.` are actually normalized to `./` before proceeding with the resolution algorithm.
function normalizePathForCJSResolution(containingDirectory: string, moduleName: string) {
    const combined = combinePaths(containingDirectory, moduleName);
    const parts = getPathComponents(combined);
    const lastPart = lastOrUndefined(parts);
    const path = lastPart === "." || lastPart === ".." ? ensureTrailingDirectorySeparator(normalizePath(combined)) : normalizePath(combined);
    return { path, parts };
}

function realPath(path: string, host: ModuleResolutionHost, traceEnabled: boolean): string {
    if (!host.realpath) {
        return path;
    }

    const real = normalizePath(host.realpath(path));
    if (traceEnabled) {
        trace(host, Diagnostics.Resolving_real_path_for_0_result_1, path, real);
    }
    Debug.assert(host.fileExists(real), `${path} linked to nonexistent file ${real}`);
    return real;
}

function nodeLoadModuleByRelativeName(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState, considerPackageJson: boolean): Resolved | undefined {
    if (state.traceEnabled) {
        trace(state.host, Diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0_target_file_type_1, candidate, Extensions[extensions]);
    }
    if (!hasTrailingDirectorySeparator(candidate)) {
        if (!onlyRecordFailures) {
            const parentOfCandidate = getDirectoryPath(candidate);
            if (!directoryProbablyExists(parentOfCandidate, state.host)) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, parentOfCandidate);
                }
                onlyRecordFailures = true;
            }
        }
        const resolvedFromFile = loadModuleFromFile(extensions, candidate, onlyRecordFailures, state);
        if (resolvedFromFile) {
            const packageDirectory = considerPackageJson ? parseModuleFromPath(resolvedFromFile.path, state.compilerOptions.packageManagerType) : undefined;
            const packageInfo = packageDirectory ? getPackageJsonInfo(packageDirectory, /*onlyRecordFailures*/ false, state) : undefined;
            return withPackageId(packageInfo, resolvedFromFile);
        }
    }
    if (!onlyRecordFailures) {
        const candidateExists = directoryProbablyExists(candidate, state.host);
        if (!candidateExists) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, candidate);
            }
            onlyRecordFailures = true;
        }
    }
    // esm mode relative imports shouldn't do any directory lookups (either inside `package.json`
    // files or implicit `index.js`es). This is a notable depature from cjs norms, where `./foo/pkg`
    // could have been redirected by `./foo/pkg/package.json` to an arbitrary location!
    if (!(state.features & NodeResolutionFeatures.EsmMode)) {
        return loadNodeModuleFromDirectory(extensions, candidate, onlyRecordFailures, state, considerPackageJson);
    }
    return undefined;
}

/** @internal */
export const nodeModulesPathPart = "/node_modules/";

/** @internal */
export function pathContainsNodeModules(path: string): boolean {
    return stringContains(path, nodeModulesPathPart);
}

/**
 * This will be called on the successfully resolved path from `loadModuleFromFile`.
 * (Not needed for `loadModuleFromNodeModules` as that looks up the `package.json` or `oh-package.json5` as part of resolution.)
 *
 * packageDirectory is the directory of the package itself.
 *   For `blah/node_modules/foo/index.d.ts` this is packageDirectory: "foo"
 *   For `/node_modules/foo/bar.d.ts` this is packageDirectory: "foo"
 *   For `/node_modules/@types/foo/bar/index.d.ts` this is packageDirectory: "@types/foo"
 *   For `/node_modules/foo/bar/index.d.ts` this is packageDirectory: "foo"
 */
export function parseModuleFromPath(resolved: string, packageManagerType?: string): string | undefined {
    const modulesPathPart = getModulePathPartByPMType(packageManagerType);
    const path = normalizePath(resolved);
    const idx = path.lastIndexOf(modulesPathPart);
    if (idx === -1) {
        return undefined;
    }

    const indexAfterModules = idx + modulesPathPart.length;
    let indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(path, indexAfterModules);
    if (path.charCodeAt(indexAfterModules) === CharacterCodes.at) {
        indexAfterPackageName = moveToNextDirectorySeparatorIfAvailable(path, indexAfterPackageName);
    }
    return path.slice(0, indexAfterPackageName);
}

function moveToNextDirectorySeparatorIfAvailable(path: string, prevSeparatorIndex: number): number {
    const nextSeparatorIndex = path.indexOf(directorySeparator, prevSeparatorIndex + 1);
    return nextSeparatorIndex === -1 ? prevSeparatorIndex : nextSeparatorIndex;
}

function loadModuleFromFileNoPackageId(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState): Resolved | undefined {
    return noPackageId(loadModuleFromFile(extensions, candidate, onlyRecordFailures, state));
}

/**
 * @param {boolean} onlyRecordFailures - if true then function won't try to actually load files but instead record all attempts as failures. This flag is necessary
 * in cases when we know upfront that all load attempts will fail (because containing folder does not exists) however we still need to record all failed lookup locations.
 */
function loadModuleFromFile(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState): PathAndExtension | undefined {
    if (extensions === Extensions.Json || extensions === Extensions.TSConfig) {
        const extensionLess = tryRemoveExtension(candidate, Extension.Json);
        const extension = extensionLess ? candidate.substring(extensionLess.length) : "";
        return (extensionLess === undefined && extensions === Extensions.Json) ? undefined : tryAddingExtensions(extensionLess || candidate, extensions, extension, onlyRecordFailures, state);
    }

    // esm mode resolutions don't include automatic extension lookup (without additional flags, at least)
    if (!(state.features & NodeResolutionFeatures.EsmMode)) {
        // First, try adding an extension. An import of "foo" could be matched by a file "foo.ts", or "foo.js" by "foo.js.ts"
        const resolvedByAddingExtension = tryAddingExtensions(candidate, extensions, "", onlyRecordFailures, state);
        if (resolvedByAddingExtension) {
            return resolvedByAddingExtension;
        }
    }

    return loadModuleFromFileNoImplicitExtensions(extensions, candidate, onlyRecordFailures, state);
}

function loadModuleFromFileNoImplicitExtensions(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState): PathAndExtension | undefined {
    // If that didn't work, try stripping a ".js" or ".jsx" extension and replacing it with a TypeScript one;
    // e.g. "./foo.js" can be matched by "./foo.ts" or "./foo.d.ts"
    if (hasJSFileExtension(candidate) || (fileExtensionIs(candidate, Extension.Json) && state.compilerOptions.resolveJsonModule)) {
        const extensionless = removeFileExtension(candidate);
        const extension = candidate.substring(extensionless.length);
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.File_name_0_has_a_1_extension_stripping_it, candidate, extension);
        }
        return tryAddingExtensions(extensionless, extensions, extension, onlyRecordFailures, state);
    }
}

function loadJSOrExactTSFileName(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState): PathAndExtension | undefined {
    if ((extensions === Extensions.TypeScript || extensions === Extensions.DtsOnly) && fileExtensionIsOneOf(candidate, supportedTSExtensionsFlat)) {
        const result = tryFile(candidate, onlyRecordFailures, state);
        return result !== undefined ? { path: candidate, ext: tryExtractTSExtension(candidate) as Extension } : undefined;
    }

    return loadModuleFromFileNoImplicitExtensions(extensions, candidate, onlyRecordFailures, state);
}

/** Try to return an existing file that adds one of the `extensions` to `candidate`. */
function tryAddingExtensions(candidate: string, extensions: Extensions, originalExtension: string, onlyRecordFailures: boolean, state: ModuleResolutionState): PathAndExtension | undefined {
    if (!onlyRecordFailures) {
        // check if containing folder exists - if it doesn't then just record failures for all supported extensions without disk probing
        const directory = getDirectoryPath(candidate);
        if (directory) {
            onlyRecordFailures = !directoryProbablyExists(directory, state.host);
        }
    }

    switch (extensions) {
        case Extensions.DtsOnly:
            switch (originalExtension) {
                case Extension.Mjs:
                case Extension.Mts:
                case Extension.Dmts:
                    return tryExtension(Extension.Dmts);
                case Extension.Cjs:
                case Extension.Cts:
                case Extension.Dcts:
                    return tryExtension(Extension.Dcts);
                case Extension.Json:
                    candidate += Extension.Json;
                    return tryExtension(Extension.Dts);
                default: return state.compilerOptions.ets ? tryExtension(Extension.Dets) || tryExtension(Extension.Dts) : tryExtension(Extension.Dts);
            }
        case Extensions.TypeScript:
        case Extensions.TsOnly:
            const useDts = extensions === Extensions.TypeScript;
            switch (originalExtension) {
                case Extension.Mjs:
                case Extension.Mts:
                case Extension.Dmts:
                    return tryExtension(Extension.Mts) || (useDts ? tryExtension(Extension.Dmts) : undefined);
                case Extension.Cjs:
                case Extension.Cts:
                case Extension.Dcts:
                    return tryExtension(Extension.Cts) || (useDts ? tryExtension(Extension.Dcts) : undefined);
                case Extension.Json:
                    candidate += Extension.Json;
                    return useDts ? tryExtension(Extension.Dts) : undefined;
                default:
                    if (state.compilerOptions.ets) {
                        return tryExtension(Extension.Ets) || tryExtension(Extension.Ts) || tryExtension(Extension.Tsx) || (useDts ? tryExtension(Extension.Dets) || tryExtension(Extension.Dts) : undefined);
                    }
                    else {
                        return tryExtension(Extension.Ts) || tryExtension(Extension.Tsx) || (useDts ? tryExtension(Extension.Dts) || tryExtension(Extension.Ets) || tryExtension(Extension.Dets) : undefined);
                    }
            }
        case Extensions.JavaScript:
            switch (originalExtension) {
                case Extension.Mjs:
                case Extension.Mts:
                case Extension.Dmts:
                    return tryExtension(Extension.Mjs);
                case Extension.Cjs:
                case Extension.Cts:
                case Extension.Dcts:
                    return tryExtension(Extension.Cjs);
                case Extension.Json:
                    return tryExtension(Extension.Json);
                default:
                    return tryExtension(Extension.Js) || tryExtension(Extension.Jsx);
            }
        case Extensions.TSConfig:
        case Extensions.Json:
            return tryExtension(Extension.Json);
    }

    function tryExtension(ext: Extension): PathAndExtension | undefined {
        const path = tryFile(candidate + ext, onlyRecordFailures, state);
        return path === undefined ? undefined : { path, ext };
    }
}

/** Return the file if it exists. */
function tryFile(fileName: string, onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
    if (!state.compilerOptions.moduleSuffixes?.length) {
        return tryFileLookup(fileName, onlyRecordFailures, state);
    }

    const ext = tryGetExtensionFromPath(fileName) ?? "";
    const fileNameNoExtension = ext ? removeExtension(fileName, ext) : fileName;
    return forEach(state.compilerOptions.moduleSuffixes, suffix => tryFileLookup(fileNameNoExtension + suffix + ext, onlyRecordFailures, state));
}

function tryFileLookup(fileName: string, onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
    if (!onlyRecordFailures) {
        if (state.host.fileExists(fileName)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_exist_use_it_as_a_name_resolution_result, fileName);
            }
            return fileName;
        }
        else {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_does_not_exist, fileName);
            }
        }
    }
    state.failedLookupLocations.push(fileName);
    return undefined;
}

function loadNodeModuleFromDirectory(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState, considerPackageJson = true) {
    const packageInfo = considerPackageJson ? getPackageJsonInfo(candidate, onlyRecordFailures, state) : undefined;
    const packageJsonContent = packageInfo && packageInfo.contents.packageJsonContent;
    const versionPaths = packageInfo && packageInfo.contents.versionPaths;
    return withPackageId(packageInfo, loadNodeModuleFromDirectoryWorker(extensions, candidate, onlyRecordFailures, state, packageJsonContent, versionPaths));
}

/** @internal */
export function getEntrypointsFromPackageJsonInfo(
    packageJsonInfo: PackageJsonInfo,
    options: CompilerOptions,
    host: ModuleResolutionHost,
    cache: ModuleResolutionCache | undefined,
    resolveJs?: boolean,
): string[] | false {
    if (!resolveJs && packageJsonInfo.contents.resolvedEntrypoints !== undefined) {
        // Cached value excludes resolutions to JS files - those could be
        // cached separately, but they're used rarely.
        return packageJsonInfo.contents.resolvedEntrypoints;
    }

    let entrypoints: string[] | undefined;
    const extensions = resolveJs ? Extensions.JavaScript : Extensions.TypeScript;
    const features = getDefaultNodeResolutionFeatures(options);
    const requireState = getTemporaryModuleResolutionState(cache?.getPackageJsonInfoCache(), host, options);
    requireState.conditions = ["node", "require", "types"];
    requireState.requestContainingDirectory = packageJsonInfo.packageDirectory;
    const requireResolution = loadNodeModuleFromDirectoryWorker(
        extensions,
        packageJsonInfo.packageDirectory,
        /*onlyRecordFailures*/ false,
        requireState,
        packageJsonInfo.contents.packageJsonContent,
        packageJsonInfo.contents.versionPaths);
    entrypoints = append(entrypoints, requireResolution?.path);

    if (features & NodeResolutionFeatures.Exports && packageJsonInfo.contents.packageJsonContent.exports) {
        for (const conditions of [["node", "import", "types"], ["node", "require", "types"]]) {
            const exportState = { ...requireState, failedLookupLocations: [], conditions };
            const exportResolutions = loadEntrypointsFromExportMap(
                packageJsonInfo,
                packageJsonInfo.contents.packageJsonContent.exports,
                exportState,
                extensions);
            if (exportResolutions) {
                for (const resolution of exportResolutions) {
                    entrypoints = appendIfUnique(entrypoints, resolution.path);
                }
            }
        }
    }

    return packageJsonInfo.contents.resolvedEntrypoints = entrypoints || false;
}

function loadEntrypointsFromExportMap(
    scope: PackageJsonInfo,
    exports: object,
    state: ModuleResolutionState,
    extensions: Extensions,
): PathAndExtension[] | undefined {
    let entrypoints: PathAndExtension[] | undefined;
    if (isArray(exports)) {
        for (const target of exports) {
            loadEntrypointsFromTargetExports(target);
        }
    }
    // eslint-disable-next-line no-null/no-null
    else if (typeof exports === "object" && exports !== null && allKeysStartWithDot(exports as MapLike<unknown>)) {
        for (const key in exports) {
            loadEntrypointsFromTargetExports((exports as MapLike<unknown>)[key]);
        }
    }
    else {
        loadEntrypointsFromTargetExports(exports);
    }
    return entrypoints;

    function loadEntrypointsFromTargetExports(target: unknown): boolean | undefined {
        if (typeof target === "string" && startsWith(target, "./") && target.indexOf("*") === -1) {
            const partsAfterFirst = getPathComponents(target).slice(2);
            if (partsAfterFirst.indexOf("..") >= 0 || partsAfterFirst.indexOf(".") >= 0 || partsAfterFirst.indexOf("node_modules") >= 0 || partsAfterFirst.indexOf("oh_modules") >= 0) {
                return false;
            }
            const resolvedTarget = combinePaths(scope.packageDirectory, target);
            const finalPath = getNormalizedAbsolutePath(resolvedTarget, state.host.getCurrentDirectory?.());
            const result = loadJSOrExactTSFileName(extensions, finalPath, /*recordOnlyFailures*/ false, state);
            if (result) {
                entrypoints = appendIfUnique(entrypoints, result, (a, b) => a.path === b.path);
                return true;
            }
        }
        else if (Array.isArray(target)) {
            for (const t of target) {
                const success = loadEntrypointsFromTargetExports(t);
                if (success) {
                    return true;
                }
            }
        }
        // eslint-disable-next-line no-null/no-null
        else if (typeof target === "object" && target !== null) {
            return forEach(getOwnKeys(target as MapLike<unknown>), key => {
                if (key === "default" || contains(state.conditions, key) || isApplicableVersionedTypesKey(state.conditions, key)) {
                    loadEntrypointsFromTargetExports((target as MapLike<unknown>)[key]);
                    return true;
                }
            });
        }
    }
}

/** @internal */
export function getTemporaryModuleResolutionState(packageJsonInfoCache: PackageJsonInfoCache | undefined, host: ModuleResolutionHost, options: CompilerOptions): ModuleResolutionState {
    return {
        host,
        compilerOptions: options,
        traceEnabled: isTraceEnabled(options, host),
        failedLookupLocations: noopPush,
        affectingLocations: noopPush,
        packageJsonInfoCache,
        features: NodeResolutionFeatures.None,
        conditions: emptyArray,
        requestContainingDirectory: undefined,
        reportDiagnostic: noop
    };
}

/** @internal */
export interface PackageJsonInfo {
    packageDirectory: string;
    contents: PackageJsonInfoContents;
}
/** @internal */
export interface PackageJsonInfoContents {
    packageJsonContent: PackageJsonPathFields;
    versionPaths: VersionPaths | undefined;
    /** false: resolved to nothing. undefined: not yet resolved */
    resolvedEntrypoints: string[] | false | undefined;
}

/**
 * A function for locating the package.json scope for a given path
 * 
 * @internal
 */
 export function getPackageScopeForPath(fileName: string, state: ModuleResolutionState): PackageJsonInfo | undefined {
    const parts = getPathComponents(fileName);
    parts.pop();
    while (parts.length > 0) {
        const pkg = getPackageJsonInfo(getPathFromPathComponents(parts), /*onlyRecordFailures*/ false, state);
        if (pkg) {
            return pkg;
        }
        parts.pop();
    }
    return undefined;
}

/** @internal */
export function getPackageJsonInfo(packageDirectory: string, onlyRecordFailures: boolean, state: ModuleResolutionState): PackageJsonInfo | undefined {
    const { host, traceEnabled } = state;
    const packageJsonPath = combinePaths(packageDirectory, getPackageJsonByPMType(state.compilerOptions.packageManagerType));
    if (onlyRecordFailures) {
        state.failedLookupLocations.push(packageJsonPath);
        return undefined;
    }

    const existing = state.packageJsonInfoCache?.getPackageJsonInfo(packageJsonPath);
    if (existing !== undefined) {
        if (typeof existing !== "boolean") {
            if (traceEnabled) trace(host, Diagnostics.File_0_exists_according_to_earlier_cached_lookups, packageJsonPath);
            state.affectingLocations.push(packageJsonPath);
            return existing.packageDirectory === packageDirectory ?
                existing :
                { packageDirectory, contents: existing.contents };
        }
        else {
            if (existing && traceEnabled) trace(host, Diagnostics.File_0_does_not_exist_according_to_earlier_cached_lookups, packageJsonPath);
            state.failedLookupLocations.push(packageJsonPath);
            return undefined;
        }
    }
    const directoryExists = directoryProbablyExists(packageDirectory, host);
    if (directoryExists && host.fileExists(packageJsonPath)) {
        const isOHModules: boolean = isOhpm(state.compilerOptions.packageManagerType);
        const packageJsonContent = isOHModules ? require("json5").parse(host.readFile!(packageJsonPath)!) : readJson(packageJsonPath, host) as PackageJson;
        if (traceEnabled) {
            const message = isOHModules ? Diagnostics.Found_oh_package_json5_at_0 : Diagnostics.Found_package_json_at_0;
            trace(host, message, packageJsonPath);
        }
        const versionPaths = readPackageJsonTypesVersionPaths(packageJsonContent, state);
        const result: PackageJsonInfo = { packageDirectory, contents: { packageJsonContent, versionPaths, resolvedEntrypoints: undefined } };
        state.packageJsonInfoCache?.setPackageJsonInfo(packageJsonPath, result);
        state.affectingLocations.push(packageJsonPath);
        return result;
    }
    else {
        if (directoryExists && traceEnabled) {
            trace(host, Diagnostics.File_0_does_not_exist, packageJsonPath);
        }
        state.packageJsonInfoCache?.setPackageJsonInfo(packageJsonPath, directoryExists);
        // record package json as one of failed lookup locations - in the future if this file will appear it will invalidate resolution results
        state.failedLookupLocations.push(packageJsonPath);
    }
}

function loadNodeModuleFromDirectoryWorker(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState, jsonContent: PackageJsonPathFields | undefined, versionPaths: VersionPaths | undefined): PathAndExtension | undefined {
    let packageFile: string | undefined;
    if (jsonContent) {
        switch (extensions) {
            case Extensions.JavaScript:
            case Extensions.Json:
            case Extensions.TsOnly:
                packageFile = readPackageJsonMainField(jsonContent, candidate, state);
                break;
            case Extensions.TypeScript:
                // When resolving typescript modules, try resolving using main field as well
                packageFile = readPackageJsonTypesFields(jsonContent, candidate, state) || readPackageJsonMainField(jsonContent, candidate, state);
                break;
            case Extensions.DtsOnly:
                packageFile = readPackageJsonTypesFields(jsonContent, candidate, state);
                break;
            case Extensions.TSConfig:
                packageFile = readPackageJsonTSConfigField(jsonContent, candidate, state);
                break;
            default:
                return Debug.assertNever(extensions);
        }
    }

    const loader: ResolutionKindSpecificLoader = (extensions, candidate, onlyRecordFailures, state) => {
        const fromFile = tryFile(candidate, onlyRecordFailures, state);
        if (fromFile) {
            const resolved = resolvedIfExtensionMatches(extensions, fromFile);
            if (resolved) {
                return noPackageId(resolved);
            }
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_has_an_unsupported_extension_so_skipping_it, fromFile);
            }
        }

        // Even if extensions is DtsOnly, we can still look up a .ts file as a result of package.json "types"
        const nextExtensions = extensions === Extensions.DtsOnly ? Extensions.TypeScript : extensions;
        // Don't do package.json lookup recursively, because Node.js' package lookup doesn't.

        // Disable `EsmMode` for the resolution of the package path for cjs-mode packages (so the `main` field can omit extensions)
        // (technically it only emits a deprecation warning in esm packages right now, but that's probably
        // enough to mean we don't need to support it)
        const features = state.features;
        if (jsonContent?.type !== "module") {
            state.features &= ~NodeResolutionFeatures.EsmMode;
        }
        const result = nodeLoadModuleByRelativeName(nextExtensions, candidate, onlyRecordFailures, state, /*considerPackageJson*/ false);
        state.features = features;
        return result;
    };

    const onlyRecordFailuresForPackageFile = packageFile ? !directoryProbablyExists(getDirectoryPath(packageFile), state.host) : undefined;
    const onlyRecordFailuresForIndex = onlyRecordFailures || !directoryProbablyExists(candidate, state.host);
    const indexPath = combinePaths(candidate, extensions === Extensions.TSConfig ? "tsconfig" : "index");

    if (versionPaths && (!packageFile || containsPath(candidate, packageFile))) {
        const moduleName = getRelativePathFromDirectory(candidate, packageFile || indexPath, /*ignoreCase*/ false);
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2, versionPaths.version, version, moduleName);
        }
        const result = tryLoadModuleUsingPaths(extensions, moduleName, candidate, versionPaths.paths, /*pathPatterns*/ undefined, loader, onlyRecordFailuresForPackageFile || onlyRecordFailuresForIndex, state);
        if (result) {
            return removeIgnoredPackageId(result.value);
        }
    }

    // It won't have a `packageId` set, because we disabled `considerPackageJson`.
    const packageFileResult = packageFile && removeIgnoredPackageId(loader(extensions, packageFile, onlyRecordFailuresForPackageFile!, state));
    if (packageFileResult) return packageFileResult;

    // esm mode resolutions don't do package `index` lookups
    if (!(state.features & NodeResolutionFeatures.EsmMode)) {
        return loadModuleFromFile(extensions, indexPath, onlyRecordFailuresForIndex, state);
    }
}

/** Resolve from an arbitrarily specified file. Return `undefined` if it has an unsupported extension. */
function resolvedIfExtensionMatches(extensions: Extensions, path: string): PathAndExtension | undefined {
    const ext = tryGetExtensionFromPath(path);
    return ext !== undefined && extensionIsOk(extensions, ext) ? { path, ext } : undefined;
}

/** True if `extension` is one of the supported `extensions`. */
function extensionIsOk(extensions: Extensions, extension: Extension): boolean {
    switch (extensions) {
        case Extensions.JavaScript:
            return extension === Extension.Js || extension === Extension.Jsx || extension === Extension.Mjs || extension === Extension.Cjs;
        case Extensions.TSConfig:
        case Extensions.Json:
            return extension === Extension.Json;
        case Extensions.TypeScript:
            return extension === Extension.Ts || extension === Extension.Tsx || extension === Extension.Mts || extension === Extension.Cts || extension === Extension.Dts || extension === Extension.Dmts || extension === Extension.Dcts || extension === Extension.Ets || extension === Extension.Dets;
        case Extensions.TsOnly:
            return extension === Extension.Ts || extension === Extension.Tsx || extension === Extension.Mts || extension === Extension.Cts || extension === Extension.Ets;
        case Extensions.DtsOnly:
            return extension === Extension.Dts || extension === Extension.Dmts || extension === Extension.Dcts || extension === Extension.Dets;
    }
}

/** @internal */
export function parsePackageName(moduleName: string): { packageName: string, rest: string } {
    let idx = moduleName.indexOf(directorySeparator);
    if (moduleName[0] === "@") {
        idx = moduleName.indexOf(directorySeparator, idx + 1);
    }
    return idx === -1 ? { packageName: moduleName, rest: "" } : { packageName: moduleName.slice(0, idx), rest: moduleName.slice(idx + 1) };
}

/** @internal */
export function allKeysStartWithDot(obj: MapLike<unknown>) {
    return every(getOwnKeys(obj), k => startsWith(k, "."));
}

function noKeyStartsWithDot(obj: MapLike<unknown>) {
    return !some(getOwnKeys(obj), k => startsWith(k, "."));
}

function loadModuleFromSelfNameReference(extensions: Extensions, moduleName: string, directory: string, state: ModuleResolutionState, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): SearchResult<Resolved> {
    const directoryPath = getNormalizedAbsolutePath(combinePaths(directory, "dummy"), state.host.getCurrentDirectory?.());
    const scope = getPackageScopeForPath(directoryPath, state);
    if (!scope || !scope.contents.packageJsonContent.exports) {
        return undefined;
    }
    if (typeof scope.contents.packageJsonContent.name !== "string") {
        return undefined;
    }
    const parts = getPathComponents(moduleName); // unrooted paths should have `""` as their 0th entry
    const nameParts = getPathComponents(scope.contents.packageJsonContent.name);
    if (!every(nameParts, (p, i) => parts[i] === p)) {
        return undefined;
    }
    const trailingParts = parts.slice(nameParts.length);
    return loadModuleFromExports(scope, extensions, !length(trailingParts) ? "." : `.${directorySeparator}${trailingParts.join(directorySeparator)}`, state, cache, redirectedReference);
}

function loadModuleFromExports(scope: PackageJsonInfo, extensions: Extensions, subpath: string, state: ModuleResolutionState, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): SearchResult<Resolved> {
    if (!scope.contents.packageJsonContent.exports) {
        return undefined;
    }

    if (subpath === ".") {
        let mainExport;
        if (typeof scope.contents.packageJsonContent.exports === "string" || Array.isArray(scope.contents.packageJsonContent.exports) || (typeof scope.contents.packageJsonContent.exports === "object" && noKeyStartsWithDot(scope.contents.packageJsonContent.exports as MapLike<unknown>))) {
            mainExport = scope.contents.packageJsonContent.exports;
        }
        else if (hasProperty(scope.contents.packageJsonContent.exports as MapLike<unknown>, ".")) {
            mainExport = (scope.contents.packageJsonContent.exports as MapLike<unknown>)["."];
        }
        if (mainExport) {
            const loadModuleFromTargetImportOrExport = getLoadModuleFromTargetImportOrExport(extensions, state, cache, redirectedReference, subpath, scope, /*isImports*/ false);
            return loadModuleFromTargetImportOrExport(mainExport, "", /*pattern*/ false, ".");
        }
    }
    else if (allKeysStartWithDot(scope.contents.packageJsonContent.exports as MapLike<unknown>)) {
        if (typeof scope.contents.packageJsonContent.exports !== "object") {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Export_specifier_0_does_not_exist_in_package_json_scope_at_path_1, subpath, scope.packageDirectory);
            }
            return toSearchResult(/*value*/ undefined);
        }
        const result = loadModuleFromImportsOrExports(extensions, state, cache, redirectedReference, subpath, scope.contents.packageJsonContent.exports, scope, /*isImports*/ false);
        if (result) {
            return result;
        }
    }

    if (state.traceEnabled) {
        trace(state.host, Diagnostics.Export_specifier_0_does_not_exist_in_package_json_scope_at_path_1, subpath, scope.packageDirectory);
    }
    return toSearchResult(/*value*/ undefined);
}

function loadModuleFromImports(extensions: Extensions, moduleName: string, directory: string, state: ModuleResolutionState, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): SearchResult<Resolved> {
    if (moduleName === "#" || startsWith(moduleName, "#/")) {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Invalid_import_specifier_0_has_no_possible_resolutions, moduleName);
        }
        return toSearchResult(/*value*/ undefined);
    }
    const directoryPath = getNormalizedAbsolutePath(combinePaths(directory, "dummy"), state.host.getCurrentDirectory?.());
    const scope = getPackageScopeForPath(directoryPath, state);
    if (!scope) {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Directory_0_has_no_containing_package_json_scope_Imports_will_not_resolve, directoryPath);
        }
        return toSearchResult(/*value*/ undefined);
    }
    if (!scope.contents.packageJsonContent.imports) {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.package_json_scope_0_has_no_imports_defined, scope.packageDirectory);
        }
        return toSearchResult(/*value*/ undefined);
    }

    const result = loadModuleFromImportsOrExports(extensions, state, cache, redirectedReference, moduleName, scope.contents.packageJsonContent.imports, scope, /*isImports*/ true);
    if (result) {
        return result;
    }

    if (state.traceEnabled) {
        trace(state.host, Diagnostics.Import_specifier_0_does_not_exist_in_package_json_scope_at_path_1, moduleName, scope.packageDirectory);
    }
    return toSearchResult(/*value*/ undefined);
}

/**
 * @internal
 * From https://github.com/nodejs/node/blob/8f39f51cbbd3b2de14b9ee896e26421cc5b20121/lib/internal/modules/esm/resolve.js#L722 -
 * "longest" has some nuance as to what "longest" means in the presence of pattern trailers
 */
export function comparePatternKeys(a: string, b: string) {
    const aPatternIndex = a.indexOf("*");
    const bPatternIndex = b.indexOf("*");
    const baseLenA = aPatternIndex === -1 ? a.length : aPatternIndex + 1;
    const baseLenB = bPatternIndex === -1 ? b.length : bPatternIndex + 1;
    if (baseLenA > baseLenB) return -1;
    if (baseLenB > baseLenA) return 1;
    if (aPatternIndex === -1) return 1;
    if (bPatternIndex === -1) return -1;
    if (a.length > b.length) return -1;
    if (b.length > a.length) return 1;
    return 0;
}

function loadModuleFromImportsOrExports(extensions: Extensions, state: ModuleResolutionState, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined, moduleName: string, lookupTable: object, scope: PackageJsonInfo, isImports: boolean): SearchResult<Resolved> | undefined {
    const loadModuleFromTargetImportOrExport = getLoadModuleFromTargetImportOrExport(extensions, state, cache, redirectedReference, moduleName, scope, isImports);

    if (!endsWith(moduleName, directorySeparator) && moduleName.indexOf("*") === -1 && hasProperty(lookupTable, moduleName)) {
        const target = (lookupTable as {[idx: string]: unknown})[moduleName];
        return loadModuleFromTargetImportOrExport(target, /*subpath*/ "", /*pattern*/ false, moduleName);
    }
    const expandingKeys = sort(filter(getOwnKeys(lookupTable as MapLike<unknown>), k => k.indexOf("*") !== -1 || endsWith(k, "/")), comparePatternKeys);
    for (const potentialTarget of expandingKeys) {
        if (state.features & NodeResolutionFeatures.ExportsPatternTrailers && matchesPatternWithTrailer(potentialTarget, moduleName)) {
            const target = (lookupTable as {[idx: string]: unknown})[potentialTarget];
            const starPos = potentialTarget.indexOf("*");
            const subpath = moduleName.substring(potentialTarget.substring(0, starPos).length, moduleName.length - (potentialTarget.length - 1 - starPos));
            return loadModuleFromTargetImportOrExport(target, subpath, /*pattern*/ true, potentialTarget);
        }
        else if (endsWith(potentialTarget, "*") && startsWith(moduleName, potentialTarget.substring(0, potentialTarget.length - 1))) {
            const target = (lookupTable as {[idx: string]: unknown})[potentialTarget];
            const subpath = moduleName.substring(potentialTarget.length - 1);
            return loadModuleFromTargetImportOrExport(target, subpath, /*pattern*/ true, potentialTarget);
        }
        else if (startsWith(moduleName, potentialTarget)) {
            const target = (lookupTable as {[idx: string]: unknown})[potentialTarget];
            const subpath = moduleName.substring(potentialTarget.length);
            return loadModuleFromTargetImportOrExport(target, subpath, /*pattern*/ false, potentialTarget);
        }
    }

    function matchesPatternWithTrailer(target: string, name: string) {
        if (endsWith(target, "*")) return false; // handled by next case in loop
        const starPos = target.indexOf("*");
        if (starPos === -1) return false; // handled by last case in loop
        return startsWith(name, target.substring(0, starPos)) && endsWith(name, target.substring(starPos + 1));
    }
}

/**
 * Gets the self-recursive function specialized to retrieving the targeted import/export element for the given resolution configuration
 */
function getLoadModuleFromTargetImportOrExport(extensions: Extensions, state: ModuleResolutionState, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined, moduleName: string, scope: PackageJsonInfo, isImports: boolean) {
    return loadModuleFromTargetImportOrExport;
    function loadModuleFromTargetImportOrExport(target: unknown, subpath: string, pattern: boolean, key: string): SearchResult<Resolved> | undefined {
        if (typeof target === "string") {
            if (!pattern && subpath.length > 0 && !endsWith(target, "/")) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                }
                return toSearchResult(/*value*/ undefined);
            }
            if (!startsWith(target, "./")) {
                if (isImports && !startsWith(target, "../") && !startsWith(target, "/") && !isRootedDiskPath(target)) {
                    const combinedLookup = pattern ? target.replace(/\*/g, subpath) : target + subpath;
                    traceIfEnabled(state, Diagnostics.Using_0_subpath_1_with_target_2, "imports", key, combinedLookup);
                    traceIfEnabled(state, Diagnostics.Resolving_module_0_from_1, combinedLookup, scope.packageDirectory + "/");
                    const result = nodeModuleNameResolverWorker(state.features, combinedLookup, scope.packageDirectory + "/", state.compilerOptions, state.host, cache, [extensions], redirectedReference);
                    return toSearchResult(result.resolvedModule ? { path: result.resolvedModule.resolvedFileName, extension: result.resolvedModule.extension, packageId: result.resolvedModule.packageId, originalPath: result.resolvedModule.originalPath } : undefined);
                }
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                }
                return toSearchResult(/*value*/ undefined);
            }
            const parts = pathIsRelative(target) ? getPathComponents(target).slice(1) : getPathComponents(target);
            const partsAfterFirst = parts.slice(1);
            if (partsAfterFirst.indexOf("..") >= 0 || partsAfterFirst.indexOf(".") >= 0 || partsAfterFirst.indexOf("node_modules") >= 0 || partsAfterFirst.indexOf("oh_modules") >= 0) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                }
                return toSearchResult(/*value*/ undefined);
            }
            const resolvedTarget = combinePaths(scope.packageDirectory, target);
            // TODO: Assert that `resolvedTarget` is actually within the package directory? That's what the spec says.... but I'm not sure we need
            // to be in the business of validating everyone's import and export map correctness.
            const subpathParts = getPathComponents(subpath);
            if (subpathParts.indexOf("..") >= 0 || subpathParts.indexOf(".") >= 0 || subpathParts.indexOf("node_modules") >= 0 || subpathParts.indexOf("oh_modules") >= 0) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                }
                return toSearchResult(/*value*/ undefined);
            }

            if (state.traceEnabled) {
                trace(state.host,
                    Diagnostics.Using_0_subpath_1_with_target_2,
                    isImports ? "imports" : "exports",
                    key,
                    pattern ? target.replace(/\*/g, subpath) : target + subpath);
            }
            const finalPath = toAbsolutePath(pattern ? resolvedTarget.replace(/\*/g, subpath) : resolvedTarget + subpath);
            const inputLink = tryLoadInputFileForPath(finalPath, subpath, combinePaths(scope.packageDirectory, "package.json"), isImports);
            if (inputLink) return inputLink;
            return toSearchResult(withPackageId(scope, loadJSOrExactTSFileName(extensions, finalPath, /*onlyRecordFailures*/ false, state)));
        }
        else if (typeof target === "object" && target !== null) { // eslint-disable-line no-null/no-null
            if (!Array.isArray(target)) {
                for (const condition of getOwnKeys(target as MapLike<unknown>)) {
                    if (condition === "default" || state.conditions.indexOf(condition) >= 0 || isApplicableVersionedTypesKey(state.conditions, condition)) {
                        traceIfEnabled(state, Diagnostics.Matched_0_condition_1, isImports ? "imports" : "exports", condition);
                        const subTarget = (target as MapLike<unknown>)[condition];
                        const result = loadModuleFromTargetImportOrExport(subTarget, subpath, pattern, key);
                        if (result) {
                            return result;
                        }
                    }
                    else {
                        traceIfEnabled(state, Diagnostics.Saw_non_matching_condition_0, condition);
                    }
                }
                return undefined;
            }
            else {
                if (!length(target)) {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
                    }
                    return toSearchResult(/*value*/ undefined);
                }
                for (const elem of target) {
                    const result = loadModuleFromTargetImportOrExport(elem, subpath, pattern, key);
                    if (result) {
                        return result;
                    }
                }
            }
        }
        else if (target === null) { // eslint-disable-line no-null/no-null
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.package_json_scope_0_explicitly_maps_specifier_1_to_null, scope.packageDirectory, moduleName);
            }
            return toSearchResult(/*value*/ undefined);
        }
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.package_json_scope_0_has_invalid_type_for_target_of_specifier_1, scope.packageDirectory, moduleName);
        }
        return toSearchResult(/*value*/ undefined);

        function toAbsolutePath(path: string): string;
        function toAbsolutePath(path: string | undefined): string | undefined;
        function toAbsolutePath(path: string | undefined): string | undefined {
            if (path === undefined) return path;
            return getNormalizedAbsolutePath(path, state.host.getCurrentDirectory?.());
        }

        function combineDirectoryPath(root: string, dir: string) {
            return ensureTrailingDirectorySeparator(combinePaths(root, dir));
        }

        function useCaseSensitiveFileNames() {
            return !state.host.useCaseSensitiveFileNames ? true :
                typeof state.host.useCaseSensitiveFileNames === "boolean" ? state.host.useCaseSensitiveFileNames :
                state.host.useCaseSensitiveFileNames();
        }

        function tryLoadInputFileForPath(finalPath: string, entry: string, packagePath: string, isImports: boolean) {
            // Replace any references to outputs for files in the program with the input files to support package self-names used with outDir
            // PROBLEM: We don't know how to calculate the output paths yet, because the "common source directory" we use as the base of the file structure
            // we reproduce into the output directory is based on the set of input files, which we're still in the process of traversing and resolving!
            // _Given that_, we have to guess what the base of the output directory is (obviously the user wrote the export map, so has some idea what it is!).
            // We are going to probe _so many_ possible paths. We limit where we'll do this to try to reduce the possibilities of false positive lookups.
            if ((extensions === Extensions.TypeScript || extensions === Extensions.JavaScript || extensions === Extensions.Json)
                && (state.compilerOptions.declarationDir || state.compilerOptions.outDir)
                && (finalPath.indexOf("/node_modules/") === -1 && finalPath.indexOf("/oh_modules/") === -1)
                && (state.compilerOptions.configFile ? containsPath(scope.packageDirectory, toAbsolutePath(state.compilerOptions.configFile.fileName), !useCaseSensitiveFileNames()) : true)
            ) {
                // So that all means we'll only try these guesses for files outside `node_modules` in a directory where the `package.json` and `tsconfig.json` are siblings.
                // Even with all that, we still don't know if the root of the output file structure will be (relative to the package file)
                // `.`, `./src` or any other deeper directory structure. (If project references are used, it's definitely `.` by fiat, so that should be pretty common.)

                const getCanonicalFileName = hostGetCanonicalFileName({ useCaseSensitiveFileNames });
                const commonSourceDirGuesses: string[] = [];
                // A `rootDir` compiler option strongly indicates the root location
                // A `composite` project is using project references and has it's common src dir set to `.`, so it shouldn't need to check any other locations
                if (state.compilerOptions.rootDir || (state.compilerOptions.composite && state.compilerOptions.configFilePath)) {
                    const commonDir = toAbsolutePath(getCommonSourceDirectory(state.compilerOptions, () => [], state.host.getCurrentDirectory?.() || "", getCanonicalFileName));
                    commonSourceDirGuesses.push(commonDir);
                }
                else if (state.requestContainingDirectory) {
                    // However without either of those set we're in the dark. Let's say you have
                    //
                    // ./tools/index.ts
                    // ./src/index.ts
                    // ./dist/index.js
                    // ./package.json <-- references ./dist/index.js
                    // ./tsconfig.json <-- loads ./src/index.ts
                    //
                    // How do we know `./src` is the common src dir, and not `./tools`, given only the `./dist` out dir and `./dist/index.js` filename?
                    // Answer: We... don't. We know we're looking for an `index.ts` input file, but we have _no clue_ which subfolder it's supposed to be loaded from
                    // without more context.
                    // But we do have more context! Just a tiny bit more! We're resolving an import _for some other input file_! And that input file, too
                    // must be inside the common source directory! So we propagate that tidbit of info all the way to here via state.requestContainingDirectory

                    const requestingFile = toAbsolutePath(combinePaths(state.requestContainingDirectory, "index.ts"));
                    // And we can try every folder above the common folder for the request folder and the config/package base directory
                    // This technically can be wrong - we may load ./src/index.ts when ./src/sub/index.ts was right because we don't
                    // know if only `./src/sub` files were loaded by the program; but this has the best chance to be right of just about anything
                    // else we have. And, given that we're about to load `./src/index.ts` because we choose it as likely correct, there will then
                    // be a file outside of `./src/sub` in the program (the file we resolved to), making us de-facto right. So this fallback lookup
                    // logic may influence what files are pulled in by self-names, which in turn influences the output path shape, but it's all
                    // internally consistent so the paths should be stable so long as we prefer the "most general" (meaning: top-most-level directory) possible results first.
                    const commonDir = toAbsolutePath(getCommonSourceDirectory(state.compilerOptions, () => [requestingFile, toAbsolutePath(packagePath)], state.host.getCurrentDirectory?.() || "", getCanonicalFileName));
                    commonSourceDirGuesses.push(commonDir);

                    let fragment = ensureTrailingDirectorySeparator(commonDir);
                    while (fragment && fragment.length > 1) {
                        const parts = getPathComponents(fragment);
                        parts.pop(); // remove a directory
                        const commonDir = getPathFromPathComponents(parts);
                        commonSourceDirGuesses.unshift(commonDir);
                        fragment = ensureTrailingDirectorySeparator(commonDir);
                    }
                }
                if (commonSourceDirGuesses.length > 1) {
                    state.reportDiagnostic(createCompilerDiagnostic(
                        isImports
                            ? Diagnostics.The_project_root_is_ambiguous_but_is_required_to_resolve_import_map_entry_0_in_file_1_Supply_the_rootDir_compiler_option_to_disambiguate
                            : Diagnostics.The_project_root_is_ambiguous_but_is_required_to_resolve_export_map_entry_0_in_file_1_Supply_the_rootDir_compiler_option_to_disambiguate,
                        entry === "" ? "." : entry, // replace empty string with `.` - the reverse of the operation done when entries are built - so main entrypoint errors don't look weird
                        packagePath
                    ));
                }
                for (const commonSourceDirGuess of commonSourceDirGuesses) {
                    const candidateDirectories = getOutputDirectoriesForBaseDirectory(commonSourceDirGuess);
                    for (const candidateDir of candidateDirectories) {
                        if (containsPath(candidateDir, finalPath, !useCaseSensitiveFileNames())) {
                            // The matched export is looking up something in either the out declaration or js dir, now map the written path back into the source dir and source extension
                            const pathFragment = finalPath.slice(candidateDir.length + 1); // +1 to also remove directory seperator
                            const possibleInputBase = combinePaths(commonSourceDirGuess, pathFragment);
                            const jsAndDtsExtensions = [Extension.Mjs, Extension.Cjs, Extension.Js, Extension.Json, Extension.Dmts, Extension.Dcts, Extension.Dts];
                            for (const ext of jsAndDtsExtensions) {
                                if (fileExtensionIs(possibleInputBase, ext)) {
                                    const inputExts = getPossibleOriginalInputExtensionForExtension(possibleInputBase);
                                    for (const possibleExt of inputExts) {
                                        const possibleInputWithInputExtension = changeAnyExtension(possibleInputBase, possibleExt, ext, !useCaseSensitiveFileNames());
                                        if ((extensions === Extensions.TypeScript && hasJSFileExtension(possibleInputWithInputExtension)) ||
                                            (extensions === Extensions.JavaScript && hasTSFileExtension(possibleInputWithInputExtension))) {
                                            continue;
                                        }
                                        if (state.host.fileExists(possibleInputWithInputExtension)) {
                                            return toSearchResult(withPackageId(scope, loadJSOrExactTSFileName(extensions, possibleInputWithInputExtension, /*onlyRecordFailures*/ false, state)));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return undefined;

            function getOutputDirectoriesForBaseDirectory(commonSourceDirGuess: string) {
                // Config file ouput paths are processed to be relative to the host's current directory, while
                // otherwise the paths are resolved relative to the common source dir the compiler puts together
                const currentDir = state.compilerOptions.configFile ? state.host.getCurrentDirectory?.() || "" : commonSourceDirGuess;
                const candidateDirectories = [];
                if (state.compilerOptions.declarationDir) {
                    candidateDirectories.push(toAbsolutePath(combineDirectoryPath(currentDir, state.compilerOptions.declarationDir)));
                }
                if (state.compilerOptions.outDir && state.compilerOptions.outDir !== state.compilerOptions.declarationDir) {
                    candidateDirectories.push(toAbsolutePath(combineDirectoryPath(currentDir, state.compilerOptions.outDir)));
                }
                return candidateDirectories;
            }
        }
    }
}

/** @internal */
export function isApplicableVersionedTypesKey(conditions: readonly string[], key: string) {
    if (conditions.indexOf("types") === -1) return false; // only apply versioned types conditions if the types condition is applied
    if (!startsWith(key, "types@")) return false;
    const range = VersionRange.tryParse(key.substring("types@".length));
    if (!range) return false;
    return range.test(version);
}

function loadModuleFromNearestNodeModulesDirectory(extensions: Extensions, moduleName: string, directory: string, state: ModuleResolutionState, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): SearchResult<Resolved> {
    return loadModuleFromNearestNodeModulesDirectoryWorker(extensions, moduleName, directory, state, /*typesScopeOnly*/ false, cache, redirectedReference);
}

function loadModuleFromNearestModulesDirectoryTypesScope(moduleName: string, directory: string, state: ModuleResolutionState): SearchResult<Resolved> {
    // Extensions parameter here doesn't actually matter, because typesOnly ensures we're just doing @types lookup, which is always DtsOnly.
    return loadModuleFromNearestNodeModulesDirectoryWorker(Extensions.DtsOnly, moduleName, directory, state, /*typesScopeOnly*/ true, /*cache*/ undefined, /*redirectedReference*/ undefined);
}

function loadModuleFromNearestNodeModulesDirectoryWorker(extensions: Extensions, moduleName: string, directory: string, state: ModuleResolutionState, typesScopeOnly: boolean, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): SearchResult<Resolved> {
    const perModuleNameCache = cache && cache.getOrCreateCacheForModuleName(moduleName, state.features === 0 ? undefined : state.features & NodeResolutionFeatures.EsmMode ? ModuleKind.ESNext : ModuleKind.CommonJS, redirectedReference);
    const packageManagerType = state.compilerOptions.packageManagerType;
    const modulePathPart = getModuleByPMType(packageManagerType);
    return forEachAncestorDirectory(normalizeSlashes(directory), ancestorDirectory => {
        if (getBaseFileName(ancestorDirectory) !== modulePathPart) {
            const resolutionFromCache = tryFindNonRelativeModuleNameInCache(perModuleNameCache, moduleName, ancestorDirectory, state);
            if (resolutionFromCache) {
                return resolutionFromCache;
            }
            return toSearchResult(loadModuleFromImmediateNodeModulesDirectory(extensions, moduleName, ancestorDirectory, state, typesScopeOnly, cache, redirectedReference));
        }
    });
}

function loadModuleFromImmediateNodeModulesDirectory(extensions: Extensions, moduleName: string, directory: string, state: ModuleResolutionState, typesScopeOnly: boolean, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): Resolved | undefined {
    const nodeModulesFolder = combinePaths(directory, getModuleByPMType(state.compilerOptions.packageManagerType));
    const nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
    if (!nodeModulesFolderExists && state.traceEnabled) {
        trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesFolder);
    }

    const packageResult = typesScopeOnly ? undefined : loadModuleFromSpecificNodeModulesDirectory(extensions, moduleName, nodeModulesFolder, nodeModulesFolderExists, state, cache, redirectedReference);
    if (packageResult) {
        return packageResult;
    }
    if (extensions === Extensions.TypeScript || extensions === Extensions.DtsOnly) {
        const modulesAtTypes = combinePaths(nodeModulesFolder, "@types");
        let nodeModulesAtTypesExists = nodeModulesFolderExists;
        if (nodeModulesFolderExists && !directoryProbablyExists(modulesAtTypes, state.host)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, modulesAtTypes);
            }
            nodeModulesAtTypesExists = false;
        }
        return loadModuleFromSpecificNodeModulesDirectory(Extensions.DtsOnly, mangleScopedPackageNameWithTrace(moduleName, state), modulesAtTypes, nodeModulesAtTypesExists, state, cache, redirectedReference);
    }
}

function loadModuleFromSpecificNodeModulesDirectory(extensions: Extensions, moduleName: string, nodeModulesDirectory: string, nodeModulesDirectoryExists: boolean, state: ModuleResolutionState, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): Resolved | undefined {
    const candidate = normalizePath(combinePaths(nodeModulesDirectory, moduleName));

    // If oh_modules exist, look for a nested oh-package.json5, as in `oh_modules/foo/bar/oh-package.json5`.
    // Otherwise, look for a nested package.json, as in `node_modules/foo/bar/package.json`.
    let packageInfo = getPackageJsonInfo(candidate, !nodeModulesDirectoryExists, state);
    // But only if we're not respecting export maps (if we are, we might redirect around this location)
    if (!(state.features & NodeResolutionFeatures.Exports)) {
        if (packageInfo) {
            const fromFile = loadModuleFromFile(extensions, candidate, !nodeModulesDirectoryExists, state);
            if (fromFile) {
                return noPackageId(fromFile);
            }

            const fromDirectory = loadNodeModuleFromDirectoryWorker(
                extensions,
                candidate,
                !nodeModulesDirectoryExists,
                state,
                packageInfo.contents.packageJsonContent,
                packageInfo.contents.versionPaths
            );
            return withPackageId(packageInfo, fromDirectory);
        }
    }

    const loader: ResolutionKindSpecificLoader = (extensions, candidate, onlyRecordFailures, state) => {
        let pathAndExtension =
            loadModuleFromFile(extensions, candidate, onlyRecordFailures, state) ||
            loadNodeModuleFromDirectoryWorker(
                extensions,
                candidate,
                onlyRecordFailures,
                state,
                packageInfo && packageInfo.contents.packageJsonContent,
                packageInfo && packageInfo.contents.versionPaths
            );
        if (
            !pathAndExtension && packageInfo
            // eslint-disable-next-line no-null/no-null
            && (packageInfo.contents.packageJsonContent.exports === undefined || packageInfo.contents.packageJsonContent.exports === null)
            && state.features & NodeResolutionFeatures.EsmMode
        ) {
            // EsmMode disables index lookup in `loadNodeModuleFromDirectoryWorker` generally, however non-relative package resolutions still assume
            // a default `index.js` entrypoint if no `main` or `exports` are present
            pathAndExtension = loadModuleFromFile(extensions, combinePaths(candidate, "index.js"), onlyRecordFailures, state);
        }
        return withPackageId(packageInfo, pathAndExtension);
    };

    const { packageName, rest } = parsePackageName(moduleName);
    const packageDirectory = combinePaths(nodeModulesDirectory, packageName);
    if (rest !== "") {
        // Previous `packageInfo` may have been from a nested package.json; ensure we have the one from the package root now.
        packageInfo = getPackageJsonInfo(packageDirectory, !nodeModulesDirectoryExists, state);
    }
    // package exports are higher priority than file/directory/typesVersions lookups and (and, if there's exports present, blocks them)
    if (packageInfo && packageInfo.contents.packageJsonContent.exports && state.features & NodeResolutionFeatures.Exports) {
        return loadModuleFromExports(packageInfo, extensions, combinePaths(".", rest), state, cache, redirectedReference)?.value;
    }
    if (rest !== "" && packageInfo && packageInfo.contents.versionPaths) {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2, packageInfo.contents.versionPaths.version, version, rest);
        }
        const packageDirectoryExists = nodeModulesDirectoryExists && directoryProbablyExists(packageDirectory, state.host);
        const fromPaths = tryLoadModuleUsingPaths(extensions, rest, packageDirectory, packageInfo.contents.versionPaths.paths, /*pathPatterns*/ undefined, loader, !packageDirectoryExists, state);
        if (fromPaths) {
            return fromPaths.value;
        }
    }

    return loader(extensions, candidate, !nodeModulesDirectoryExists, state);
}

function tryLoadModuleUsingPaths(extensions: Extensions, moduleName: string, baseDirectory: string, paths: MapLike<string[]>, pathPatterns: readonly (string | Pattern)[] | undefined, loader: ResolutionKindSpecificLoader, onlyRecordFailures: boolean, state: ModuleResolutionState): SearchResult<Resolved> {
    pathPatterns ||= tryParsePatterns(paths);
    const matchedPattern = matchPatternOrExact(pathPatterns, moduleName);
    if (matchedPattern) {
        const matchedStar = isString(matchedPattern) ? undefined : matchedText(matchedPattern, moduleName);
        const matchedPatternText = isString(matchedPattern) ? matchedPattern : patternText(matchedPattern);
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Module_name_0_matched_pattern_1, moduleName, matchedPatternText);
        }
        const resolved = forEach(paths[matchedPatternText], subst => {
            const path = matchedStar ? subst.replace("*", matchedStar) : subst;
            // When baseUrl is not specified, the command line parser resolves relative paths to the config file location.
            const candidate = normalizePath(combinePaths(baseDirectory, path));
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Trying_substitution_0_candidate_module_location_Colon_1, subst, path);
            }
            // A path mapping may have an extension, in contrast to an import, which should omit it.
            const extension = tryGetExtensionFromPath(subst);
            if (extension !== undefined) {
                const path = tryFile(candidate, onlyRecordFailures, state);
                if (path !== undefined) {
                    return noPackageId({ path, ext: extension });
                }
            }
            return loader(extensions, candidate, onlyRecordFailures || !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
        });
        return { value: resolved };
    }
}

/** Double underscores are used in DefinitelyTyped to delimit scoped packages. */
const mangledScopedPackageSeparator = "__";

/** For a scoped package, we must look in `@types/foo__bar` instead of `@types/@foo/bar`. */
function mangleScopedPackageNameWithTrace(packageName: string, state: ModuleResolutionState): string {
    const mangled = mangleScopedPackageName(packageName);
    if (state.traceEnabled && mangled !== packageName) {
        trace(state.host, Diagnostics.Scoped_package_detected_looking_in_0, mangled);
    }
    return mangled;
}

/** @internal */
export function getTypesPackageName(packageName: string): string {
    return `@types/${mangleScopedPackageName(packageName)}`;
}

/** @internal */
export function mangleScopedPackageName(packageName: string): string {
    if (startsWith(packageName, "@")) {
        const replaceSlash = packageName.replace(directorySeparator, mangledScopedPackageSeparator);
        if (replaceSlash !== packageName) {
            return replaceSlash.slice(1); // Take off the "@"
        }
    }
    return packageName;
}

/** @internal */
export function getPackageNameFromTypesPackageName(mangledName: string): string {
    const withoutAtTypePrefix = removePrefix(mangledName, "@types/");
    if (withoutAtTypePrefix !== mangledName) {
        return unmangleScopedPackageName(withoutAtTypePrefix);
    }
    return mangledName;
}

/** @internal */
export function unmangleScopedPackageName(typesPackageName: string): string {
    return stringContains(typesPackageName, mangledScopedPackageSeparator) ?
        "@" + typesPackageName.replace(mangledScopedPackageSeparator, directorySeparator) :
        typesPackageName;
}

function tryFindNonRelativeModuleNameInCache(cache: PerModuleNameCache | undefined, moduleName: string, containingDirectory: string, state: ModuleResolutionState): SearchResult<Resolved> {
    const result = cache && cache.get(containingDirectory);
    if (result) {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1, moduleName, containingDirectory);
        }
        state.resultFromCache = result;
        return { value: result.resolvedModule && { path: result.resolvedModule.resolvedFileName, originalPath: result.resolvedModule.originalPath || true, extension: result.resolvedModule.extension, packageId: result.resolvedModule.packageId } };
    }
}

export function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: NonRelativeModuleNameResolutionCache, redirectedReference?: ResolvedProjectReference): ResolvedModuleWithFailedLookupLocations {
    const traceEnabled = isTraceEnabled(compilerOptions, host);
    const failedLookupLocations: string[] = [];
    const affectingLocations: string[] = [];
    const containingDirectory = getDirectoryPath(containingFile);
    const diagnostics: Diagnostic[] = [];
    const state: ModuleResolutionState = {
        compilerOptions,
        host,
        traceEnabled,
        failedLookupLocations,
        affectingLocations, packageJsonInfoCache: cache,
        features: NodeResolutionFeatures.None,
        conditions: [],
        requestContainingDirectory: containingDirectory,
        reportDiagnostic: diag => void diagnostics.push(diag),
    };

    const resolved = tryResolve(Extensions.TypeScript) || tryResolve(Extensions.JavaScript);
    // No originalPath because classic resolution doesn't resolve realPath
    return createResolvedModuleWithFailedLookupLocations(
        resolved && resolved.value,
         /*isExternalLibraryImport*/ false,
        failedLookupLocations,
        affectingLocations,
        diagnostics,
        state.resultFromCache
    );

    function tryResolve(extensions: Extensions): SearchResult<Resolved> {
        const resolvedUsingSettings = tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loadModuleFromFileNoPackageId, state);
        if (resolvedUsingSettings) {
            return { value: resolvedUsingSettings };
        }

        if (!isExternalModuleNameRelative(moduleName)) {
            const perModuleNameCache = cache && cache.getOrCreateCacheForModuleName(moduleName, /*mode*/ undefined, redirectedReference);
            // Climb up parent directories looking for a module.
            const resolved = forEachAncestorDirectory(containingDirectory, directory => {
                const resolutionFromCache = tryFindNonRelativeModuleNameInCache(perModuleNameCache, moduleName, directory, state);
                if (resolutionFromCache) {
                    return resolutionFromCache;
                }
                const searchName = normalizePath(combinePaths(directory, moduleName));
                return toSearchResult(loadModuleFromFileNoPackageId(extensions, searchName, /*onlyRecordFailures*/ false, state));
            });
            if (resolved) {
                return resolved;
            }
            if (extensions === Extensions.TypeScript) {
                // If we didn't find the file normally, look it up in @types.
                return loadModuleFromNearestModulesDirectoryTypesScope(moduleName, containingDirectory, state);
            }
        }
        else {
            const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
            return toSearchResult(loadModuleFromFileNoPackageId(extensions, candidate, /*onlyRecordFailures*/ false, state));
        }
    }
}

/**
 * A host may load a module from a global cache of typings.
 * This is the minumum code needed to expose that functionality; the rest is in the host.
 * 
 * @internal
 */
export function loadModuleFromGlobalCache(moduleName: string, projectName: string | undefined, compilerOptions: CompilerOptions, host: ModuleResolutionHost, globalCache: string, packageJsonInfoCache: PackageJsonInfoCache): ResolvedModuleWithFailedLookupLocations {
    const traceEnabled = isTraceEnabled(compilerOptions, host);
    if (traceEnabled) {
        trace(host, Diagnostics.Auto_discovery_for_typings_is_enabled_in_project_0_Running_extra_resolution_pass_for_module_1_using_cache_location_2, projectName, moduleName, globalCache);
    }
    const failedLookupLocations: string[] = [];
    const affectingLocations: string[] = [];
    const diagnostics: Diagnostic[] = [];
    const state: ModuleResolutionState = {
        compilerOptions,
        host,
        traceEnabled,
        failedLookupLocations,
        affectingLocations,
        packageJsonInfoCache,
        features: NodeResolutionFeatures.None,
        conditions: [],
        requestContainingDirectory: undefined,
        reportDiagnostic: diag => void diagnostics.push(diag),
    };
    const resolved = loadModuleFromImmediateNodeModulesDirectory(Extensions.DtsOnly, moduleName, globalCache, state, /*typesScopeOnly*/ false, /*cache*/ undefined, /*redirectedReference*/ undefined);
    return createResolvedModuleWithFailedLookupLocations(
        resolved,
        /*isExternalLibraryImport*/ true,
        failedLookupLocations,
        affectingLocations,
        diagnostics,
        state.resultFromCache
    );
}

/**
 * Represents result of search. Normally when searching among several alternatives we treat value `undefined` as indicator
 * that search fails and we should try another option.
 * However this does not allow us to represent final result that should be used instead of further searching (i.e. a final result that was found in cache).
 * SearchResult is used to deal with this issue, its values represents following outcomes:
 * - undefined - not found, continue searching
 * - { value: undefined } - not found - stop searching
 * - { value: <some-value> } - found - stop searching
 */
type SearchResult<T> = { value: T | undefined } | undefined;

/**
 * Wraps value to SearchResult.
 * @returns undefined if value is undefined or { value } otherwise
 */
function toSearchResult<T>(value: T | undefined): SearchResult<T> {
    return value !== undefined ? { value } : undefined;
}

function traceIfEnabled(state: ModuleResolutionState, diagnostic: DiagnosticMessage, ...args: string[]) {
    if (state.traceEnabled) {
        trace(state.host, diagnostic, ...args);
    }
}
