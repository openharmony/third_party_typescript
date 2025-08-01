import * as ts from "./_namespaces/ts";
import {
    AccessorDeclaration,
    AnnotationDeclaration,
    AnnotationPropertyDeclaration,
    ArrayBindingPattern,
    ArrayLiteralExpression,
    arrayToMap,
    ArrayTypeNode,
    ArrowFunction,
    AsExpression,
    AssertClause,
    AssertEntry,
    AwaitExpression,
    base64encode,
    BigIntLiteral,
    BinaryExpression,
    BinaryOperatorToken,
    BindingElement,
    BindingPattern,
    Block,
    BlockLike,
    BreakStatement,
    BuildInfo,
    Bundle,
    BundleBuildInfo,
    BundleFileInfo,
    BundleFileSectionKind,
    BundleFileTextLike,
    BundleFileTextLikeKind,
    CallExpression,
    CallSignatureDeclaration,
    CaseBlock,
    CaseClause,
    CaseOrDefaultClause,
    cast,
    CatchClause,
    changeExtension,
    CharacterCodes,
    ClassDeclaration,
    ClassExpression,
    ClassStaticBlockDeclaration,
    clone,
    combinePaths,
    CommaListExpression,
    CommentRange,
    compareEmitHelpers,
    comparePaths,
    Comparison,
    CompilerOptions,
    computeCommonSourceDirectoryOfFilenames,
    ComputedPropertyName,
    computeLineStarts,
    computeSignature,
    ConditionalExpression,
    ConditionalTypeNode,
    ConstructorDeclaration,
    ConstructorTypeNode,
    ConstructSignatureDeclaration,
    contains,
    ContinueStatement,
    createBinaryExpressionTrampoline,
    createDiagnosticCollection,
    createGetCanonicalFileName,
    createInputFiles,
    createMultiMap,
    createPrependNodes,
    createSourceMapGenerator,
    createTextWriter,
    CustomTransformers,
    Debug,
    DebuggerStatement,
    DeclarationName,
    Decorator,
    DefaultClause,
    DeleteExpression,
    directorySeparator,
    DoStatement,
    DotToken,
    ElementAccessExpression,
    emitDetachedComments,
    EmitFileNames,
    EmitFlags,
    EmitHint,
    EmitHost,
    emitNewLineBeforeLeadingCommentOfPosition,
    EmitResolver,
    EmitResult,
    EmitTextWriter,
    EmitTransformers,
    emptyArray,
    ensurePathIsNonModuleName,
    ensureTrailingDirectorySeparator,
    EntityName,
    EnumDeclaration,
    EnumMember,
    escapeJsxAttributeString,
    escapeLeadingUnderscores,
    escapeNonAsciiString,
    escapeString,
    ESMap,
    every,
    ExportAssignment,
    ExportDeclaration,
    ExportSpecifier,
    Expression,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    Extension,
    ExternalModuleReference,
    factory,
    fileExtensionIs,
    fileExtensionIsOneOf,
    FileReference,
    filter,
    findAncestor,
    findIndex,
    firstOrUndefined,
    forEach,
    forEachChild,
    forEachLeadingCommentRange,
    forEachTrailingCommentRange,
    ForInOrOfStatement,
    ForInStatement,
    formatGeneratedName,
    formatGeneratedNamePart,
    ForOfStatement,
    ForStatement,
    FunctionDeclaration,
    FunctionExpression,
    FunctionLikeDeclaration,
    FunctionTypeNode,
    GeneratedIdentifier,
    GeneratedIdentifierFlags,
    GeneratedNamePart,
    GeneratedPrivateIdentifier,
    getAreDeclarationMapsEnabled,
    getBaseFileName,
    GetCanonicalFileName,
    getCommentRange,
    getConstantValue,
    getContainingNodeArray,
    getDeclarationEmitExtensionForPath,
    getDeclarationEmitOutputFilePath,
    getDirectoryPath,
    getEmitDeclarations,
    getEmitFlags,
    getEmitHelpers,
    getEmitModuleKind,
    getExternalHelpersModuleName,
    getExternalModuleName,
    getLeadingCommentRanges,
    getLineAndCharacterOfPosition,
    getLinesBetweenPositionAndNextNonWhitespaceCharacter,
    getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter,
    getLinesBetweenRangeEndAndRangeStart,
    getLineStarts,
    getLiteralText,
    GetLiteralTextFlags,
    getModifiers,
    getNewLineCharacter,
    getNodeForGeneratedName,
    getNodeId,
    getNormalizedAbsolutePath,
    getOriginalNode,
    getOwnEmitOutputFilePath,
    getParseTreeNode,
    getRelativePathFromDirectory,
    getRelativePathToDirectoryOrUrl,
    getRootLength,
    getShebang,
    getSnippetElement,
    getSourceFileOfNode,
    getSourceFilePathInNewDir,
    getSourceFilesToEmit,
    getSourceMapRange,
    getSourceTextOfNodeFromSourceFile,
    getStartsOnNewLine,
    getSyntheticLeadingComments,
    getSyntheticTrailingComments,
    getTextOfJSDocComment,
    getTrailingCommentRanges,
    getTrailingSemicolonDeferringWriter,
    getTransformers,
    getTypeNode,
    guessIndentation,
    hasRecordedExternalHelpers,
    HeritageClause,
    Identifier,
    idText,
    IfStatement,
    ImportClause,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportOrExportSpecifier,
    ImportSpecifier,
    ImportTypeNode,
    IndexedAccessTypeNode,
    IndexSignatureDeclaration,
    InferTypeNode,
    InterfaceDeclaration,
    IntersectionTypeNode,
    isAccessExpression,
    isArray,
    isArrowFunction,
    isBinaryExpression,
    isBindingPattern,
    isBlock,
    isBundle,
    isBundleFileTextLike,
    isDeclaration,
    isDeclarationFileName,
    isDecoratorOrAnnotation,
    isEmptyStatement,
    isEtsComponentExpression,
    isExportAssignment,
    isExportSpecifier,
    isExpression,
    isFunctionDeclaration,
    isFunctionLike,
    isGeneratedIdentifier,
    isGeneratedPrivateIdentifier,
    isIdentifier,
    isIncrementalCompilation,
    isInEtsFile,
    isInEtsFileWithOriginal,
    isInJsonFile,
    isInternalDeclaration,
    isJSDocLikeText,
    isJsonSourceFile,
    isJsxClosingElement,
    isJsxOpeningElement,
    isKeyword,
    isLet,
    isLiteralExpression,
    isMemberName,
    isModifier,
    isModuleDeclaration,
    isNodeDescendantOf,
    isNumericLiteral,
    isParenthesizedExpression,
    isPartiallyEmittedExpression,
    isPinnedComment,
    isPrivateIdentifier,
    isPrologueDirective,
    isRecognizedTripleSlashComment,
    isSendableFunctionOrType,
    isSourceFile,
    isSourceFileNotJson,
    isStringLiteral,
    isStructDeclaration,
    isTemplateLiteralKind,
    isTokenKind,
    isTypeParameterDeclaration,
    isUnparsedNode,
    isUnparsedPrepend,
    isUnparsedSource,
    isVarConst,
    isVariableStatement,
    JSDoc,
    JSDocAugmentsTag,
    JSDocCallbackTag,
    JSDocComment,
    JSDocEnumTag,
    JSDocFunctionType,
    JSDocImplementsTag,
    JSDocNameReference,
    JSDocNonNullableType,
    JSDocNullableType,
    JSDocOptionalType,
    JSDocPropertyLikeTag,
    JSDocReturnTag,
    JSDocSeeTag,
    JSDocSignature,
    JSDocTag,
    JSDocTemplateTag,
    JSDocThisTag,
    JSDocTypedefTag,
    JSDocTypeExpression,
    JSDocTypeLiteral,
    JSDocTypeTag,
    JSDocVariadicType,
    JsxAttribute,
    JsxAttributes,
    JsxClosingElement,
    JsxClosingFragment,
    JsxElement,
    JsxEmit,
    JsxExpression,
    JsxFragment,
    JsxOpeningElement,
    JsxOpeningFragment,
    JsxSelfClosingElement,
    JsxSpreadAttribute,
    JsxTagNameExpression,
    JsxText,
    LabeledStatement,
    last,
    lastOrUndefined,
    LateBoundDeclaration,
    length,
    ListFormat,
    LiteralExpression,
    LiteralLikeNode,
    LiteralTypeNode,
    makeIdentifierFromModuleName,
    Map,
    MappedTypeNode,
    maybeBind,
    memoize,
    MemoryDotting,
    MetaProperty,
    MethodDeclaration,
    MethodSignature,
    Modifier,
    ModifierLike,
    ModuleBlock,
    ModuleDeclaration,
    ModuleKind,
    ModuleReference,
    ModuleResolutionHost,
    NamedDeclaration,
    NamedExports,
    NamedImports,
    NamedImportsOrExports,
    NamedTupleMember,
    NamespaceExport,
    NamespaceExportDeclaration,
    NamespaceImport,
    NewExpression,
    Node,
    NodeArray,
    NodeFlags,
    nodeIsSynthesized,
    noEmitNotification,
    noEmitSubstitution,
    NonNullExpression,
    normalizePath,
    normalizeSlashes,
    notImplemented,
    NumericLiteral,
    ObjectBindingPattern,
    ObjectLiteralExpression,
    OptionalTypeNode,
    outFile,
    OutputFile,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    ParsedCommandLine,
    PartiallyEmittedExpression,
    PerformanceDotting,
    Placeholder,
    positionIsSynthesized,
    positionsAreOnSameLine,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    Printer,
    PrintHandlers,
    PrinterOptions,
    PrivateIdentifier,
    ProgramBundleEmitBuildInfo,
    ProjectReference,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertySignature,
    QualifiedName,
    rangeEndIsOnSameLineAsRangeStart,
    rangeEndPositionsAreOnSameLine,
    rangeIsOnSingleLine,
    rangeStartPositionsAreOnSameLine,
    readJsonOrUndefined,
    removeFileExtension,
    resolvePath,
    RestTypeNode,
    returnFalse,
    ReturnStatement,
    returnUndefined,
    SatisfiesExpression,
    ScriptTarget,
    Set,
    setEachParent,
    setOriginalNode,
    setParent,
    setTextRange,
    setTextRangePosEnd,
    setTextRangePosWidth,
    ShorthandPropertyAssignment,
    SignatureDeclaration,
    singleOrUndefined,
    skipPartiallyEmittedExpressions,
    skipTrivia, SnippetElement,
    SnippetKind,
    some,
    SourceFile,
    SourceFilePrologueDirective,
    SourceFilePrologueInfo,
    SourceMapEmitResult,
    SourceMapGenerator,
    SourceMapSource,
    SpreadAssignment,
    SpreadElement,
    stableSort,
    Statement,
    stringContains,
    StringLiteral,
    StructDeclaration,
    supportedJSExtensionsFlat,
    SwitchStatement,
    Symbol,
    SymbolFlags,
    SyntaxKind,
    SynthesizedComment,
    sys,
    TabStop,
    TaggedTemplateExpression,
    TemplateExpression,
    TemplateLiteralTypeNode,
    TemplateLiteralTypeSpan,
    TemplateSpan,
    TextRange,
    ThrowStatement,
    tokenToString,
    tracing,
    TransformationResult,
    transformNodes,
    tryParseRawSourceMap,
    TryStatement,
    TupleTypeNode,
    TypeAliasDeclaration,
    TypeAssertion,
    TypeLiteralNode,
    TypeNode,
    TypeOfExpression,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeQueryNode,
    TypeReferenceNode,
    UnionTypeNode,
    UnparsedNode,
    UnparsedPrepend,
    UnparsedPrologue,
    UnparsedSource,
    UnparsedSyntheticReference,
    UnparsedTextLike,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    VoidExpression,
    WhileStatement,
    WithStatement,
    writeCommentRange,
    writeFile,
    WriteFileCallbackData,
    YieldExpression,
} from "./_namespaces/ts";
import * as performance from "./_namespaces/ts.performance";

const brackets = createBracketsMap();

/** @internal */
export function isBuildInfoFile(file: string) {
    return fileExtensionIs(file, Extension.TsBuildInfo);
}

/**
 * Iterates over the source files that are expected to have an emit output.
 *
 * @param host An EmitHost.
 * @param action The action to execute.
 * @param sourceFilesOrTargetSourceFile
 *   If an array, the full list of source files to emit.
 *   Else, calls `getSourceFilesToEmit` with the (optional) target source file to determine the list of source files to emit.
 * 
 * @internal
 */
export function forEachEmittedFile<T>(
    host: EmitHost, action: (emitFileNames: EmitFileNames, sourceFileOrBundle: SourceFile | Bundle | undefined) => T,
    sourceFilesOrTargetSourceFile?: readonly SourceFile[] | SourceFile,
    forceDtsEmit = false,
    onlyBuildInfo?: boolean,
    includeBuildInfo?: boolean) {
    const sourceFiles = isArray(sourceFilesOrTargetSourceFile) ? sourceFilesOrTargetSourceFile : getSourceFilesToEmit(host, sourceFilesOrTargetSourceFile, forceDtsEmit);
    const options = host.getCompilerOptions();
    if (outFile(options)) {
        const prepends = host.getPrependNodes();
        if (sourceFiles.length || prepends.length) {
            const bundle = factory.createBundle(sourceFiles, prepends);
            const result = action(getOutputPathsFor(bundle, host, forceDtsEmit), bundle);
            if (result) {
                return result;
            }
        }
    }
    else {
        if (!onlyBuildInfo) {
            for (const sourceFile of sourceFiles) {
                const result = action(getOutputPathsFor(sourceFile, host, forceDtsEmit), sourceFile);
                if (result) {
                    return result;
                }
            }
        }
        if (includeBuildInfo) {
            const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
            if (buildInfoPath) return action({ buildInfoPath }, /*sourceFileOrBundle*/ undefined);
        }
    }
}

export function getTsBuildInfoEmitOutputFilePath(options: CompilerOptions) {
    const configFile = options.configFilePath;
    if (!isIncrementalCompilation(options)) return undefined;
    if (options.tsBuildInfoFile) return options.tsBuildInfoFile;
    const outPath = outFile(options);
    let buildInfoExtensionLess: string;
    if (outPath) {
        buildInfoExtensionLess = removeFileExtension(outPath);
    }
    else {
        if (!configFile) return undefined;
        const configFileExtensionLess = removeFileExtension(configFile);
        buildInfoExtensionLess = options.outDir ?
            options.rootDir ?
                resolvePath(options.outDir, getRelativePathFromDirectory(options.rootDir, configFileExtensionLess, /*ignoreCase*/ true)) :
                combinePaths(options.outDir, getBaseFileName(configFileExtensionLess)) :
            configFileExtensionLess;
    }
    return buildInfoExtensionLess + Extension.TsBuildInfo;
}

export function getTsBuildInfoEmitOutputFilePathForLinter(tsBuildInfoPath: string): string {
    return tsBuildInfoPath + '.linter';
}

/** @internal */
export function getOutputPathsForBundle(options: CompilerOptions, forceDtsPaths: boolean): EmitFileNames {
    const outPath = outFile(options)!;
    const jsFilePath = options.emitDeclarationOnly ? undefined : outPath;
    const sourceMapFilePath = jsFilePath && getSourceMapFilePath(jsFilePath, options);
    const declarationFilePath = (forceDtsPaths || getEmitDeclarations(options)) ? removeFileExtension(outPath) + Extension.Dts : undefined;
    const declarationMapPath = declarationFilePath && getAreDeclarationMapsEnabled(options) ? declarationFilePath + ".map" : undefined;
    const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
    return { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath };
}

/** @internal */
export function getOutputPathsFor(sourceFile: SourceFile | Bundle, host: EmitHost, forceDtsPaths: boolean): EmitFileNames {
    const options = host.getCompilerOptions();
    if (sourceFile.kind === SyntaxKind.Bundle) {
        return getOutputPathsForBundle(options, forceDtsPaths);
    }
    else {
        const ownOutputFilePath = getOwnEmitOutputFilePath(sourceFile.fileName, host, getOutputExtension(sourceFile.fileName, options));
        const isJsonFile = isJsonSourceFile(sourceFile);
        // If json file emits to the same location skip writing it, if emitDeclarationOnly skip writing it
        const isJsonEmittedToSameLocation = isJsonFile &&
            comparePaths(sourceFile.fileName, ownOutputFilePath, host.getCurrentDirectory(), !host.useCaseSensitiveFileNames()) === Comparison.EqualTo;
        const jsFilePath = options.emitDeclarationOnly || isJsonEmittedToSameLocation ? undefined : ownOutputFilePath;
        const sourceMapFilePath = !jsFilePath || isJsonSourceFile(sourceFile) ? undefined : getSourceMapFilePath(jsFilePath, options);
        const declarationFilePath = (forceDtsPaths || (getEmitDeclarations(options) && !isJsonFile)) ? getDeclarationEmitOutputFilePath(sourceFile.fileName, host) : undefined;
        const declarationMapPath = declarationFilePath && getAreDeclarationMapsEnabled(options) ? declarationFilePath + ".map" : undefined;
        return { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath: undefined };
    }
}

function getSourceMapFilePath(jsFilePath: string, options: CompilerOptions) {
    return (options.sourceMap && !options.inlineSourceMap) ? jsFilePath + ".map" : undefined;
}

/** @internal */
export function getOutputExtension(fileName: string, options: CompilerOptions): Extension {
    return fileExtensionIs(fileName, Extension.Json) ? Extension.Json :
    options.jsx === JsxEmit.Preserve && fileExtensionIsOneOf(fileName, [Extension.Jsx, Extension.Tsx]) ? Extension.Jsx :
    fileExtensionIsOneOf(fileName, [Extension.Mts, Extension.Mjs]) ? Extension.Mjs :
    fileExtensionIsOneOf(fileName, [Extension.Cts, Extension.Cjs]) ? Extension.Cjs :
    Extension.Js;
}

function getOutputPathWithoutChangingExt(inputFileName: string, configFile: ParsedCommandLine, ignoreCase: boolean, outputDir: string | undefined, getCommonSourceDirectory?: () => string) {
    return outputDir ?
        resolvePath(
            outputDir,
            getRelativePathFromDirectory(getCommonSourceDirectory ? getCommonSourceDirectory() : getCommonSourceDirectoryOfConfig(configFile, ignoreCase), inputFileName, ignoreCase)
        ) :
        inputFileName;
}

/** @internal */
export function getOutputDeclarationFileName(inputFileName: string, configFile: ParsedCommandLine, ignoreCase: boolean, getCommonSourceDirectory?: () => string) {
    return changeExtension(
        getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, configFile.options.declarationDir || configFile.options.outDir, getCommonSourceDirectory),
        getDeclarationEmitExtensionForPath(inputFileName)
    );
}

function getOutputJSFileName(inputFileName: string, configFile: ParsedCommandLine, ignoreCase: boolean, getCommonSourceDirectory?: () => string) {
    if (configFile.options.emitDeclarationOnly) return undefined;
    const isJsonFile = fileExtensionIs(inputFileName, Extension.Json);
    const outputFileName = changeExtension(
        getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, configFile.options.outDir, getCommonSourceDirectory),
        getOutputExtension(inputFileName, configFile.options)
    );
    return !isJsonFile || comparePaths(inputFileName, outputFileName, Debug.checkDefined(configFile.options.configFilePath), ignoreCase) !== Comparison.EqualTo ?
        outputFileName :
        undefined;
}

function createAddOutput() {
    let outputs: string[] | undefined;
    return { addOutput, getOutputs };
    function addOutput(path: string | undefined) {
        if (path) {
            (outputs || (outputs = [])).push(path);
        }
    }
    function getOutputs(): readonly string[] {
        return outputs || emptyArray;
    }
}

function getSingleOutputFileNames(configFile: ParsedCommandLine, addOutput: ReturnType<typeof createAddOutput>["addOutput"]) {
    const { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath } = getOutputPathsForBundle(configFile.options, /*forceDtsPaths*/ false);
    addOutput(jsFilePath);
    addOutput(sourceMapFilePath);
    addOutput(declarationFilePath);
    addOutput(declarationMapPath);
    addOutput(buildInfoPath);
}

function getOwnOutputFileNames(configFile: ParsedCommandLine, inputFileName: string, ignoreCase: boolean, addOutput: ReturnType<typeof createAddOutput>["addOutput"], getCommonSourceDirectory?: () => string) {
    if (isDeclarationFileName(inputFileName)) return;
    const js = getOutputJSFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
    addOutput(js);
    if (fileExtensionIs(inputFileName, Extension.Json)) return;
    if (js && configFile.options.sourceMap) {
        addOutput(`${js}.map`);
    }
    if (getEmitDeclarations(configFile.options)) {
        const dts = getOutputDeclarationFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
        addOutput(dts);
        if (configFile.options.declarationMap) {
            addOutput(`${dts}.map`);
        }
    }
}

/** @internal */
export function getCommonSourceDirectory(
    options: CompilerOptions,
    emittedFiles: () => readonly string[],
    currentDirectory: string,
    getCanonicalFileName: GetCanonicalFileName,
    checkSourceFilesBelongToPath?: (commonSourceDirectory: string) => void
): string {
    let commonSourceDirectory;
    if (options.rootDir) {
        // If a rootDir is specified use it as the commonSourceDirectory
        commonSourceDirectory = getNormalizedAbsolutePath(options.rootDir, currentDirectory);
        checkSourceFilesBelongToPath?.(options.rootDir);
    }
    else if (options.composite && options.configFilePath) {
        // Project compilations never infer their root from the input source paths
        commonSourceDirectory = getDirectoryPath(normalizeSlashes(options.configFilePath));
        checkSourceFilesBelongToPath?.(commonSourceDirectory);
    }
    else {
        commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(emittedFiles(), currentDirectory, getCanonicalFileName);
    }

    if (commonSourceDirectory && commonSourceDirectory[commonSourceDirectory.length - 1] !== directorySeparator) {
        // Make sure directory path ends with directory separator so this string can directly
        // used to replace with "" to get the relative path of the source file and the relative path doesn't
        // start with / making it rooted path
        commonSourceDirectory += directorySeparator;
    }
    return commonSourceDirectory;
}

/** @internal */
export function getCommonSourceDirectoryOfConfig({ options, fileNames }: ParsedCommandLine, ignoreCase: boolean): string {
    return getCommonSourceDirectory(
        options,
        () => filter(fileNames, file => !(options.noEmitForJsFiles && fileExtensionIsOneOf(file, supportedJSExtensionsFlat)) && !isDeclarationFileName(file)),
        getDirectoryPath(normalizeSlashes(Debug.checkDefined(options.configFilePath))),
        createGetCanonicalFileName(!ignoreCase)
    );
}

/** @internal */
export function getAllProjectOutputs(configFile: ParsedCommandLine, ignoreCase: boolean): readonly string[] {
    const { addOutput, getOutputs } = createAddOutput();
    if (outFile(configFile.options)) {
        getSingleOutputFileNames(configFile, addOutput);
    }
    else {
        const getCommonSourceDirectory = memoize(() => getCommonSourceDirectoryOfConfig(configFile, ignoreCase));
        for (const inputFileName of configFile.fileNames) {
            getOwnOutputFileNames(configFile, inputFileName, ignoreCase, addOutput, getCommonSourceDirectory);
        }
        addOutput(getTsBuildInfoEmitOutputFilePath(configFile.options));
    }
    return getOutputs();
}

export function getOutputFileNames(commandLine: ParsedCommandLine, inputFileName: string, ignoreCase: boolean): readonly string[] {
    inputFileName = normalizePath(inputFileName);
    Debug.assert(contains(commandLine.fileNames, inputFileName), `Expected fileName to be present in command line`);
    const { addOutput, getOutputs } = createAddOutput();
    if (outFile(commandLine.options)) {
        getSingleOutputFileNames(commandLine, addOutput);
    }
    else {
        getOwnOutputFileNames(commandLine, inputFileName, ignoreCase, addOutput);
    }
    return getOutputs();
}

/** @internal */
export function getFirstProjectOutput(configFile: ParsedCommandLine, ignoreCase: boolean): string {
    if (outFile(configFile.options)) {
        const { jsFilePath } = getOutputPathsForBundle(configFile.options, /*forceDtsPaths*/ false);
        return Debug.checkDefined(jsFilePath, `project ${configFile.options.configFilePath} expected to have at least one output`);
    }

    const getCommonSourceDirectory = memoize(() => getCommonSourceDirectoryOfConfig(configFile, ignoreCase));
    for (const inputFileName of configFile.fileNames) {
        if (isDeclarationFileName(inputFileName)) continue;
        const jsFilePath = getOutputJSFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
        if (jsFilePath) return jsFilePath;
        if (fileExtensionIs(inputFileName, Extension.Json)) continue;
        if (getEmitDeclarations(configFile.options)) {
            return getOutputDeclarationFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
        }
    }
    const buildInfoPath = getTsBuildInfoEmitOutputFilePath(configFile.options);
    if (buildInfoPath) return buildInfoPath;
    return Debug.fail(`project ${configFile.options.configFilePath} expected to have at least one output`);
}

/**
 * targetSourceFile is when users only want one file in entire project to be emitted. This is used in compileOnSave feature
 * 
 * @internal
 */
export function emitFiles(resolver: EmitResolver, host: EmitHost, targetSourceFile: SourceFile | undefined, { scriptTransformers, declarationTransformers }: EmitTransformers, emitOnlyDtsFiles?: boolean, onlyBuildInfo?: boolean, forceDtsEmit?: boolean): EmitResult {
    var compilerOptions = host.getCompilerOptions();
    var sourceMapDataList: SourceMapEmitResult[] | undefined = (compilerOptions.sourceMap || compilerOptions.inlineSourceMap || getAreDeclarationMapsEnabled(compilerOptions)) ? [] : undefined;
    var emittedFilesList: string[] | undefined = compilerOptions.listEmittedFiles ? [] : undefined;
    var emitterDiagnostics = createDiagnosticCollection();
    var newLine = getNewLineCharacter(compilerOptions, () => host.getNewLine());
    var writer = createTextWriter(newLine);
    var { enter, exit } = performance.createTimer("printTime", "beforePrint", "afterPrint");
    var bundleBuildInfo: BundleBuildInfo | undefined;
    var emitSkipped = false;
    var recordInfo = MemoryDotting.recordStage(MemoryDotting.EMIT_FILES);

    // Emit each output file
    enter();
    forEachEmittedFile(
        host,
        emitSourceFileOrBundle,
        getSourceFilesToEmit(host, targetSourceFile, forceDtsEmit),
        forceDtsEmit,
        onlyBuildInfo,
        !targetSourceFile
    );
    exit();
    MemoryDotting.stopRecordStage(recordInfo);


    return {
        emitSkipped,
        diagnostics: emitterDiagnostics.getDiagnostics(),
        emittedFiles: emittedFilesList,
        sourceMaps: sourceMapDataList,
    };

    function emitSourceFileOrBundle({ jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath }: EmitFileNames, sourceFileOrBundle: SourceFile | Bundle | undefined) {
        let buildInfoDirectory: string | undefined;
        if (buildInfoPath && sourceFileOrBundle && isBundle(sourceFileOrBundle)) {
            buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
            bundleBuildInfo = {
                commonSourceDirectory: relativeToBuildInfo(host.getCommonSourceDirectory()),
                sourceFiles: sourceFileOrBundle.sourceFiles.map(file => relativeToBuildInfo(getNormalizedAbsolutePath(file.fileName, host.getCurrentDirectory())))
            };
        }
        tracing?.push(tracing.Phase.Emit, "emitJsFileOrBundle", { jsFilePath });
        PerformanceDotting.start("emitJsFileOrBundle");
        emitJsFileOrBundle(sourceFileOrBundle, jsFilePath, sourceMapFilePath, relativeToBuildInfo);
        PerformanceDotting.stop("emitJsFileOrBundle");
        tracing?.pop();

        tracing?.push(tracing.Phase.Emit, "emitDeclarationFileOrBundle", { declarationFilePath });
        PerformanceDotting.start("emitDeclarationFileOrBundle");
        emitDeclarationFileOrBundle(sourceFileOrBundle, declarationFilePath, declarationMapPath, relativeToBuildInfo);
        PerformanceDotting.stop("emitDeclarationFileOrBundle");
        tracing?.pop();

        tracing?.push(tracing.Phase.Emit, "emitBuildInfo", { buildInfoPath });
        PerformanceDotting.start("emitBuildInfo");
        emitBuildInfo(bundleBuildInfo, buildInfoPath);
        PerformanceDotting.stop("emitBuildInfo");
        tracing?.pop();

        if (!emitSkipped && emittedFilesList) {
            if (!emitOnlyDtsFiles) {
                if (jsFilePath) {
                    emittedFilesList.push(jsFilePath);
                }
                if (sourceMapFilePath) {
                    emittedFilesList.push(sourceMapFilePath);
                }
                if (buildInfoPath) {
                    emittedFilesList.push(buildInfoPath);
                }
            }
            if (declarationFilePath) {
                emittedFilesList.push(declarationFilePath);
            }
            if (declarationMapPath) {
                emittedFilesList.push(declarationMapPath);
            }
        }

        function relativeToBuildInfo(path: string) {
            return ensurePathIsNonModuleName(getRelativePathFromDirectory(buildInfoDirectory!, path, host.getCanonicalFileName));
        }
    }

    function emitBuildInfo(bundle: BundleBuildInfo | undefined, buildInfoPath: string | undefined) {
        // Write build information if applicable
        if (!buildInfoPath || targetSourceFile || emitSkipped) return;
        const program = host.getProgramBuildInfo();
        if (host.isEmitBlocked(buildInfoPath)) {
            emitSkipped = true;
            return;
        }
        const version = ts.version; // Extracted into a const so the form is stable between namespace and module
        const buildInfo: BuildInfo = { bundle, program, version };
        // Pass buildinfo as additional data to avoid having to reparse
        writeFile(host, emitterDiagnostics, buildInfoPath, getBuildInfoText(buildInfo), /*writeByteOrderMark*/ false, /*sourceFiles*/ undefined, { buildInfo });

        const programForLinter = host.getProgramBuildInfoForLinter && host.getProgramBuildInfoForLinter();
        if (programForLinter) {
            const versionForLinter = ts.version;
            const buildInfoLinter: BuildInfo = { bundle: bundle, program: programForLinter, version: versionForLinter };
            writeFile(host, emitterDiagnostics, getTsBuildInfoEmitOutputFilePathForLinter(buildInfoPath), getBuildInfoText(buildInfoLinter),
                /*writeByteOrderMark*/ false, /*sourceFiles*/ undefined, { buildInfo: buildInfoLinter });
        }
    }

    function emitJsFileOrBundle(
        sourceFileOrBundle: SourceFile | Bundle | undefined,
        jsFilePath: string | undefined,
        sourceMapFilePath: string | undefined,
        relativeToBuildInfo: (path: string) => string) {
        if (!sourceFileOrBundle || emitOnlyDtsFiles || !jsFilePath) {
            return;
        }

        // Make sure not to write js file and source map file if any of them cannot be written
        if (host.isEmitBlocked(jsFilePath) || compilerOptions.noEmit) {
            emitSkipped = true;
            return;
        }
        // Transform the source files
        PerformanceDotting.start("transformNodes");
        const transform = transformNodes(resolver, host, factory, compilerOptions, [sourceFileOrBundle], scriptTransformers, /*allowDtsFiles*/ false);
        PerformanceDotting.stop("transformNodes");

        const printerOptions: PrinterOptions = {
            removeComments: compilerOptions.removeComments,
            newLine: compilerOptions.newLine,
            noEmitHelpers: compilerOptions.noEmitHelpers,
            module: compilerOptions.module,
            target: compilerOptions.target,
            sourceMap: compilerOptions.sourceMap,
            inlineSourceMap: compilerOptions.inlineSourceMap,
            inlineSources: compilerOptions.inlineSources,
            extendedDiagnostics: compilerOptions.extendedDiagnostics,
            writeBundleFileInfo: !!bundleBuildInfo,
            relativeToBuildInfo
        };

        // Create a printer to print the nodes
        PerformanceDotting.start("printSourceFileOrBundle");
        const printer = createPrinter(printerOptions, {
            // resolver hooks
            hasGlobalName: resolver.hasGlobalName,

            // transform hooks
            onEmitNode: transform.emitNodeWithNotification,
            isEmitNotificationEnabled: transform.isEmitNotificationEnabled,
            substituteNode: transform.substituteNode,
        });

        Debug.assert(transform.transformed.length === 1, "Should only see one output from the transform");
        printSourceFileOrBundle(jsFilePath, sourceMapFilePath, transform, printer, compilerOptions);
        PerformanceDotting.stop("printSourceFileOrBundle");

            // Clean up emit nodes on parse tree
        PerformanceDotting.start("transformDispose");
        transform.dispose();
        PerformanceDotting.stop("transformDispose");
        if (bundleBuildInfo) bundleBuildInfo.js = printer.bundleFileInfo;
    }

    function emitDeclarationFileOrBundle(
        sourceFileOrBundle: SourceFile | Bundle | undefined,
        declarationFilePath: string | undefined,
        declarationMapPath: string | undefined,
        relativeToBuildInfo: (path: string) => string) {
        if (!sourceFileOrBundle) return;
        if (!declarationFilePath) {
            if (emitOnlyDtsFiles || compilerOptions.emitDeclarationOnly) emitSkipped = true;
            return;
        }
        const sourceFiles = isSourceFile(sourceFileOrBundle) ? [sourceFileOrBundle] : sourceFileOrBundle.sourceFiles;
        const filesForEmit = forceDtsEmit ? sourceFiles : filter(sourceFiles, isSourceFileNotJson);
        // Setup and perform the transformation to retrieve declarations from the input files
        const inputListOrBundle = outFile(compilerOptions) ? [factory.createBundle(filesForEmit, !isSourceFile(sourceFileOrBundle) ? sourceFileOrBundle.prepends : undefined)] : filesForEmit;
        if (emitOnlyDtsFiles && !getEmitDeclarations(compilerOptions)) {
            // Checker wont collect the linked aliases since thats only done when declaration is enabled.
            // Do that here when emitting only dts files
            filesForEmit.forEach(collectLinkedAliases);
        }
        PerformanceDotting.start("transformNodes");
        const declarationTransform = transformNodes(resolver, host, factory, compilerOptions, inputListOrBundle, declarationTransformers, /*allowDtsFiles*/ false);
        PerformanceDotting.stop("transformNodes");
        if (length(declarationTransform.diagnostics)) {
            for (const diagnostic of declarationTransform.diagnostics!) {
                emitterDiagnostics.add(diagnostic);
            }
        }

        PerformanceDotting.start("printSourceFileOrBundle");
        const printerOptions: PrinterOptions = {
            removeComments: compilerOptions.removeComments,
            newLine: compilerOptions.newLine,
            noEmitHelpers: true,
            module: compilerOptions.module,
            target: compilerOptions.target,
            sourceMap: !forceDtsEmit && compilerOptions.declarationMap,
            inlineSourceMap: compilerOptions.inlineSourceMap,
            extendedDiagnostics: compilerOptions.extendedDiagnostics,
            onlyPrintJsDocStyle: true,
            writeBundleFileInfo: !!bundleBuildInfo,
            recordInternalSection: !!bundleBuildInfo,
            relativeToBuildInfo
        };

        const declarationPrinter = createPrinter(printerOptions, {
            // resolver hooks
            hasGlobalName: resolver.hasGlobalName,

            // transform hooks
            onEmitNode: declarationTransform.emitNodeWithNotification,
            isEmitNotificationEnabled: declarationTransform.isEmitNotificationEnabled,
            substituteNode: declarationTransform.substituteNode,
        });
        const declBlocked = (!!declarationTransform.diagnostics && !!declarationTransform.diagnostics.length) || !!host.isEmitBlocked(declarationFilePath) || !!compilerOptions.noEmit;
        emitSkipped = emitSkipped || declBlocked;
        if (!declBlocked || forceDtsEmit) {
            Debug.assert(declarationTransform.transformed.length === 1, "Should only see one output from the decl transform");
            printSourceFileOrBundle(
                declarationFilePath,
                declarationMapPath,
                declarationTransform,
                declarationPrinter,
                {
                    sourceMap: printerOptions.sourceMap,
                    sourceRoot: compilerOptions.sourceRoot,
                    mapRoot: compilerOptions.mapRoot,
                    extendedDiagnostics: compilerOptions.extendedDiagnostics,
                    // Explicitly do not passthru either `inline` option
                }
            );
        }
        PerformanceDotting.stop("printSourceFileOrBundle");
        PerformanceDotting.start("declarationTransformDispose");
        declarationTransform.dispose();
        PerformanceDotting.stop("declarationTransformDispose");
        if (bundleBuildInfo) bundleBuildInfo.dts = declarationPrinter.bundleFileInfo;
    }

    function collectLinkedAliases(node: Node) {
        if (isExportAssignment(node)) {
            if (node.expression.kind === SyntaxKind.Identifier) {
                resolver.collectLinkedAliases(node.expression as Identifier, /*setVisibility*/ true);
            }
            return;
        }
        else if (isExportSpecifier(node)) {
            resolver.collectLinkedAliases(node.propertyName || node.name, /*setVisibility*/ true);
            return;
        }
        forEachChild(node, collectLinkedAliases);
    }

    function printSourceFileOrBundle(jsFilePath: string, sourceMapFilePath: string | undefined, transform: TransformationResult<SourceFile | Bundle>, printer: Printer, mapOptions: SourceMapOptions) {
        const sourceFileOrBundle = transform.transformed[0];
        const bundle = sourceFileOrBundle.kind === SyntaxKind.Bundle ? sourceFileOrBundle : undefined;
        const sourceFile = sourceFileOrBundle.kind === SyntaxKind.SourceFile ? sourceFileOrBundle : undefined;
        const sourceFiles = bundle ? bundle.sourceFiles : [sourceFile!];

        let sourceMapGenerator: SourceMapGenerator | undefined;
        if (shouldEmitSourceMaps(mapOptions, sourceFileOrBundle)) {
            sourceMapGenerator = createSourceMapGenerator(
                host,
                getBaseFileName(normalizeSlashes(jsFilePath)),
                getSourceRoot(mapOptions),
                getSourceMapDirectory(mapOptions, jsFilePath, sourceFile),
                mapOptions);
        }

        if (bundle) {
            printer.writeBundle(bundle, writer, sourceMapGenerator);
        }
        else {
            printer.writeFile(sourceFile!, writer, sourceMapGenerator);
        }

        let sourceMapUrlPos;
        if (sourceMapGenerator) {
            if (sourceMapDataList) {
                sourceMapDataList.push({
                    inputSourceFileNames: sourceMapGenerator.getSources(),
                    sourceMap: sourceMapGenerator.toJSON()
                });
            }

            const sourceMappingURL = getSourceMappingURL(
                mapOptions,
                sourceMapGenerator,
                jsFilePath,
                sourceMapFilePath,
                sourceFile);

            if (sourceMappingURL) {
                if (!writer.isAtStartOfLine()) writer.rawWrite(newLine);
                sourceMapUrlPos = writer.getTextPos();
                writer.writeComment(`//# ${"sourceMappingURL"}=${sourceMappingURL}`); // Tools can sometimes see this line as a source mapping url comment
            }

            // Write the source map
            if (sourceMapFilePath) {
                const sourceMap = sourceMapGenerator.toString();
                writeFile(host, emitterDiagnostics, sourceMapFilePath, sourceMap, /*writeByteOrderMark*/ false, sourceFiles);
                if (printer.bundleFileInfo) printer.bundleFileInfo.mapHash = computeSignature(sourceMap, maybeBind(host, host.createHash));
            }
        }
        else {
            writer.writeLine();
        }

        // Write the output file
        const text = writer.getText();
        writeFile(host, emitterDiagnostics, jsFilePath, text, !!compilerOptions.emitBOM, sourceFiles, { sourceMapUrlPos, diagnostics: transform.diagnostics });
        // We store the hash of the text written in the buildinfo to ensure that text of the referenced d.ts file is same as whats in the buildinfo
        // This is needed because incremental can be toggled between two runs and we might use stale file text to do text manipulation in prepend mode
        if (printer.bundleFileInfo) printer.bundleFileInfo.hash = computeSignature(text, maybeBind(host, host.createHash));

        // Reset state
        writer.clear();
    }

    interface SourceMapOptions {
        sourceMap?: boolean;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        sourceRoot?: string;
        mapRoot?: string;
        extendedDiagnostics?: boolean;
    }

    function shouldEmitSourceMaps(mapOptions: SourceMapOptions, sourceFileOrBundle: SourceFile | Bundle) {
        return (mapOptions.sourceMap || mapOptions.inlineSourceMap)
            && (sourceFileOrBundle.kind !== SyntaxKind.SourceFile || !fileExtensionIs(sourceFileOrBundle.fileName, Extension.Json));
    }

    function getSourceRoot(mapOptions: SourceMapOptions) {
        // Normalize source root and make sure it has trailing "/" so that it can be used to combine paths with the
        // relative paths of the sources list in the sourcemap
        const sourceRoot = normalizeSlashes(mapOptions.sourceRoot || "");
        return sourceRoot ? ensureTrailingDirectorySeparator(sourceRoot) : sourceRoot;
    }

    function getSourceMapDirectory(mapOptions: SourceMapOptions, filePath: string, sourceFile: SourceFile | undefined) {
        if (mapOptions.sourceRoot) return host.getCommonSourceDirectory();
        if (mapOptions.mapRoot) {
            let sourceMapDir = normalizeSlashes(mapOptions.mapRoot);
            if (sourceFile) {
                // For modules or multiple emit files the mapRoot will have directory structure like the sources
                // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFile.fileName, host, sourceMapDir));
            }
            if (getRootLength(sourceMapDir) === 0) {
                // The relative paths are relative to the common directory
                sourceMapDir = combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
            }
            return sourceMapDir;
        }
        return getDirectoryPath(normalizePath(filePath));
    }

    function getSourceMappingURL(mapOptions: SourceMapOptions, sourceMapGenerator: SourceMapGenerator, filePath: string, sourceMapFilePath: string | undefined, sourceFile: SourceFile | undefined) {
        if (mapOptions.inlineSourceMap) {
            // Encode the sourceMap into the sourceMap url
            const sourceMapText = sourceMapGenerator.toString();
            const base64SourceMapText = base64encode(sys, sourceMapText);
            return `data:application/json;base64,${base64SourceMapText}`;
        }

        const sourceMapFile = getBaseFileName(normalizeSlashes(Debug.checkDefined(sourceMapFilePath)));
        if (mapOptions.mapRoot) {
            let sourceMapDir = normalizeSlashes(mapOptions.mapRoot);
            if (sourceFile) {
                // For modules or multiple emit files the mapRoot will have directory structure like the sources
                // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFile.fileName, host, sourceMapDir));
            }
            if (getRootLength(sourceMapDir) === 0) {
                // The relative paths are relative to the common directory
                sourceMapDir = combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                return encodeURI(
                    getRelativePathToDirectoryOrUrl(
                        getDirectoryPath(normalizePath(filePath)), // get the relative sourceMapDir path based on jsFilePath
                        combinePaths(sourceMapDir, sourceMapFile), // this is where user expects to see sourceMap
                        host.getCurrentDirectory(),
                        host.getCanonicalFileName,
                        /*isAbsolutePathAnUrl*/ true));
            }
            else {
                return encodeURI(combinePaths(sourceMapDir, sourceMapFile));
            }
        }
        return encodeURI(sourceMapFile);
    }
}

/** @internal */
export function getBuildInfoText(buildInfo: BuildInfo) {
    return JSON.stringify(buildInfo);
}

/** @internal */
export function getBuildInfo(buildInfoFile: string, buildInfoText: string) {
    return readJsonOrUndefined(buildInfoFile, buildInfoText) as BuildInfo | undefined;
}

/** @internal */
export const notImplementedResolver: EmitResolver = {
    hasGlobalName: notImplemented,
    getReferencedExportContainer: notImplemented,
    getReferencedImportDeclaration: notImplemented,
    getReferencedDeclarationWithCollidingName: notImplemented,
    isDeclarationWithCollidingName: notImplemented,
    isValueAliasDeclaration: notImplemented,
    isReferencedAliasDeclaration: notImplemented,
    isReferenced: notImplemented,
    isTopLevelValueImportEqualsWithEntityName: notImplemented,
    getNodeCheckFlags: notImplemented,
    isDeclarationVisible: notImplemented,
    isLateBound: (_node): _node is LateBoundDeclaration => false,
    collectLinkedAliases: notImplemented,
    isImplementationOfOverload: notImplemented,
    isRequiredInitializedParameter: notImplemented,
    isOptionalUninitializedParameterProperty: notImplemented,
    isExpandoFunctionDeclaration: notImplemented,
    getPropertiesOfContainerFunction: notImplemented,
    createTypeOfDeclaration: notImplemented,
    createReturnTypeOfSignatureDeclaration: notImplemented,
    createTypeOfExpression: notImplemented,
    createLiteralConstValue: notImplemented,
    isSymbolAccessible: notImplemented,
    isEntityNameVisible: notImplemented,
    // Returns the constant value this property access resolves to: notImplemented, or 'undefined' for a non-constant
    getConstantValue: notImplemented,
    getReferencedValueDeclaration: notImplemented,
    getTypeReferenceSerializationKind: notImplemented,
    isOptionalParameter: notImplemented,
    moduleExportsSomeValue: notImplemented,
    isArgumentsLocalBinding: notImplemented,
    getExternalModuleFileFromDeclaration: notImplemented,
    getTypeReferenceDirectivesForEntityName: notImplemented,
    getTypeReferenceDirectivesForSymbol: notImplemented,
    isLiteralConstDeclaration: notImplemented,
    getJsxFactoryEntity: notImplemented,
    getJsxFragmentFactoryEntity: notImplemented,
    getAllAccessorDeclarations: notImplemented,
    getSymbolOfExternalModuleSpecifier: notImplemented,
    isBindingCapturedByNode: notImplemented,
    getDeclarationStatementsForSourceFile: notImplemented,
    isImportRequiredByAugmentation: notImplemented,
    getAnnotationObjectLiteralEvaluatedProps: notImplemented,
    getAnnotationPropertyEvaluatedInitializer: notImplemented,
    getAnnotationPropertyInferredType: notImplemented,
    isReferredToAnnotation: notImplemented,
};

/** File that isnt present resulting in error or output files
 * 
 * @internal
 */
export type EmitUsingBuildInfoResult = string | readonly OutputFile[];

/** @internal */
export interface EmitUsingBuildInfoHost extends ModuleResolutionHost {
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    createHash?(data: string): string;
    getBuildInfo?(fileName: string, configFilePath: string | undefined): BuildInfo | undefined;
}

function createSourceFilesFromBundleBuildInfo(bundle: BundleBuildInfo, buildInfoDirectory: string, host: EmitUsingBuildInfoHost): readonly SourceFile[] {
    const jsBundle = Debug.checkDefined(bundle.js);
    const prologueMap = jsBundle.sources?.prologues && arrayToMap(jsBundle.sources.prologues, prologueInfo => prologueInfo.file);
    return bundle.sourceFiles.map((fileName, index) => {
        const prologueInfo = prologueMap?.get(index);
        const statements = prologueInfo?.directives.map(directive => {
            const literal = setTextRange(factory.createStringLiteral(directive.expression.text), directive.expression);
            const statement = setTextRange(factory.createExpressionStatement(literal), directive);
            setParent(literal, statement);
            return statement;
        });
        const eofToken = factory.createToken(SyntaxKind.EndOfFileToken);
        const sourceFile = factory.createSourceFile(statements ?? [], eofToken, NodeFlags.None);
        sourceFile.fileName = getRelativePathFromDirectory(
            host.getCurrentDirectory(),
            getNormalizedAbsolutePath(fileName, buildInfoDirectory),
            !host.useCaseSensitiveFileNames()
        );
        sourceFile.text = prologueInfo?.text ?? "";
        setTextRangePosWidth(sourceFile, 0, prologueInfo?.text.length ?? 0);
        setEachParent(sourceFile.statements, sourceFile);
        setTextRangePosWidth(eofToken, sourceFile.end, 0);
        setParent(eofToken, sourceFile);
        return sourceFile;
    });
}

/** @internal */
export function emitUsingBuildInfo(
    config: ParsedCommandLine,
    host: EmitUsingBuildInfoHost,
    getCommandLine: (ref: ProjectReference) => ParsedCommandLine | undefined,
    customTransformers?: CustomTransformers
): EmitUsingBuildInfoResult {
    const createHash = maybeBind(host, host.createHash);
    const { buildInfoPath, jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath } = getOutputPathsForBundle(config.options, /*forceDtsPaths*/ false);
    let buildInfo: BuildInfo | undefined;
    if (host.getBuildInfo) {
        // If host directly provides buildinfo we can get it directly. This allows host to cache the buildinfo
        buildInfo = host.getBuildInfo(buildInfoPath!, config.options.configFilePath);
    }
    else {
        const buildInfoText = host.readFile(buildInfoPath!);
        if (!buildInfoText) return buildInfoPath!;
        buildInfo = getBuildInfo(buildInfoPath!, buildInfoText);
    }
    if (!buildInfo) return buildInfoPath!;
    if (!buildInfo.bundle || !buildInfo.bundle.js || (declarationFilePath && !buildInfo.bundle.dts)) return buildInfoPath!;

    const jsFileText = host.readFile(Debug.checkDefined(jsFilePath));
    if (!jsFileText) return jsFilePath!;
    // If the jsFileText is not same has what it was created with, tsbuildinfo is stale so dont use it
    if (computeSignature(jsFileText, createHash) !== buildInfo.bundle.js.hash) return jsFilePath!;
    const sourceMapText = sourceMapFilePath && host.readFile(sourceMapFilePath);
    // error if no source map or for now if inline sourcemap
    if ((sourceMapFilePath && !sourceMapText) || config.options.inlineSourceMap) return sourceMapFilePath || "inline sourcemap decoding";
    if (sourceMapFilePath && computeSignature(sourceMapText!, createHash) !== buildInfo.bundle.js.mapHash) return sourceMapFilePath;

    // read declaration text
    const declarationText = declarationFilePath && host.readFile(declarationFilePath);
    if (declarationFilePath && !declarationText) return declarationFilePath;
    if (declarationFilePath && computeSignature(declarationText!, createHash) !== buildInfo.bundle.dts!.hash) return declarationFilePath;
    const declarationMapText = declarationMapPath && host.readFile(declarationMapPath);
    // error if no source map or for now if inline sourcemap
    if ((declarationMapPath && !declarationMapText) || config.options.inlineSourceMap) return declarationMapPath || "inline sourcemap decoding";
    if (declarationMapPath && computeSignature(declarationMapText!, createHash) !== buildInfo.bundle.dts!.mapHash) return declarationMapPath;

    const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath!, host.getCurrentDirectory()));
    const ownPrependInput = createInputFiles(
        jsFileText,
        declarationText!,
        sourceMapFilePath,
        sourceMapText,
        declarationMapPath,
        declarationMapText,
        jsFilePath,
        declarationFilePath,
        buildInfoPath,
        buildInfo,
        /*onlyOwnText*/ true
    );
    const outputFiles: OutputFile[] = [];
    const prependNodes = createPrependNodes(config.projectReferences, getCommandLine, f => host.readFile(f));
    const sourceFilesForJsEmit = createSourceFilesFromBundleBuildInfo(buildInfo.bundle, buildInfoDirectory, host);
    let changedDtsText: string | undefined;
    let changedDtsData: WriteFileCallbackData | undefined;
    const emitHost: EmitHost = {
        getPrependNodes: memoize(() => [...prependNodes, ownPrependInput]),
        getCanonicalFileName: host.getCanonicalFileName,
        getCommonSourceDirectory: () => getNormalizedAbsolutePath(buildInfo!.bundle!.commonSourceDirectory, buildInfoDirectory),
        getCompilerOptions: () => config.options,
        getCurrentDirectory: () => host.getCurrentDirectory(),
        getNewLine: () => host.getNewLine(),
        getSourceFile: returnUndefined,
        getSourceFileByPath: returnUndefined,
        getSourceFiles: () => sourceFilesForJsEmit,
        getLibFileFromReference: notImplemented,
        isSourceFileFromExternalLibrary: returnFalse,
        getResolvedProjectReferenceToRedirect: returnUndefined,
        getProjectReferenceRedirect: returnUndefined,
        isSourceOfProjectReferenceRedirect: returnFalse,
        writeFile: (name, text, writeByteOrderMark, _onError, _sourceFiles, data) => {
            switch (name) {
                case jsFilePath:
                    if (jsFileText === text) return;
                    break;
                case sourceMapFilePath:
                    if (sourceMapText === text) return;
                    break;
                case buildInfoPath:
                    const newBuildInfo = data!.buildInfo!;
                    newBuildInfo.program = buildInfo!.program;
                    if (newBuildInfo.program && changedDtsText !== undefined && config.options.composite) {
                        // Update the output signature
                        (newBuildInfo.program as ProgramBundleEmitBuildInfo).outSignature = computeSignature(changedDtsText, createHash, changedDtsData);
                    }
                    // Update sourceFileInfo
                    const { js, dts, sourceFiles } = buildInfo!.bundle!;
                    newBuildInfo.bundle!.js!.sources = js!.sources;
                    if (dts) {
                        newBuildInfo.bundle!.dts!.sources = dts.sources;
                    }
                    newBuildInfo.bundle!.sourceFiles = sourceFiles;
                    outputFiles.push({ name, text: getBuildInfoText(newBuildInfo), writeByteOrderMark, buildInfo: newBuildInfo });
                    return;
                case declarationFilePath:
                    if (declarationText === text) return;
                    changedDtsText = text;
                    changedDtsData = data;
                    break;
                case declarationMapPath:
                    if (declarationMapText === text) return;
                    break;
                default:
                    Debug.fail(`Unexpected path: ${name}`);
            }
            outputFiles.push({ name, text, writeByteOrderMark });
        },
        isEmitBlocked: returnFalse,
        readFile: f => host.readFile(f),
        fileExists: f => host.fileExists(f),
        useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
        getProgramBuildInfo: returnUndefined,
        getSourceFileFromReference: returnUndefined,
        redirectTargetsMap: createMultiMap(),
        getFileIncludeReasons: notImplemented,
        createHash,
    };
    emitFiles(
        notImplementedResolver,
        emitHost,
        /*targetSourceFile*/ undefined,
        getTransformers(config.options, customTransformers)
    );
    return outputFiles;
}

const enum PipelinePhase {
    Notification,
    Substitution,
    Comments,
    SourceMaps,
    Emit,
}

/** @internal */
export const createPrinterWithDefaults = memoize(() => createPrinter({}));

/** @internal */
export const createPrinterWithRemoveComments = memoize(() => createPrinter({ removeComments: true }));

/** @internal */
export const createPrinterWithRemoveCommentsNeverAsciiEscape = memoize(() => createPrinter({ removeComments: true, neverAsciiEscape: true }));

/** @internal */
export const createPrinterWithRemoveCommentsOmitTrailingSemicolon = memoize(() => createPrinter({ removeComments: true, omitTrailingSemicolon: true }));

export function createPrinter(printerOptions: PrinterOptions = {}, handlers: PrintHandlers = {}): Printer {
    var {
        hasGlobalName,
        onEmitNode = noEmitNotification,
        isEmitNotificationEnabled,
        substituteNode = noEmitSubstitution,
        onBeforeEmitNode,
        onAfterEmitNode,
        onBeforeEmitNodeArray,
        onAfterEmitNodeArray,
        onBeforeEmitToken,
        onAfterEmitToken
    } = handlers;

    var extendedDiagnostics = !!printerOptions.extendedDiagnostics;
    var newLine = getNewLineCharacter(printerOptions);
    var moduleKind = getEmitModuleKind(printerOptions);
    var bundledHelpers = new Map<string, boolean>();
    var removeCommentsCollection: string[] | undefined;
    var universalRemoveCommentsCollection: RegExp[] | undefined;

    var currentSourceFile: SourceFile | undefined;
    var nodeIdToGeneratedName: string[]; // Map of generated names for specific nodes.
    var autoGeneratedIdToGeneratedName: string[]; // Map of generated names for temp and loop variables.
    var generatedNames: Set<string>; // Set of names generated by the NameGenerator.
    var formattedNameTempFlagsStack: (ESMap<string, TempFlags> | undefined)[];
    var formattedNameTempFlags: ESMap<string, TempFlags> | undefined;
    var privateNameTempFlagsStack: TempFlags[]; // Stack of enclosing name generation scopes.
    var privateNameTempFlags: TempFlags; // TempFlags for the current name generation scope.
    var tempFlagsStack: TempFlags[]; // Stack of enclosing name generation scopes.
    var tempFlags: TempFlags; // TempFlags for the current name generation scope.
    var reservedNamesStack: Set<string>[]; // Stack of TempFlags reserved in enclosing name generation scopes.
    var reservedNames: Set<string>; // TempFlags to reserve in nested name generation scopes.
    var preserveSourceNewlines = printerOptions.preserveSourceNewlines; // Can be overridden inside nodes with the `IgnoreSourceNewlines` emit flag.
    var nextListElementPos: number | undefined; // See comment in `getLeadingLineTerminatorCount`.

    var writer: EmitTextWriter;
    var ownWriter: EmitTextWriter; // Reusable `EmitTextWriter` for basic printing.
    var write = writeBase;
    var isOwnFileEmit: boolean;
    var bundleFileInfo = printerOptions.writeBundleFileInfo ? { sections: [] } as BundleFileInfo : undefined;
    var relativeToBuildInfo = bundleFileInfo ? Debug.checkDefined(printerOptions.relativeToBuildInfo) : undefined;
    var recordInternalSection = printerOptions.recordInternalSection;
    var sourceFileTextPos = 0;
    var sourceFileTextKind: BundleFileTextLikeKind = BundleFileSectionKind.Text;

    // Source Maps
    var sourceMapsDisabled = true;
    var sourceMapGenerator: SourceMapGenerator | undefined;
    var sourceMapSource: SourceMapSource;
    var sourceMapSourceIndex = -1;
    var mostRecentlyAddedSourceMapSource: SourceMapSource;
    var mostRecentlyAddedSourceMapSourceIndex = -1;

    // Comments
    var containerPos = -1;
    var containerEnd = -1;
    var declarationListContainerEnd = -1;
    var currentLineMap: readonly number[] | undefined;
    var detachedCommentsInfo: { nodePos: number, detachedCommentEndPos: number }[] | undefined;
    var hasWrittenComment = false;
    var commentsDisabled = !!printerOptions.removeComments;
    var lastSubstitution: Node | undefined;
    var currentParenthesizerRule: ((node: Node) => Node) | undefined;
    var { enter: enterComment, exit: exitComment } = performance.createTimerIf(extendedDiagnostics, "commentTime", "beforeComment", "afterComment");
    var parenthesizer = factory.parenthesizer;
    var typeArgumentParenthesizerRuleSelector: OrdinalParentheizerRuleSelector<Node> = {
        select: index => index === 0 ? parenthesizer.parenthesizeLeadingTypeArgument : undefined
    };
    var emitBinaryExpression = createEmitBinaryExpression();
    /* eslint-enable no-var */

    reset();
    return {
        // public API
        printNode,
        printList,
        printFile,
        printBundle,

        // internal API
        writeNode,
        writeList,
        writeFile,
        writeBundle,
        bundleFileInfo
    };

    function printNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string {
        switch (hint) {
            case EmitHint.SourceFile:
                Debug.assert(isSourceFile(node), "Expected a SourceFile node.");
                break;
            case EmitHint.IdentifierName:
                Debug.assert(isIdentifier(node), "Expected an Identifier node.");
                break;
            case EmitHint.Expression:
                Debug.assert(isExpression(node), "Expected an Expression node.");
                break;
        }
        switch (node.kind) {
            case SyntaxKind.SourceFile: return printFile(node as SourceFile);
            case SyntaxKind.Bundle: return printBundle(node as Bundle);
            case SyntaxKind.UnparsedSource: return printUnparsedSource(node as UnparsedSource);
        }
        writeNode(hint, node, sourceFile, beginPrint());
        return endPrint();
    }

    function printList<T extends Node>(format: ListFormat, nodes: NodeArray<T>, sourceFile: SourceFile) {
        writeList(format, nodes, sourceFile, beginPrint());
        return endPrint();
    }

    function printBundle(bundle: Bundle): string {
        writeBundle(bundle, beginPrint(), /*sourceMapEmitter*/ undefined);
        return endPrint();
    }

    function printFile(sourceFile: SourceFile): string {
        writeFile(sourceFile, beginPrint(), /*sourceMapEmitter*/ undefined);
        return endPrint();
    }

    function printUnparsedSource(unparsed: UnparsedSource): string {
        writeUnparsedSource(unparsed, beginPrint());
        return endPrint();
    }

    /**
     * If `sourceFile` is `undefined`, `node` must be a synthesized `TypeNode`.
     */
    function writeNode(hint: EmitHint, node: TypeNode, sourceFile: undefined, output: EmitTextWriter): void;
    function writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile, output: EmitTextWriter): void;
    function writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined, output: EmitTextWriter) {
        const previousWriter = writer;
        setWriter(output, /*_sourceMapGenerator*/ undefined);
        print(hint, node, sourceFile);
        reset();
        writer = previousWriter;
    }

    function writeList<T extends Node>(format: ListFormat, nodes: NodeArray<T>, sourceFile: SourceFile | undefined, output: EmitTextWriter) {
        const previousWriter = writer;
        setWriter(output, /*_sourceMapGenerator*/ undefined);
        if (sourceFile) {
            setSourceFile(sourceFile);
        }
        emitList(/*parentNode*/ undefined, nodes, format);
        reset();
        writer = previousWriter;
    }

    function getTextPosWithWriteLine() {
        return writer.getTextPosWithWriteLine ? writer.getTextPosWithWriteLine() : writer.getTextPos();
    }

    function updateOrPushBundleFileTextLike(pos: number, end: number, kind: BundleFileTextLikeKind) {
        const last = lastOrUndefined(bundleFileInfo!.sections);
        if (last && last.kind === kind) {
            last.end = end;
        }
        else {
            bundleFileInfo!.sections.push({ pos, end, kind });
        }
    }

    function recordBundleFileInternalSectionStart(node: Node) {
        if (recordInternalSection &&
            bundleFileInfo &&
            currentSourceFile &&
            (isDeclaration(node) || isVariableStatement(node)) &&
            isInternalDeclaration(node, currentSourceFile) &&
            sourceFileTextKind !== BundleFileSectionKind.Internal) {
            const prevSourceFileTextKind = sourceFileTextKind;
            recordBundleFileTextLikeSection(writer.getTextPos());
            sourceFileTextPos = getTextPosWithWriteLine();
            sourceFileTextKind = BundleFileSectionKind.Internal;
            return prevSourceFileTextKind;
        }
        return undefined;
    }

    function recordBundleFileInternalSectionEnd(prevSourceFileTextKind: ReturnType<typeof recordBundleFileInternalSectionStart>) {
        if (prevSourceFileTextKind) {
            recordBundleFileTextLikeSection(writer.getTextPos());
            sourceFileTextPos = getTextPosWithWriteLine();
            sourceFileTextKind = prevSourceFileTextKind;
        }
    }

    function recordBundleFileTextLikeSection(end: number) {
        if (sourceFileTextPos < end) {
            updateOrPushBundleFileTextLike(sourceFileTextPos, end, sourceFileTextKind);
            return true;
        }
        return false;
    }

    function writeBundle(bundle: Bundle, output: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined) {
        isOwnFileEmit = false;
        const previousWriter = writer;
        setWriter(output, sourceMapGenerator);
        emitShebangIfNeeded(bundle);
        emitPrologueDirectivesIfNeeded(bundle);
        emitHelpers(bundle);
        emitSyntheticTripleSlashReferencesIfNeeded(bundle);

        for (const prepend of bundle.prepends) {
            writeLine();
            const pos = writer.getTextPos();
            const savedSections = bundleFileInfo && bundleFileInfo.sections;
            if (savedSections) bundleFileInfo!.sections = [];
            print(EmitHint.Unspecified, prepend, /*sourceFile*/ undefined);
            if (bundleFileInfo) {
                const newSections = bundleFileInfo.sections;
                bundleFileInfo.sections = savedSections!;
                if (prepend.oldFileOfCurrentEmit) bundleFileInfo.sections.push(...newSections);
                else {
                    newSections.forEach(section => Debug.assert(isBundleFileTextLike(section)));
                    bundleFileInfo.sections.push({
                        pos,
                        end: writer.getTextPos(),
                        kind: BundleFileSectionKind.Prepend,
                        data: relativeToBuildInfo!((prepend as UnparsedSource).fileName),
                        texts: newSections as BundleFileTextLike[]
                    });
                }
            }
        }

        sourceFileTextPos = getTextPosWithWriteLine();
        for (const sourceFile of bundle.sourceFiles) {
            print(EmitHint.SourceFile, sourceFile, sourceFile);
        }
        if (bundleFileInfo && bundle.sourceFiles.length) {
            const end = writer.getTextPos();
            if (recordBundleFileTextLikeSection(end)) {
                // Store prologues
                const prologues = getPrologueDirectivesFromBundledSourceFiles(bundle);
                if (prologues) {
                    if (!bundleFileInfo.sources) bundleFileInfo.sources = {};
                    bundleFileInfo.sources.prologues = prologues;
                }

                // Store helpes
                const helpers = getHelpersFromBundledSourceFiles(bundle);
                if (helpers) {
                    if (!bundleFileInfo.sources) bundleFileInfo.sources = {};
                    bundleFileInfo.sources.helpers = helpers;
                }
            }
        }

        reset();
        writer = previousWriter;
    }

    function writeUnparsedSource(unparsed: UnparsedSource, output: EmitTextWriter) {
        const previousWriter = writer;
        setWriter(output, /*_sourceMapGenerator*/ undefined);
        print(EmitHint.Unspecified, unparsed, /*sourceFile*/ undefined);
        reset();
        writer = previousWriter;
    }

    function writeFile(sourceFile: SourceFile, output: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined) {
        //@ts-ignore
        removeCommentsCollection = sourceFile?.reservedComments;
        //@ts-ignore
        universalRemoveCommentsCollection = sourceFile?.universalReservedComments;
        isOwnFileEmit = true;
        const previousWriter = writer;
        setWriter(output, sourceMapGenerator);
        emitShebangIfNeeded(sourceFile);
        emitPrologueDirectivesIfNeeded(sourceFile);
        print(EmitHint.SourceFile, sourceFile, sourceFile);
        reset();
        writer = previousWriter;
    }

    function beginPrint() {
        return ownWriter || (ownWriter = createTextWriter(newLine));
    }

    function endPrint() {
        const text = ownWriter.getText();
        ownWriter.clear();
        return text;
    }

    function print(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined) {
        if (sourceFile) {
            setSourceFile(sourceFile);
        }

        pipelineEmit(hint, node, /*parenthesizerRule*/ undefined);
    }

    function setSourceFile(sourceFile: SourceFile | undefined) {
        currentSourceFile = sourceFile;
        currentLineMap = undefined;
        detachedCommentsInfo = undefined;
        if (sourceFile) {
            setSourceMapSource(sourceFile);
        }
    }

    function setWriter(_writer: EmitTextWriter | undefined, _sourceMapGenerator: SourceMapGenerator | undefined) {
        if (_writer && printerOptions.omitTrailingSemicolon) {
            _writer = getTrailingSemicolonDeferringWriter(_writer);
        }

        writer = _writer!; // TODO: GH#18217
        sourceMapGenerator = _sourceMapGenerator;
        sourceMapsDisabled = !writer || !sourceMapGenerator;
    }

    function reset() {
        nodeIdToGeneratedName = [];
        autoGeneratedIdToGeneratedName = [];
        generatedNames = new Set();
        formattedNameTempFlagsStack = [];
        formattedNameTempFlags = new Map();
        privateNameTempFlagsStack = [];
        privateNameTempFlags = TempFlags.Auto;
        tempFlagsStack = [];
        tempFlags = TempFlags.Auto;
        reservedNamesStack = [];
        currentSourceFile = undefined;
        currentLineMap = undefined;
        detachedCommentsInfo = undefined;
        setWriter(/*output*/ undefined, /*_sourceMapGenerator*/ undefined);
    }

    function getCurrentLineMap() {
        return currentLineMap || (currentLineMap = getLineStarts(Debug.checkDefined(currentSourceFile)));
    }

    function emit(node: Node, parenthesizerRule?: (node: Node) => Node): void;
    function emit(node: Node | undefined, parenthesizerRule?: (node: Node) => Node): void;
    function emit(node: Node | undefined, parenthesizerRule?: (node: Node) => Node) {
        if (node === undefined) return;
        const prevSourceFileTextKind = recordBundleFileInternalSectionStart(node);
        pipelineEmit(EmitHint.Unspecified, node, parenthesizerRule);
        recordBundleFileInternalSectionEnd(prevSourceFileTextKind);
    }

    function emitIdentifierName(node: Identifier): void;
    function emitIdentifierName(node: Identifier | undefined): void;
    function emitIdentifierName(node: Identifier | undefined) {
        if (node === undefined) return;
        pipelineEmit(EmitHint.IdentifierName, node, /*parenthesizerRule*/ undefined);
    }

    function emitExpression(node: Expression, parenthesizerRule?: (node: Expression) => Expression): void;
    function emitExpression(node: Expression | undefined, parenthesizerRule?: (node: Expression) => Expression): void;
    function emitExpression(node: Expression | undefined, parenthesizerRule?: (node: Expression) => Expression) {
        if (node === undefined) return;
        pipelineEmit(EmitHint.Expression, node, parenthesizerRule);
    }

    function emitJsxAttributeValue(node: StringLiteral | JsxExpression): void {
        pipelineEmit(isStringLiteral(node) ? EmitHint.JsxAttributeValue : EmitHint.Unspecified, node);
    }

    function beforeEmitNode(node: Node) {
        if (preserveSourceNewlines && (getEmitFlags(node) & EmitFlags.IgnoreSourceNewlines)) {
            preserveSourceNewlines = false;
        }
    }

    function afterEmitNode(savedPreserveSourceNewlines: boolean | undefined) {
        preserveSourceNewlines = savedPreserveSourceNewlines;
    }

    function pipelineEmit(emitHint: EmitHint, node: Node, parenthesizerRule?: (node: Node) => Node) {
        currentParenthesizerRule = parenthesizerRule;
        const pipelinePhase = getPipelinePhase(PipelinePhase.Notification, emitHint, node);
        pipelinePhase(emitHint, node);
        currentParenthesizerRule = undefined;
    }

    function shouldEmitComments(node: Node) {
        return !commentsDisabled && !isSourceFile(node);
    }

    function shouldEmitSourceMaps(node: Node) {
        return !sourceMapsDisabled &&
            !isSourceFile(node) &&
            !isInJsonFile(node) &&
            !isUnparsedSource(node) &&
            !isUnparsedPrepend(node);
    }

    function getPipelinePhase(phase: PipelinePhase, emitHint: EmitHint, node: Node) {
        switch (phase) {
            case PipelinePhase.Notification:
                if (onEmitNode !== noEmitNotification && (!isEmitNotificationEnabled || isEmitNotificationEnabled(node))) {
                    return pipelineEmitWithNotification;
                }
                // falls through
            case PipelinePhase.Substitution:
                if (substituteNode !== noEmitSubstitution && (lastSubstitution = substituteNode(emitHint, node) || node) !== node) {
                    if (currentParenthesizerRule) {
                        lastSubstitution = currentParenthesizerRule(lastSubstitution);
                    }
                    return pipelineEmitWithSubstitution;
                }
                // falls through
            case PipelinePhase.Comments:
                if (shouldEmitComments(node)) {
                    return pipelineEmitWithComments;
                }
                // falls through
            case PipelinePhase.SourceMaps:
                if (shouldEmitSourceMaps(node)) {
                    return pipelineEmitWithSourceMaps;
                }
                // falls through
            case PipelinePhase.Emit:
                return pipelineEmitWithHint;
            default:
                return Debug.assertNever(phase);
        }
    }

    function getNextPipelinePhase(currentPhase: PipelinePhase, emitHint: EmitHint, node: Node) {
        return getPipelinePhase(currentPhase + 1, emitHint, node);
    }

    function pipelineEmitWithNotification(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Notification, hint, node);
        onEmitNode(hint, node, pipelinePhase);
    }

    function pipelineEmitWithHint(hint: EmitHint, node: Node): void {
        onBeforeEmitNode?.(node);
        if (preserveSourceNewlines) {
            const savedPreserveSourceNewlines = preserveSourceNewlines;
            beforeEmitNode(node);
            pipelineEmitWithHintWorker(hint, node);
            afterEmitNode(savedPreserveSourceNewlines);
        }
        else {
            pipelineEmitWithHintWorker(hint, node);
        }
        onAfterEmitNode?.(node);
        // clear the parenthesizer rule as we ascend
        currentParenthesizerRule = undefined;
    }

    function pipelineEmitWithHintWorker(hint: EmitHint, node: Node, allowSnippets = true): void {
        if (allowSnippets) {
            const snippet = getSnippetElement(node);
            if (snippet) {
                return emitSnippetNode(hint, node, snippet);
            }
        }
        if (hint === EmitHint.SourceFile) return emitSourceFile(cast(node, isSourceFile));
        if (hint === EmitHint.IdentifierName) return emitIdentifier(cast(node, isIdentifier));
        if (hint === EmitHint.JsxAttributeValue) return emitLiteral(cast(node, isStringLiteral), /*jsxAttributeEscape*/ true);
        if (hint === EmitHint.MappedTypeParameter) return emitMappedTypeParameter(cast(node, isTypeParameterDeclaration));
        if (hint === EmitHint.EmbeddedStatement) {
            Debug.assertNode(node, isEmptyStatement);
            return emitEmptyStatement(/*isEmbeddedStatement*/ true);
        }
        if (hint === EmitHint.Unspecified) {
            switch (node.kind) {
                // Pseudo-literals
                case SyntaxKind.TemplateHead:
                case SyntaxKind.TemplateMiddle:
                case SyntaxKind.TemplateTail:
                    return emitLiteral(node as LiteralExpression, /*jsxAttributeEscape*/ false);

                // Identifiers
                case SyntaxKind.Identifier:
                    return emitIdentifier(node as Identifier);

                // PrivateIdentifiers
                case SyntaxKind.PrivateIdentifier:
                    return emitPrivateIdentifier(node as PrivateIdentifier);

                // Parse tree nodes
                // Names
                case SyntaxKind.QualifiedName:
                    return emitQualifiedName(node as QualifiedName);
                case SyntaxKind.ComputedPropertyName:
                    return emitComputedPropertyName(node as ComputedPropertyName);

                // Signature elements
                case SyntaxKind.TypeParameter:
                    return emitTypeParameter(node as TypeParameterDeclaration);
                case SyntaxKind.Parameter:
                    return emitParameter(node as ParameterDeclaration);
                case SyntaxKind.Decorator:
                    return emitDecorator(node as Decorator);

                // Type members
                case SyntaxKind.PropertySignature:
                    return emitPropertySignature(node as PropertySignature);
                case SyntaxKind.PropertyDeclaration:
                    return emitPropertyDeclaration(node as PropertyDeclaration);
                case SyntaxKind.AnnotationPropertyDeclaration:
                    return emitAnnotationPropertyDeclaration(node as AnnotationPropertyDeclaration);
                case SyntaxKind.MethodSignature:
                    return emitMethodSignature(node as MethodSignature);
                case SyntaxKind.MethodDeclaration:
                    return emitMethodDeclaration(node as MethodDeclaration);
                case SyntaxKind.ClassStaticBlockDeclaration:
                    return emitClassStaticBlockDeclaration(node as ClassStaticBlockDeclaration);
                case SyntaxKind.Constructor:
                    return emitConstructor(node as ConstructorDeclaration);
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return emitAccessorDeclaration(node as AccessorDeclaration);
                case SyntaxKind.CallSignature:
                    return emitCallSignature(node as CallSignatureDeclaration);
                case SyntaxKind.ConstructSignature:
                    return emitConstructSignature(node as ConstructSignatureDeclaration);
                case SyntaxKind.IndexSignature:
                    return emitIndexSignature(node as IndexSignatureDeclaration);

                // Types
                case SyntaxKind.TypePredicate:
                    return emitTypePredicate(node as TypePredicateNode);
                case SyntaxKind.TypeReference:
                    return emitTypeReference(node as TypeReferenceNode);
                case SyntaxKind.FunctionType:
                    return emitFunctionType(node as FunctionTypeNode);
                case SyntaxKind.ConstructorType:
                    return emitConstructorType(node as ConstructorTypeNode);
                case SyntaxKind.TypeQuery:
                    return emitTypeQuery(node as TypeQueryNode);
                case SyntaxKind.TypeLiteral:
                    return emitTypeLiteral(node as TypeLiteralNode);
                case SyntaxKind.ArrayType:
                    return emitArrayType(node as ArrayTypeNode);
                case SyntaxKind.TupleType:
                    return emitTupleType(node as TupleTypeNode);
                case SyntaxKind.OptionalType:
                    return emitOptionalType(node as OptionalTypeNode);
                // SyntaxKind.RestType is handled below
                case SyntaxKind.UnionType:
                    return emitUnionType(node as UnionTypeNode);
                case SyntaxKind.IntersectionType:
                    return emitIntersectionType(node as IntersectionTypeNode);
                case SyntaxKind.ConditionalType:
                    return emitConditionalType(node as ConditionalTypeNode);
                case SyntaxKind.InferType:
                    return emitInferType(node as InferTypeNode);
                case SyntaxKind.ParenthesizedType:
                    return emitParenthesizedType(node as ParenthesizedTypeNode);
                case SyntaxKind.ExpressionWithTypeArguments:
                    return emitExpressionWithTypeArguments(node as ExpressionWithTypeArguments);
                case SyntaxKind.ThisType:
                    return emitThisType();
                case SyntaxKind.TypeOperator:
                    return emitTypeOperator(node as TypeOperatorNode);
                case SyntaxKind.IndexedAccessType:
                    return emitIndexedAccessType(node as IndexedAccessTypeNode);
                case SyntaxKind.MappedType:
                    return emitMappedType(node as MappedTypeNode);
                case SyntaxKind.LiteralType:
                    return emitLiteralType(node as LiteralTypeNode);
                case SyntaxKind.NamedTupleMember:
                    return emitNamedTupleMember(node as NamedTupleMember);
                case SyntaxKind.TemplateLiteralType:
                    return emitTemplateType(node as TemplateLiteralTypeNode);
                case SyntaxKind.TemplateLiteralTypeSpan:
                    return emitTemplateTypeSpan(node as TemplateLiteralTypeSpan);
                case SyntaxKind.ImportType:
                    return emitImportTypeNode(node as ImportTypeNode);

                // Binding patterns
                case SyntaxKind.ObjectBindingPattern:
                    return emitObjectBindingPattern(node as ObjectBindingPattern);
                case SyntaxKind.ArrayBindingPattern:
                    return emitArrayBindingPattern(node as ArrayBindingPattern);
                case SyntaxKind.BindingElement:
                    return emitBindingElement(node as BindingElement);

                // Misc
                case SyntaxKind.TemplateSpan:
                    return emitTemplateSpan(node as TemplateSpan);
                case SyntaxKind.SemicolonClassElement:
                    return emitSemicolonClassElement();

                // Statements
                case SyntaxKind.Block:
                    return emitBlock(node as Block);
                case SyntaxKind.VariableStatement:
                    return emitVariableStatement(node as VariableStatement);
                case SyntaxKind.EmptyStatement:
                    return emitEmptyStatement(/*isEmbeddedStatement*/ false);
                case SyntaxKind.ExpressionStatement:
                    return emitExpressionStatement(node as ExpressionStatement);
                case SyntaxKind.IfStatement:
                    return emitIfStatement(node as IfStatement);
                case SyntaxKind.DoStatement:
                    return emitDoStatement(node as DoStatement);
                case SyntaxKind.WhileStatement:
                    return emitWhileStatement(node as WhileStatement);
                case SyntaxKind.ForStatement:
                    return emitForStatement(node as ForStatement);
                case SyntaxKind.ForInStatement:
                    return emitForInStatement(node as ForInStatement);
                case SyntaxKind.ForOfStatement:
                    return emitForOfStatement(node as ForOfStatement);
                case SyntaxKind.ContinueStatement:
                    return emitContinueStatement(node as ContinueStatement);
                case SyntaxKind.BreakStatement:
                    return emitBreakStatement(node as BreakStatement);
                case SyntaxKind.ReturnStatement:
                    return emitReturnStatement(node as ReturnStatement);
                case SyntaxKind.WithStatement:
                    return emitWithStatement(node as WithStatement);
                case SyntaxKind.SwitchStatement:
                    return emitSwitchStatement(node as SwitchStatement);
                case SyntaxKind.LabeledStatement:
                    return emitLabeledStatement(node as LabeledStatement);
                case SyntaxKind.ThrowStatement:
                    return emitThrowStatement(node as ThrowStatement);
                case SyntaxKind.TryStatement:
                    return emitTryStatement(node as TryStatement);
                case SyntaxKind.DebuggerStatement:
                    return emitDebuggerStatement(node as DebuggerStatement);

                // Declarations
                case SyntaxKind.VariableDeclaration:
                    return emitVariableDeclaration(node as VariableDeclaration);
                case SyntaxKind.VariableDeclarationList:
                    return emitVariableDeclarationList(node as VariableDeclarationList);
                case SyntaxKind.FunctionDeclaration:
                    return emitFunctionDeclaration(node as FunctionDeclaration);
                case SyntaxKind.ClassDeclaration:
                    return emitClassOrStructDeclaration(node as ClassDeclaration);
                case SyntaxKind.StructDeclaration:
                    return emitClassOrStructDeclaration(<StructDeclaration>node);
                case SyntaxKind.AnnotationDeclaration:
                    return emitAnnotationDeclaration(node as AnnotationDeclaration);
                case SyntaxKind.InterfaceDeclaration:
                    return emitInterfaceDeclaration(node as InterfaceDeclaration);
                case SyntaxKind.TypeAliasDeclaration:
                    return emitTypeAliasDeclaration(node as TypeAliasDeclaration);
                case SyntaxKind.EnumDeclaration:
                    return emitEnumDeclaration(node as EnumDeclaration);
                case SyntaxKind.ModuleDeclaration:
                    return emitModuleDeclaration(node as ModuleDeclaration);
                case SyntaxKind.ModuleBlock:
                    return emitModuleBlock(node as ModuleBlock);
                case SyntaxKind.CaseBlock:
                    return emitCaseBlock(node as CaseBlock);
                case SyntaxKind.NamespaceExportDeclaration:
                    return emitNamespaceExportDeclaration(node as NamespaceExportDeclaration);
                case SyntaxKind.ImportEqualsDeclaration:
                    return emitImportEqualsDeclaration(node as ImportEqualsDeclaration);
                case SyntaxKind.ImportDeclaration:
                    return emitImportDeclaration(node as ImportDeclaration);
                case SyntaxKind.ImportClause:
                    return emitImportClause(node as ImportClause);
                case SyntaxKind.NamespaceImport:
                    return emitNamespaceImport(node as NamespaceImport);
                case SyntaxKind.NamespaceExport:
                    return emitNamespaceExport(node as NamespaceExport);
                case SyntaxKind.NamedImports:
                    return emitNamedImports(node as NamedImports);
                case SyntaxKind.ImportSpecifier:
                    return emitImportSpecifier(node as ImportSpecifier);
                case SyntaxKind.ExportAssignment:
                    return emitExportAssignment(node as ExportAssignment);
                case SyntaxKind.ExportDeclaration:
                    return emitExportDeclaration(node as ExportDeclaration);
                case SyntaxKind.NamedExports:
                    return emitNamedExports(node as NamedExports);
                case SyntaxKind.ExportSpecifier:
                    return emitExportSpecifier(node as ExportSpecifier);
                case SyntaxKind.AssertClause:
                    return emitAssertClause(node as AssertClause);
                case SyntaxKind.AssertEntry:
                    return emitAssertEntry(node as AssertEntry);
                case SyntaxKind.MissingDeclaration:
                    return;

                // Module references
                case SyntaxKind.ExternalModuleReference:
                    return emitExternalModuleReference(node as ExternalModuleReference);

                // JSX (non-expression)
                case SyntaxKind.JsxText:
                    return emitJsxText(node as JsxText);
                case SyntaxKind.JsxOpeningElement:
                case SyntaxKind.JsxOpeningFragment:
                    return emitJsxOpeningElementOrFragment(node as JsxOpeningElement);
                case SyntaxKind.JsxClosingElement:
                case SyntaxKind.JsxClosingFragment:
                    return emitJsxClosingElementOrFragment(node as JsxClosingElement);
                case SyntaxKind.JsxAttribute:
                    return emitJsxAttribute(node as JsxAttribute);
                case SyntaxKind.JsxAttributes:
                    return emitJsxAttributes(node as JsxAttributes);
                case SyntaxKind.JsxSpreadAttribute:
                    return emitJsxSpreadAttribute(node as JsxSpreadAttribute);
                case SyntaxKind.JsxExpression:
                    return emitJsxExpression(node as JsxExpression);

                // Clauses
                case SyntaxKind.CaseClause:
                    return emitCaseClause(node as CaseClause);
                case SyntaxKind.DefaultClause:
                    return emitDefaultClause(node as DefaultClause);
                case SyntaxKind.HeritageClause:
                    return emitHeritageClause(node as HeritageClause);
                case SyntaxKind.CatchClause:
                    return emitCatchClause(node as CatchClause);

                // Property assignments
                case SyntaxKind.PropertyAssignment:
                    return emitPropertyAssignment(node as PropertyAssignment);
                case SyntaxKind.ShorthandPropertyAssignment:
                    return emitShorthandPropertyAssignment(node as ShorthandPropertyAssignment);
                case SyntaxKind.SpreadAssignment:
                    return emitSpreadAssignment(node as SpreadAssignment);

                // Enum
                case SyntaxKind.EnumMember:
                    return emitEnumMember(node as EnumMember);

                // Unparsed
                case SyntaxKind.UnparsedPrologue:
                    return writeUnparsedNode(node as UnparsedNode);
                case SyntaxKind.UnparsedSource:
                case SyntaxKind.UnparsedPrepend:
                    return emitUnparsedSourceOrPrepend(node as UnparsedSource);
                case SyntaxKind.UnparsedText:
                case SyntaxKind.UnparsedInternalText:
                    return emitUnparsedTextLike(node as UnparsedTextLike);
                case SyntaxKind.UnparsedSyntheticReference:
                    return emitUnparsedSyntheticReference(node as UnparsedSyntheticReference);

                // Top-level nodes
                case SyntaxKind.SourceFile:
                    return emitSourceFile(node as SourceFile);
                case SyntaxKind.Bundle:
                    return Debug.fail("Bundles should be printed using printBundle");
                // SyntaxKind.UnparsedSource (handled above)
                case SyntaxKind.InputFiles:
                    return Debug.fail("InputFiles should not be printed");

                // JSDoc nodes (only used in codefixes currently)
                case SyntaxKind.JSDocTypeExpression:
                    return emitJSDocTypeExpression(node as JSDocTypeExpression);
                case SyntaxKind.JSDocNameReference:
                    return emitJSDocNameReference(node as JSDocNameReference);
                case SyntaxKind.JSDocAllType:
                    return writePunctuation("*");
                case SyntaxKind.JSDocUnknownType:
                    return writePunctuation("?");
                case SyntaxKind.JSDocNullableType:
                    return emitJSDocNullableType(node as JSDocNullableType);
                case SyntaxKind.JSDocNonNullableType:
                    return emitJSDocNonNullableType(node as JSDocNonNullableType);
                case SyntaxKind.JSDocOptionalType:
                    return emitJSDocOptionalType(node as JSDocOptionalType);
                case SyntaxKind.JSDocFunctionType:
                    return emitJSDocFunctionType(node as JSDocFunctionType);
                case SyntaxKind.RestType:
                case SyntaxKind.JSDocVariadicType:
                    return emitRestOrJSDocVariadicType(node as RestTypeNode | JSDocVariadicType);
                case SyntaxKind.JSDocNamepathType:
                    return;
                case SyntaxKind.JSDoc:
                    return emitJSDoc(node as JSDoc);
                case SyntaxKind.JSDocTypeLiteral:
                    return emitJSDocTypeLiteral(node as JSDocTypeLiteral);
                case SyntaxKind.JSDocSignature:
                    return emitJSDocSignature(node as JSDocSignature);
                case SyntaxKind.JSDocTag:
                case SyntaxKind.JSDocClassTag:
                case SyntaxKind.JSDocOverrideTag:
                    return emitJSDocSimpleTag(node as JSDocTag);
                case SyntaxKind.JSDocAugmentsTag:
                case SyntaxKind.JSDocImplementsTag:
                    return emitJSDocHeritageTag(node as JSDocImplementsTag | JSDocAugmentsTag);
                case SyntaxKind.JSDocAuthorTag:
                case SyntaxKind.JSDocDeprecatedTag:
                    return;
                // SyntaxKind.JSDocClassTag (see JSDocTag, above)
                case SyntaxKind.JSDocPublicTag:
                case SyntaxKind.JSDocPrivateTag:
                case SyntaxKind.JSDocProtectedTag:
                case SyntaxKind.JSDocReadonlyTag:
                    return;
                case SyntaxKind.JSDocCallbackTag:
                    return emitJSDocCallbackTag(node as JSDocCallbackTag);
                // SyntaxKind.JSDocEnumTag (see below)
                case SyntaxKind.JSDocParameterTag:
                case SyntaxKind.JSDocPropertyTag:
                    return emitJSDocPropertyLikeTag(node as JSDocPropertyLikeTag);
                case SyntaxKind.JSDocEnumTag:
                case SyntaxKind.JSDocReturnTag:
                case SyntaxKind.JSDocThisTag:
                case SyntaxKind.JSDocTypeTag:
                    return emitJSDocSimpleTypedTag(node as JSDocTypeTag);
                case SyntaxKind.JSDocTemplateTag:
                    return emitJSDocTemplateTag(node as JSDocTemplateTag);
                case SyntaxKind.JSDocTypedefTag:
                    return emitJSDocTypedefTag(node as JSDocTypedefTag);
                case SyntaxKind.JSDocSeeTag:
                    return emitJSDocSeeTag(node as JSDocSeeTag);
                // SyntaxKind.JSDocPropertyTag (see JSDocParameterTag, above)

                // Transformation nodes
                case SyntaxKind.NotEmittedStatement:
                case SyntaxKind.EndOfDeclarationMarker:
                case SyntaxKind.MergeDeclarationMarker:
                    return;
            }
            if (isExpression(node)) {
                hint = EmitHint.Expression;
                if (substituteNode !== noEmitSubstitution) {
                    const substitute = substituteNode(hint, node) || node;
                    if (substitute !== node) {
                        node = substitute;
                        if (currentParenthesizerRule) {
                            node = currentParenthesizerRule(node);
                        }
                    }
                }
            }
        }
        if (hint === EmitHint.Expression) {
            switch (node.kind) {
                // Literals
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.BigIntLiteral:
                    return emitNumericOrBigIntLiteral(node as NumericLiteral | BigIntLiteral);

                case SyntaxKind.StringLiteral:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    return emitLiteral(node as LiteralExpression, /*jsxAttributeEscape*/ false);

                // Identifiers
                case SyntaxKind.Identifier:
                    return emitIdentifier(node as Identifier);
                case SyntaxKind.PrivateIdentifier:
                    return emitPrivateIdentifier(node as PrivateIdentifier);

                // Expressions
                case SyntaxKind.ArrayLiteralExpression:
                    return emitArrayLiteralExpression(node as ArrayLiteralExpression);
                case SyntaxKind.ObjectLiteralExpression:
                    return emitObjectLiteralExpression(node as ObjectLiteralExpression);
                case SyntaxKind.PropertyAccessExpression:
                    return emitPropertyAccessExpression(node as PropertyAccessExpression);
                case SyntaxKind.ElementAccessExpression:
                    return emitElementAccessExpression(node as ElementAccessExpression);
                case SyntaxKind.CallExpression:
                    return emitCallExpression(node as CallExpression);
                case SyntaxKind.NewExpression:
                    return emitNewExpression(node as NewExpression);
                case SyntaxKind.TaggedTemplateExpression:
                    return emitTaggedTemplateExpression(node as TaggedTemplateExpression);
                case SyntaxKind.TypeAssertionExpression:
                    return emitTypeAssertionExpression(node as TypeAssertion);
                case SyntaxKind.ParenthesizedExpression:
                    return emitParenthesizedExpression(node as ParenthesizedExpression);
                case SyntaxKind.FunctionExpression:
                    return emitFunctionExpression(node as FunctionExpression);
                case SyntaxKind.ArrowFunction:
                    return emitArrowFunction(node as ArrowFunction);
                case SyntaxKind.DeleteExpression:
                    return emitDeleteExpression(node as DeleteExpression);
                case SyntaxKind.TypeOfExpression:
                    return emitTypeOfExpression(node as TypeOfExpression);
                case SyntaxKind.VoidExpression:
                    return emitVoidExpression(node as VoidExpression);
                case SyntaxKind.AwaitExpression:
                    return emitAwaitExpression(node as AwaitExpression);
                case SyntaxKind.PrefixUnaryExpression:
                    return emitPrefixUnaryExpression(node as PrefixUnaryExpression);
                case SyntaxKind.PostfixUnaryExpression:
                    return emitPostfixUnaryExpression(node as PostfixUnaryExpression);
                case SyntaxKind.BinaryExpression:
                    return emitBinaryExpression(node as BinaryExpression);
                case SyntaxKind.ConditionalExpression:
                    return emitConditionalExpression(node as ConditionalExpression);
                case SyntaxKind.TemplateExpression:
                    return emitTemplateExpression(node as TemplateExpression);
                case SyntaxKind.YieldExpression:
                    return emitYieldExpression(node as YieldExpression);
                case SyntaxKind.SpreadElement:
                    return emitSpreadElement(node as SpreadElement);
                case SyntaxKind.ClassExpression:
                    return emitClassExpression(node as ClassExpression);
                case SyntaxKind.OmittedExpression:
                    return;
                case SyntaxKind.AsExpression:
                    return emitAsExpression(node as AsExpression);
                case SyntaxKind.NonNullExpression:
                    return emitNonNullExpression(node as NonNullExpression);
                case SyntaxKind.ExpressionWithTypeArguments:
                    return emitExpressionWithTypeArguments(node as ExpressionWithTypeArguments);
                case SyntaxKind.SatisfiesExpression:
                    return emitSatisfiesExpression(node as SatisfiesExpression);
                case SyntaxKind.MetaProperty:
                    return emitMetaProperty(node as MetaProperty);
                case SyntaxKind.SyntheticExpression:
                    return Debug.fail("SyntheticExpression should never be printed.");

                // JSX
                case SyntaxKind.JsxElement:
                    return emitJsxElement(node as JsxElement);
                case SyntaxKind.JsxSelfClosingElement:
                    return emitJsxSelfClosingElement(node as JsxSelfClosingElement);
                case SyntaxKind.JsxFragment:
                    return emitJsxFragment(node as JsxFragment);

                // Synthesized list
                case SyntaxKind.SyntaxList:
                    return Debug.fail("SyntaxList should not be printed");

                // Transformation nodes
                case SyntaxKind.NotEmittedStatement:
                    return;
                case SyntaxKind.PartiallyEmittedExpression:
                    return emitPartiallyEmittedExpression(node as PartiallyEmittedExpression);
                case SyntaxKind.CommaListExpression:
                    return emitCommaList(node as CommaListExpression);
                case SyntaxKind.MergeDeclarationMarker:
                case SyntaxKind.EndOfDeclarationMarker:
                    return;
                case SyntaxKind.SyntheticReferenceExpression:
                    return Debug.fail("SyntheticReferenceExpression should not be printed");
            }
        }
        if (isKeyword(node.kind)) return writeTokenNode(node, writeKeyword);
        if (isTokenKind(node.kind)) return writeTokenNode(node, writePunctuation);
        // skip emit root component expression
        if (findAncestor(node, (elelment: Node) => {
            return isEtsComponentExpression(elelment)
        })) {
            return;
        }
        Debug.fail(`Unhandled SyntaxKind: ${Debug.formatSyntaxKind(node.kind)}.`);
    }

    function emitMappedTypeParameter(node: TypeParameterDeclaration): void {
        emit(node.name);
        writeSpace();
        writeKeyword("in");
        writeSpace();
        emit(node.constraint);
    }

    function pipelineEmitWithSubstitution(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Substitution, hint, node);
        Debug.assertIsDefined(lastSubstitution);
        node = lastSubstitution;
        lastSubstitution = undefined;
        pipelinePhase(hint, node);
    }

    function getHelpersFromBundledSourceFiles(bundle: Bundle): string[] | undefined {
        let result: string[] | undefined;
        if (moduleKind === ModuleKind.None || printerOptions.noEmitHelpers) {
            return undefined;
        }
        const bundledHelpers = new Map<string, boolean>();
        for (const sourceFile of bundle.sourceFiles) {
            const shouldSkip = getExternalHelpersModuleName(sourceFile) !== undefined;
            const helpers = getSortedEmitHelpers(sourceFile);
            if (!helpers) continue;
            for (const helper of helpers) {
                if (!helper.scoped && !shouldSkip && !bundledHelpers.get(helper.name)) {
                    bundledHelpers.set(helper.name, true);
                    (result || (result = [])).push(helper.name);
                }
            }
        }

        return result;
    }

    function emitHelpers(node: Node) {
        let helpersEmitted = false;
        const bundle = node.kind === SyntaxKind.Bundle ? node as Bundle : undefined;
        if (bundle && moduleKind === ModuleKind.None) {
            return;
        }
        const numPrepends = bundle ? bundle.prepends.length : 0;
        const numNodes = bundle ? bundle.sourceFiles.length + numPrepends : 1;
        for (let i = 0; i < numNodes; i++) {
            const currentNode = bundle ? i < numPrepends ? bundle.prepends[i] : bundle.sourceFiles[i - numPrepends] : node;
            const sourceFile = isSourceFile(currentNode) ? currentNode : isUnparsedSource(currentNode) ? undefined : currentSourceFile;
            const shouldSkip = printerOptions.noEmitHelpers || (!!sourceFile && hasRecordedExternalHelpers(sourceFile));
            const shouldBundle = (isSourceFile(currentNode) || isUnparsedSource(currentNode)) && !isOwnFileEmit;
            const helpers = isUnparsedSource(currentNode) ? currentNode.helpers : getSortedEmitHelpers(currentNode);
            if (helpers) {
                for (const helper of helpers) {
                    if (!helper.scoped) {
                        // Skip the helper if it can be skipped and the noEmitHelpers compiler
                        // option is set, or if it can be imported and the importHelpers compiler
                        // option is set.
                        if (shouldSkip) continue;

                        // Skip the helper if it can be bundled but hasn't already been emitted and we
                        // are emitting a bundled module.
                        if (shouldBundle) {
                            if (bundledHelpers.get(helper.name)) {
                                continue;
                            }

                            bundledHelpers.set(helper.name, true);
                        }
                    }
                    else if (bundle) {
                        // Skip the helper if it is scoped and we are emitting bundled helpers
                        continue;
                    }
                    const pos = getTextPosWithWriteLine();
                    if (typeof helper.text === "string") {
                        writeLines(helper.text);
                    }
                    else {
                        writeLines(helper.text(makeFileLevelOptimisticUniqueName));
                    }
                    if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.EmitHelpers, data: helper.name });
                    helpersEmitted = true;
                }
            }
        }

        return helpersEmitted;
    }

    function getSortedEmitHelpers(node: Node) {
        const helpers = getEmitHelpers(node);
        return helpers && stableSort(helpers, compareEmitHelpers);
    }

    //
    // Literals/Pseudo-literals
    //

    // SyntaxKind.NumericLiteral
    // SyntaxKind.BigIntLiteral
    function emitNumericOrBigIntLiteral(node: NumericLiteral | BigIntLiteral) {
        emitLiteral(node, /*jsxAttributeEscape*/ false);
    }

    // SyntaxKind.StringLiteral
    // SyntaxKind.RegularExpressionLiteral
    // SyntaxKind.NoSubstitutionTemplateLiteral
    // SyntaxKind.TemplateHead
    // SyntaxKind.TemplateMiddle
    // SyntaxKind.TemplateTail
    function emitLiteral(node: LiteralLikeNode, jsxAttributeEscape: boolean) {
        const text = getLiteralTextOfNode(node, printerOptions.neverAsciiEscape, jsxAttributeEscape);
        if ((printerOptions.sourceMap || printerOptions.inlineSourceMap)
            && (node.kind === SyntaxKind.StringLiteral || isTemplateLiteralKind(node.kind))) {
            writeLiteral(text);
        }
        else {
            // Quick info expects all literals to be called with writeStringLiteral, as there's no specific type for numberLiterals
            writeStringLiteral(text);
        }
    }

    // SyntaxKind.UnparsedSource
    // SyntaxKind.UnparsedPrepend
    function emitUnparsedSourceOrPrepend(unparsed: UnparsedSource | UnparsedPrepend) {
        for (const text of unparsed.texts) {
            writeLine();
            emit(text);
        }
    }

    // SyntaxKind.UnparsedPrologue
    // SyntaxKind.UnparsedText
    // SyntaxKind.UnparsedInternal
    // SyntaxKind.UnparsedSyntheticReference
    function writeUnparsedNode(unparsed: UnparsedNode) {
        writer.rawWrite(unparsed.parent.text.substring(unparsed.pos, unparsed.end));
    }

    // SyntaxKind.UnparsedText
    // SyntaxKind.UnparsedInternal
    function emitUnparsedTextLike(unparsed: UnparsedTextLike) {
        const pos = getTextPosWithWriteLine();
        writeUnparsedNode(unparsed);
        if (bundleFileInfo) {
            updateOrPushBundleFileTextLike(
                pos,
                writer.getTextPos(),
                unparsed.kind === SyntaxKind.UnparsedText ?
                    BundleFileSectionKind.Text :
                    BundleFileSectionKind.Internal
            );
        }
    }

    // SyntaxKind.UnparsedSyntheticReference
    function emitUnparsedSyntheticReference(unparsed: UnparsedSyntheticReference) {
        const pos = getTextPosWithWriteLine();
        writeUnparsedNode(unparsed);
        if (bundleFileInfo) {
            const section = clone(unparsed.section);
            section.pos = pos;
            section.end = writer.getTextPos();
            bundleFileInfo.sections.push(section);
        }
    }

    //
    // Snippet Elements
    //

    function emitSnippetNode(hint: EmitHint, node: Node, snippet: SnippetElement) {
        switch (snippet.kind) {
            case SnippetKind.Placeholder:
                emitPlaceholder(hint, node, snippet);
                break;
            case SnippetKind.TabStop:
                emitTabStop(hint, node, snippet);
                break;
        }
    }

    function emitPlaceholder(hint: EmitHint, node: Node, snippet: Placeholder) {
        nonEscapingWrite(`\$\{${snippet.order}:`); // `${2:`
        pipelineEmitWithHintWorker(hint, node, /*allowSnippets*/ false); // `...`
        nonEscapingWrite(`\}`); // `}`
        // `${2:...}`
    }

    function emitTabStop(hint: EmitHint, node: Node, snippet: TabStop) {
        // A tab stop should only be attached to an empty node, i.e. a node that doesn't emit any text.
        Debug.assert(node.kind === SyntaxKind.EmptyStatement,
            `A tab stop cannot be attached to a node of kind ${Debug.formatSyntaxKind(node.kind)}.`);
        Debug.assert(hint !== EmitHint.EmbeddedStatement,
            `A tab stop cannot be attached to an embedded statement.`);
        nonEscapingWrite(`\$${snippet.order}`);
    }

    //
    // Identifiers
    //

    function emitIdentifier(node: Identifier) {
        const writeText = node.symbol ? writeSymbol : write;
        writeText(getTextOfNode(node, /*includeTrivia*/ false), node.symbol);
        emitList(node, node.typeArguments, ListFormat.TypeParameters); // Call emitList directly since it could be an array of TypeParameterDeclarations _or_ type arguments
    }

    //
    // Names
    //

    function emitPrivateIdentifier(node: PrivateIdentifier) {
        const writeText = node.symbol ? writeSymbol : write;
        writeText(getTextOfNode(node, /*includeTrivia*/ false), node.symbol);
    }


    function emitQualifiedName(node: QualifiedName) {
        emitEntityName(node.left);
        writePunctuation(".");
        emit(node.right);
    }

    function emitEntityName(node: EntityName) {
        if (node.kind === SyntaxKind.Identifier) {
            emitExpression(node);
        }
        else {
            emit(node);
        }
    }

    function emitComputedPropertyName(node: ComputedPropertyName) {
        writePunctuation("[");
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfComputedPropertyName);
        writePunctuation("]");
    }

    //
    // Signature elements
    //

    function emitTypeParameter(node: TypeParameterDeclaration) {
        emitModifiers(node, node.modifiers);
        emit(node.name);
        if (node.constraint) {
            writeSpace();
            writeKeyword("extends");
            writeSpace();
            emit(node.constraint);
        }
        if (node.default) {
            writeSpace();
            writeOperator("=");
            writeSpace();
            emit(node.default);
        }
    }

    function emitParameter(node: ParameterDeclaration) {
        emitDecoratorsAndModifiers(node, node.modifiers);
        emit(node.dotDotDotToken);
        emitNodeWithWriter(node.name, writeParameter);
        emit(node.questionToken);
        if (node.parent && node.parent.kind === SyntaxKind.JSDocFunctionType && !node.name) {
            emit(node.type);
        }
        else {
            emitTypeAnnotation(node.type);
        }
        // The comment position has to fallback to any present node within the parameterdeclaration because as it turns out, the parser can make parameter declarations with _just_ an initializer.
        emitInitializer(node.initializer, node.type ? node.type.end : node.questionToken ? node.questionToken.end : node.name ? node.name.end : node.modifiers ? node.modifiers.end : node.pos, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitDecorator(decorator: Decorator) {
        writePunctuation("@");
        emitExpression(decorator.expression, parenthesizer.parenthesizeLeftSideOfAccess);
    }

    //
    // Type members
    //

    function emitPropertySignature(node: PropertySignature) {
        emitModifiers(node, node.modifiers);
        emitNodeWithWriter(node.name, writeProperty);
        emit(node.questionToken);
        emitTypeAnnotation(node.type);
        writeTrailingSemicolon();
    }

    function emitPropertyDeclaration(node: PropertyDeclaration) {
        emitDecoratorsAndModifiers(node, node.modifiers);
        emit(node.name);
        emit(node.questionToken);
        emit(node.exclamationToken);
        emitTypeAnnotation(node.type);
        emitInitializer(node.initializer, node.type ? node.type.end : node.questionToken ? node.questionToken.end : node.name.end, node);
        writeTrailingSemicolon();
    }

    function emitAnnotationPropertyDeclaration(node: AnnotationPropertyDeclaration): void {
        emit(node.name);
        emitTypeAnnotation(node.type);
        emitInitializer(node.initializer, node.type ? node.type.end : node.name.end, node);
        writeTrailingSemicolon();
    }

    function emitMethodSignature(node: MethodSignature) {
        pushNameGenerationScope(node);
        emitModifiers(node, node.modifiers);
        emit(node.name);
        emit(node.questionToken);
        emitTypeParameters(node, node.typeParameters);
        emitParameters(node, node.parameters);
        emitTypeAnnotation(node.type);
        writeTrailingSemicolon();
        popNameGenerationScope(node);
    }

    function emitMethodDeclaration(node: MethodDeclaration) {
        emitDecoratorsAndModifiers(node, node.modifiers);
        emit(node.asteriskToken);
        emit(node.name);
        emit(node.questionToken);
        emitSignatureAndBody(node, emitSignatureHead);
    }

    function emitClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration) {
        writeKeyword("static");
        emitBlockFunctionBody(node.body);
    }

    function emitConstructor(node: ConstructorDeclaration) {
        emitModifiers(node, node.modifiers);
        writeKeyword("constructor");
        emitSignatureAndBody(node, emitSignatureHead);
    }

    function emitAccessorDeclaration(node: AccessorDeclaration) {
        emitDecoratorsAndModifiers(node, node.modifiers);
        writeKeyword(node.kind === SyntaxKind.GetAccessor ? "get" : "set");
        writeSpace();
        emit(node.name);
        emitSignatureAndBody(node, emitSignatureHead);
    }

    function emitCallSignature(node: CallSignatureDeclaration) {
        pushNameGenerationScope(node);
        emitTypeParameters(node, node.typeParameters);
        emitParameters(node, node.parameters);
        emitTypeAnnotation(node.type);
        writeTrailingSemicolon();
        popNameGenerationScope(node);
    }

    function emitConstructSignature(node: ConstructSignatureDeclaration) {
        pushNameGenerationScope(node);
        writeKeyword("new");
        writeSpace();
        emitTypeParameters(node, node.typeParameters);
        emitParameters(node, node.parameters);
        emitTypeAnnotation(node.type);
        writeTrailingSemicolon();
        popNameGenerationScope(node);
    }

    function emitIndexSignature(node: IndexSignatureDeclaration) {
        emitModifiers(node, node.modifiers);
        emitParametersForIndexSignature(node, node.parameters);
        emitTypeAnnotation(node.type);
        writeTrailingSemicolon();
    }

    function emitTemplateTypeSpan(node: TemplateLiteralTypeSpan) {
        emit(node.type);
        emit(node.literal);
    }

    function emitSemicolonClassElement() {
        writeTrailingSemicolon();
    }

    //
    // Types
    //

    function emitTypePredicate(node: TypePredicateNode) {
        if (node.assertsModifier) {
            emit(node.assertsModifier);
            writeSpace();
        }
        emit(node.parameterName);
        if (node.type) {
            writeSpace();
            writeKeyword("is");
            writeSpace();
            emit(node.type);
        }
    }

    function emitTypeReference(node: TypeReferenceNode) {
        emit(node.typeName);
        emitTypeArguments(node, node.typeArguments);
    }

    function emitFunctionType(node: FunctionTypeNode) {
        pushNameGenerationScope(node);
        emitTypeParameters(node, node.typeParameters);
        emitParametersForArrow(node, node.parameters);
        writeSpace();
        writePunctuation("=>");
        writeSpace();
        emit(node.type);
        popNameGenerationScope(node);
    }

    function emitJSDocFunctionType(node: JSDocFunctionType) {
        writeKeyword("function");
        emitParameters(node, node.parameters);
        writePunctuation(":");
        emit(node.type);
    }


    function emitJSDocNullableType(node: JSDocNullableType) {
        writePunctuation("?");
        emit(node.type);
    }

    function emitJSDocNonNullableType(node: JSDocNonNullableType) {
        writePunctuation("!");
        emit(node.type);
    }

    function emitJSDocOptionalType(node: JSDocOptionalType) {
        emit(node.type);
        writePunctuation("=");
    }

    function emitConstructorType(node: ConstructorTypeNode) {
        pushNameGenerationScope(node);
        emitModifiers(node, node.modifiers);
        writeKeyword("new");
        writeSpace();
        emitTypeParameters(node, node.typeParameters);
        emitParameters(node, node.parameters);
        writeSpace();
        writePunctuation("=>");
        writeSpace();
        emit(node.type);
        popNameGenerationScope(node);
    }

    function emitTypeQuery(node: TypeQueryNode) {
        writeKeyword("typeof");
        writeSpace();
        emit(node.exprName);
        emitTypeArguments(node, node.typeArguments);
    }

    function emitTypeLiteral(node: TypeLiteralNode) {
        writePunctuation("{");
        const flags = getEmitFlags(node) & EmitFlags.SingleLine ? ListFormat.SingleLineTypeLiteralMembers : ListFormat.MultiLineTypeLiteralMembers;
        emitList(node, node.members, flags | ListFormat.NoSpaceIfEmpty);
        writePunctuation("}");
    }

    function emitArrayType(node: ArrayTypeNode) {
        emit(node.elementType, parenthesizer.parenthesizeNonArrayTypeOfPostfixType);
        writePunctuation("[");
        writePunctuation("]");
    }

    function emitRestOrJSDocVariadicType(node: RestTypeNode | JSDocVariadicType) {
        writePunctuation("...");
        emit(node.type);
    }

    function emitTupleType(node: TupleTypeNode) {
        emitTokenWithComment(SyntaxKind.OpenBracketToken, node.pos, writePunctuation, node);
        const flags = getEmitFlags(node) & EmitFlags.SingleLine ? ListFormat.SingleLineTupleTypeElements : ListFormat.MultiLineTupleTypeElements;
        emitList(node, node.elements, flags | ListFormat.NoSpaceIfEmpty, parenthesizer.parenthesizeElementTypeOfTupleType);
        emitTokenWithComment(SyntaxKind.CloseBracketToken, node.elements.end, writePunctuation, node);
    }

    function emitNamedTupleMember(node: NamedTupleMember) {
        emit(node.dotDotDotToken);
        emit(node.name);
        emit(node.questionToken);
        emitTokenWithComment(SyntaxKind.ColonToken, node.name.end, writePunctuation, node);
        writeSpace();
        emit(node.type);
    }

    function emitOptionalType(node: OptionalTypeNode) {
        emit(node.type, parenthesizer.parenthesizeTypeOfOptionalType);
        writePunctuation("?");
    }

    function emitUnionType(node: UnionTypeNode) {
        emitList(node, node.types, ListFormat.UnionTypeConstituents, parenthesizer.parenthesizeConstituentTypeOfUnionType);
    }

    function emitIntersectionType(node: IntersectionTypeNode) {
        emitList(node, node.types, ListFormat.IntersectionTypeConstituents, parenthesizer.parenthesizeConstituentTypeOfIntersectionType);
    }

    function emitConditionalType(node: ConditionalTypeNode) {
        emit(node.checkType, parenthesizer.parenthesizeCheckTypeOfConditionalType);
        writeSpace();
        writeKeyword("extends");
        writeSpace();
        emit(node.extendsType, parenthesizer.parenthesizeExtendsTypeOfConditionalType);
        writeSpace();
        writePunctuation("?");
        writeSpace();
        emit(node.trueType);
        writeSpace();
        writePunctuation(":");
        writeSpace();
        emit(node.falseType);
    }

    function emitInferType(node: InferTypeNode) {
        writeKeyword("infer");
        writeSpace();
        emit(node.typeParameter);
    }

    function emitParenthesizedType(node: ParenthesizedTypeNode) {
        writePunctuation("(");
        emit(node.type);
        writePunctuation(")");
    }

    function emitThisType() {
        writeKeyword("this");
    }

    function emitTypeOperator(node: TypeOperatorNode) {
        writeTokenText(node.operator, writeKeyword);
        writeSpace();

        const parenthesizerRule = node.operator === SyntaxKind.ReadonlyKeyword ?
            parenthesizer.parenthesizeOperandOfReadonlyTypeOperator :
            parenthesizer.parenthesizeOperandOfTypeOperator;
        emit(node.type, parenthesizerRule);
    }

    function emitIndexedAccessType(node: IndexedAccessTypeNode) {
        emit(node.objectType, parenthesizer.parenthesizeNonArrayTypeOfPostfixType);
        writePunctuation("[");
        emit(node.indexType);
        writePunctuation("]");
    }

    function emitMappedType(node: MappedTypeNode) {
        const emitFlags = getEmitFlags(node);
        writePunctuation("{");
        if (emitFlags & EmitFlags.SingleLine) {
            writeSpace();
        }
        else {
            writeLine();
            increaseIndent();
        }
        if (node.readonlyToken) {
            emit(node.readonlyToken);
            if (node.readonlyToken.kind !== SyntaxKind.ReadonlyKeyword) {
                writeKeyword("readonly");
            }
            writeSpace();
        }
        writePunctuation("[");

        pipelineEmit(EmitHint.MappedTypeParameter, node.typeParameter);
        if (node.nameType) {
            writeSpace();
            writeKeyword("as");
            writeSpace();
            emit(node.nameType);
        }

        writePunctuation("]");
        if (node.questionToken) {
            emit(node.questionToken);
            if (node.questionToken.kind !== SyntaxKind.QuestionToken) {
                writePunctuation("?");
            }
        }
        writePunctuation(":");
        writeSpace();
        emit(node.type);
        writeTrailingSemicolon();
        if (emitFlags & EmitFlags.SingleLine) {
            writeSpace();
        }
        else {
            writeLine();
            decreaseIndent();
        }
        emitList(node, node.members, ListFormat.PreserveLines);
        writePunctuation("}");
    }

    function emitLiteralType(node: LiteralTypeNode) {
        emitExpression(node.literal);
    }

    function emitTemplateType(node: TemplateLiteralTypeNode) {
        emit(node.head);
        emitList(node, node.templateSpans, ListFormat.TemplateExpressionSpans);
    }

    function emitImportTypeNode(node: ImportTypeNode) {
        if (node.isTypeOf) {
            writeKeyword("typeof");
            writeSpace();
        }
        writeKeyword("import");
        writePunctuation("(");
        emit(node.argument);
        if (node.assertions) {
            writePunctuation(",");
            writeSpace();
            writePunctuation("{");
            writeSpace();
            writeKeyword("assert");
            writePunctuation(":");
            writeSpace();
            const elements = node.assertions.assertClause.elements;
            emitList(node.assertions.assertClause, elements, ListFormat.ImportClauseEntries);
            writeSpace();
            writePunctuation("}");
        }
        writePunctuation(")");
        if (node.qualifier) {
            writePunctuation(".");
            emit(node.qualifier);
        }
        emitTypeArguments(node, node.typeArguments);
    }

    //
    // Binding patterns
    //

    function emitObjectBindingPattern(node: ObjectBindingPattern) {
        writePunctuation("{");
        emitList(node, node.elements, ListFormat.ObjectBindingPatternElements);
        writePunctuation("}");
    }

    function emitArrayBindingPattern(node: ArrayBindingPattern) {
        writePunctuation("[");
        emitList(node, node.elements, ListFormat.ArrayBindingPatternElements);
        writePunctuation("]");
    }

    function emitBindingElement(node: BindingElement) {
        emit(node.dotDotDotToken);
        if (node.propertyName) {
            emit(node.propertyName);
            writePunctuation(":");
            writeSpace();
        }
        emit(node.name);
        emitInitializer(node.initializer, node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    //
    // Expressions
    //

    function emitArrayLiteralExpression(node: ArrayLiteralExpression) {
        const elements = node.elements;
        const preferNewLine = node.multiLine ? ListFormat.PreferNewLine : ListFormat.None;
        emitExpressionList(node, elements, ListFormat.ArrayLiteralExpressionElements | preferNewLine, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitObjectLiteralExpression(node: ObjectLiteralExpression) {
        forEach(node.properties, generateMemberNames);

        const indentedFlag = getEmitFlags(node) & EmitFlags.Indented;
        if (indentedFlag) {
            increaseIndent();
        }

        const preferNewLine = node.multiLine ? ListFormat.PreferNewLine : ListFormat.None;
        const allowTrailingComma = currentSourceFile && currentSourceFile.languageVersion >= ScriptTarget.ES5 && !isJsonSourceFile(currentSourceFile) ? ListFormat.AllowTrailingComma : ListFormat.None;
        emitList(node, node.properties, ListFormat.ObjectLiteralExpressionProperties | allowTrailingComma | preferNewLine);

        if (indentedFlag) {
            decreaseIndent();
        }
    }

    function emitPropertyAccessExpression(node: PropertyAccessExpression) {
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        const token = node.questionDotToken || setTextRangePosEnd(factory.createToken(SyntaxKind.DotToken) as DotToken, node.expression.end, node.name.pos);
        const linesBeforeDot = getLinesBetweenNodes(node, node.expression, token);
        const linesAfterDot = getLinesBetweenNodes(node, token, node.name);

        writeLinesAndIndent(linesBeforeDot, /*writeSpaceIfNotIndenting*/ false);

        const shouldEmitDotDot =
            token.kind !== SyntaxKind.QuestionDotToken &&
            mayNeedDotDotForPropertyAccess(node.expression) &&
            !writer.hasTrailingComment() &&
            !writer.hasTrailingWhitespace();

        if (shouldEmitDotDot) {
            writePunctuation(".");
        }

        if (node.questionDotToken) {
            emit(token);
        }
        else {
            emitTokenWithComment(token.kind, node.expression.end, writePunctuation, node);
        }
        writeLinesAndIndent(linesAfterDot, /*writeSpaceIfNotIndenting*/ false);
        emit(node.name);
        decreaseIndentIf(linesBeforeDot, linesAfterDot);
    }

    // 1..toString is a valid property access, emit a dot after the literal
    // Also emit a dot if expression is a integer const enum value - it will appear in generated code as numeric literal
    function mayNeedDotDotForPropertyAccess(expression: Expression) {
        expression = skipPartiallyEmittedExpressions(expression);
        if (isNumericLiteral(expression)) {
            // check if numeric literal is a decimal literal that was originally written with a dot
            const text = getLiteralTextOfNode(expression as LiteralExpression, /*neverAsciiEscape*/ true, /*jsxAttributeEscape*/ false);
            // If he number will be printed verbatim and it doesn't already contain a dot, add one
            // if the expression doesn't have any comments that will be emitted.
            return !expression.numericLiteralFlags && !stringContains(text, tokenToString(SyntaxKind.DotToken)!);
        }
        else if (isAccessExpression(expression)) {
            // check if constant enum value is integer
            const constantValue = getConstantValue(expression);
            // isFinite handles cases when constantValue is undefined
            return typeof constantValue === "number" && isFinite(constantValue)
                && Math.floor(constantValue) === constantValue;
        }
    }

    function emitElementAccessExpression(node: ElementAccessExpression) {
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        emit(node.questionDotToken);
        emitTokenWithComment(SyntaxKind.OpenBracketToken, node.expression.end, writePunctuation, node);
        emitExpression(node.argumentExpression);
        emitTokenWithComment(SyntaxKind.CloseBracketToken, node.argumentExpression.end, writePunctuation, node);
    }

    function emitCallExpression(node: CallExpression) {
        const indirectCall = getEmitFlags(node) & EmitFlags.IndirectCall;
        if (indirectCall) {
            writePunctuation("(");
            writeLiteral("0");
            writePunctuation(",");
            writeSpace();
        }
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        if (indirectCall) {
            writePunctuation(")");
        }
        emit(node.questionDotToken);
        emitTypeArguments(node, node.typeArguments);
        emitExpressionList(node, node.arguments, ListFormat.CallExpressionArguments, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitNewExpression(node: NewExpression) {
        emitTokenWithComment(SyntaxKind.NewKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfNew);
        emitTypeArguments(node, node.typeArguments);
        emitExpressionList(node, node.arguments, ListFormat.NewExpressionArguments, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitTaggedTemplateExpression(node: TaggedTemplateExpression) {
        const indirectCall = getEmitFlags(node) & EmitFlags.IndirectCall;
        if (indirectCall) {
            writePunctuation("(");
            writeLiteral("0");
            writePunctuation(",");
            writeSpace();
        }
        emitExpression(node.tag, parenthesizer.parenthesizeLeftSideOfAccess);
        if (indirectCall) {
            writePunctuation(")");
        }
        emitTypeArguments(node, node.typeArguments);
        writeSpace();
        emitExpression(node.template);
    }

    function emitTypeAssertionExpression(node: TypeAssertion) {
        writePunctuation("<");
        emit(node.type);
        writePunctuation(">");
        emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function emitParenthesizedExpression(node: ParenthesizedExpression) {
        const openParenPos = emitTokenWithComment(SyntaxKind.OpenParenToken, node.pos, writePunctuation, node);
        const indented = writeLineSeparatorsAndIndentBefore(node.expression, node);
        emitExpression(node.expression, /*parenthesizerRules*/ undefined);
        writeLineSeparatorsAfter(node.expression, node);
        decreaseIndentIf(indented);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression ? node.expression.end : openParenPos, writePunctuation, node);
    }

    function emitFunctionExpression(node: FunctionExpression) {
        generateNameIfNeeded(node.name);
        emitFunctionDeclarationOrExpression(node);
    }

    function emitArrowFunction(node: ArrowFunction) {
        emitModifiers(node, node.modifiers);
        emitSignatureAndBody(node, emitArrowFunctionHead);
    }

    function emitArrowFunctionHead(node: ArrowFunction) {
        emitTypeParameters(node, node.typeParameters);
        emitParametersForArrow(node, node.parameters);
        emitTypeAnnotation(node.type);
        writeSpace();
        emit(node.equalsGreaterThanToken);
    }

    function emitDeleteExpression(node: DeleteExpression) {
        emitTokenWithComment(SyntaxKind.DeleteKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function emitTypeOfExpression(node: TypeOfExpression) {
        emitTokenWithComment(SyntaxKind.TypeOfKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function emitVoidExpression(node: VoidExpression) {
        emitTokenWithComment(SyntaxKind.VoidKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function emitAwaitExpression(node: AwaitExpression) {
        emitTokenWithComment(SyntaxKind.AwaitKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function emitPrefixUnaryExpression(node: PrefixUnaryExpression) {
        writeTokenText(node.operator, writeOperator);
        if (shouldEmitWhitespaceBeforeOperand(node)) {
            writeSpace();
        }
        emitExpression(node.operand, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function shouldEmitWhitespaceBeforeOperand(node: PrefixUnaryExpression) {
        // In some cases, we need to emit a space between the operator and the operand. One obvious case
        // is when the operator is an identifier, like delete or typeof. We also need to do this for plus
        // and minus expressions in certain cases. Specifically, consider the following two cases (parens
        // are just for clarity of exposition, and not part of the source code):
        //
        //  (+(+1))
        //  (+(++1))
        //
        // We need to emit a space in both cases. In the first case, the absence of a space will make
        // the resulting expression a prefix increment operation. And in the second, it will make the resulting
        // expression a prefix increment whose operand is a plus expression - (++(+x))
        // The same is true of minus of course.
        const operand = node.operand;
        return operand.kind === SyntaxKind.PrefixUnaryExpression
            && ((node.operator === SyntaxKind.PlusToken && ((operand as PrefixUnaryExpression).operator === SyntaxKind.PlusToken || (operand as PrefixUnaryExpression).operator === SyntaxKind.PlusPlusToken))
                || (node.operator === SyntaxKind.MinusToken && ((operand as PrefixUnaryExpression).operator === SyntaxKind.MinusToken || (operand as PrefixUnaryExpression).operator === SyntaxKind.MinusMinusToken)));
    }

    function emitPostfixUnaryExpression(node: PostfixUnaryExpression) {
        emitExpression(node.operand, parenthesizer.parenthesizeOperandOfPostfixUnary);
        writeTokenText(node.operator, writeOperator);
    }

    function createEmitBinaryExpression() {
        interface WorkArea {
            stackIndex: number;
            preserveSourceNewlinesStack: (boolean | undefined)[];
            containerPosStack: number[];
            containerEndStack: number[];
            declarationListContainerEndStack: number[];
            shouldEmitCommentsStack: boolean[];
            shouldEmitSourceMapsStack: boolean[];
        }

        return createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, /*foldState*/ undefined);

        function onEnter(node: BinaryExpression, state: WorkArea | undefined) {
            if (state) {
                state.stackIndex++;
                state.preserveSourceNewlinesStack[state.stackIndex] = preserveSourceNewlines;
                state.containerPosStack[state.stackIndex] = containerPos;
                state.containerEndStack[state.stackIndex] = containerEnd;
                state.declarationListContainerEndStack[state.stackIndex] = declarationListContainerEnd;
                const emitComments = state.shouldEmitCommentsStack[state.stackIndex] = shouldEmitComments(node);
                const emitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex] = shouldEmitSourceMaps(node);
                onBeforeEmitNode?.(node);
                if (emitComments) emitCommentsBeforeNode(node);
                if (emitSourceMaps) emitSourceMapsBeforeNode(node);
                beforeEmitNode(node);
            }
            else {
                state = {
                    stackIndex: 0,
                    preserveSourceNewlinesStack: [undefined],
                    containerPosStack: [-1],
                    containerEndStack: [-1],
                    declarationListContainerEndStack: [-1],
                    shouldEmitCommentsStack: [false],
                    shouldEmitSourceMapsStack: [false],
                };
            }
            return state;
        }

        function onLeft(next: Expression, _workArea: WorkArea, parent: BinaryExpression) {
            return maybeEmitExpression(next, parent, "left");
        }

        function onOperator(operatorToken: BinaryOperatorToken, _state: WorkArea, node: BinaryExpression) {
            const isCommaOperator = operatorToken.kind !== SyntaxKind.CommaToken;
            const linesBeforeOperator = getLinesBetweenNodes(node, node.left, operatorToken);
            const linesAfterOperator = getLinesBetweenNodes(node, operatorToken, node.right);
            writeLinesAndIndent(linesBeforeOperator, isCommaOperator);
            emitLeadingCommentsOfPosition(operatorToken.pos);
            writeTokenNode(operatorToken, operatorToken.kind === SyntaxKind.InKeyword ? writeKeyword : writeOperator);
            emitTrailingCommentsOfPosition(operatorToken.end, /*prefixSpace*/ true); // Binary operators should have a space before the comment starts
            writeLinesAndIndent(linesAfterOperator, /*writeSpaceIfNotIndenting*/ true);
        }

        function onRight(next: Expression, _workArea: WorkArea, parent: BinaryExpression) {
            return maybeEmitExpression(next, parent, "right");
        }

        function onExit(node: BinaryExpression, state: WorkArea) {
            const linesBeforeOperator = getLinesBetweenNodes(node, node.left, node.operatorToken);
            const linesAfterOperator = getLinesBetweenNodes(node, node.operatorToken, node.right);
            decreaseIndentIf(linesBeforeOperator, linesAfterOperator);
            if (state.stackIndex > 0) {
                const savedPreserveSourceNewlines = state.preserveSourceNewlinesStack[state.stackIndex];
                const savedContainerPos = state.containerPosStack[state.stackIndex];
                const savedContainerEnd = state.containerEndStack[state.stackIndex];
                const savedDeclarationListContainerEnd = state.declarationListContainerEndStack[state.stackIndex];
                const shouldEmitComments = state.shouldEmitCommentsStack[state.stackIndex];
                const shouldEmitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex];
                afterEmitNode(savedPreserveSourceNewlines);
                if (shouldEmitSourceMaps) emitSourceMapsAfterNode(node);
                if (shouldEmitComments) emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
                onAfterEmitNode?.(node);
                state.stackIndex--;
            }
        }

        function maybeEmitExpression(next: Expression, parent: BinaryExpression, side: "left" | "right") {
            const parenthesizerRule = side === "left" ?
                parenthesizer.getParenthesizeLeftSideOfBinaryForOperator(parent.operatorToken.kind) :
                parenthesizer.getParenthesizeRightSideOfBinaryForOperator(parent.operatorToken.kind);

            let pipelinePhase = getPipelinePhase(PipelinePhase.Notification, EmitHint.Expression, next);
            if (pipelinePhase === pipelineEmitWithSubstitution) {
                Debug.assertIsDefined(lastSubstitution);
                next = parenthesizerRule(cast(lastSubstitution, isExpression));
                pipelinePhase = getNextPipelinePhase(PipelinePhase.Substitution, EmitHint.Expression, next);
                lastSubstitution = undefined;
            }

            if (pipelinePhase === pipelineEmitWithComments ||
                pipelinePhase === pipelineEmitWithSourceMaps ||
                pipelinePhase === pipelineEmitWithHint) {
                if (isBinaryExpression(next)) {
                    return next;
                }
            }

            currentParenthesizerRule = parenthesizerRule;
            pipelinePhase(EmitHint.Expression, next);
        }
    }

    function emitConditionalExpression(node: ConditionalExpression) {
        const linesBeforeQuestion = getLinesBetweenNodes(node, node.condition, node.questionToken);
        const linesAfterQuestion = getLinesBetweenNodes(node, node.questionToken, node.whenTrue);
        const linesBeforeColon = getLinesBetweenNodes(node, node.whenTrue, node.colonToken);
        const linesAfterColon = getLinesBetweenNodes(node, node.colonToken, node.whenFalse);

        emitExpression(node.condition, parenthesizer.parenthesizeConditionOfConditionalExpression);
        writeLinesAndIndent(linesBeforeQuestion, /*writeSpaceIfNotIndenting*/ true);
        emit(node.questionToken);
        writeLinesAndIndent(linesAfterQuestion, /*writeSpaceIfNotIndenting*/ true);
        emitExpression(node.whenTrue, parenthesizer.parenthesizeBranchOfConditionalExpression);
        decreaseIndentIf(linesBeforeQuestion, linesAfterQuestion);

        writeLinesAndIndent(linesBeforeColon, /*writeSpaceIfNotIndenting*/ true);
        emit(node.colonToken);
        writeLinesAndIndent(linesAfterColon, /*writeSpaceIfNotIndenting*/ true);
        emitExpression(node.whenFalse, parenthesizer.parenthesizeBranchOfConditionalExpression);
        decreaseIndentIf(linesBeforeColon, linesAfterColon);
    }

    function emitTemplateExpression(node: TemplateExpression) {
        emit(node.head);
        emitList(node, node.templateSpans, ListFormat.TemplateExpressionSpans);
    }

    function emitYieldExpression(node: YieldExpression) {
        emitTokenWithComment(SyntaxKind.YieldKeyword, node.pos, writeKeyword, node);
        emit(node.asteriskToken);
        emitExpressionWithLeadingSpace(node.expression && parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsiAndDisallowedComma);
    }

    function emitSpreadElement(node: SpreadElement) {
        emitTokenWithComment(SyntaxKind.DotDotDotToken, node.pos, writePunctuation, node);
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitClassExpression(node: ClassExpression) {
        generateNameIfNeeded(node.name);
        emitClassOrStructDeclarationOrExpression(node);
    }

    function emitExpressionWithTypeArguments(node: ExpressionWithTypeArguments) {
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        emitTypeArguments(node, node.typeArguments);
    }

    function emitAsExpression(node: AsExpression) {
        emitExpression(node.expression, /*parenthesizerRules*/ undefined);
        if (node.type) {
            writeSpace();
            writeKeyword("as");
            writeSpace();
            emit(node.type);
        }
    }

    function emitNonNullExpression(node: NonNullExpression) {
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        writeOperator("!");
    }

    function emitSatisfiesExpression(node: SatisfiesExpression) {
        emitExpression(node.expression, /*parenthesizerRules*/ undefined);
        if (node.type) {
            writeSpace();
            writeKeyword("satisfies");
            writeSpace();
            emit(node.type);
        }
    }

    function emitMetaProperty(node: MetaProperty) {
        writeToken(node.keywordToken, node.pos, writePunctuation);
        writePunctuation(".");
        emit(node.name);
    }

    //
    // Misc
    //

    function emitTemplateSpan(node: TemplateSpan) {
        emitExpression(node.expression);
        emit(node.literal);
    }

    //
    // Statements
    //

    function emitBlock(node: Block) {
        emitBlockStatements(node, /*forceSingleLine*/ !node.multiLine && isEmptyBlock(node));
    }

    function emitBlockStatements(node: BlockLike, forceSingleLine: boolean) {
        emitTokenWithComment(SyntaxKind.OpenBraceToken, node.pos, writePunctuation, /*contextNode*/ node);
        const format = forceSingleLine || getEmitFlags(node) & EmitFlags.SingleLine ? ListFormat.SingleLineBlockStatements : ListFormat.MultiLineBlockStatements;
        emitList(node, node.statements, format);
        emitTokenWithComment(SyntaxKind.CloseBraceToken, node.statements.end, writePunctuation, /*contextNode*/ node, /*indentLeading*/ !!(format & ListFormat.MultiLine));
    }

    function emitVariableStatement(node: VariableStatement) {
        emitModifiers(node, node.modifiers);
        emit(node.declarationList);
        writeTrailingSemicolon();
    }

    function emitEmptyStatement(isEmbeddedStatement: boolean) {
        // While most trailing semicolons are possibly insignificant, an embedded "empty"
        // statement is significant and cannot be elided by a trailing-semicolon-omitting writer.
        if (isEmbeddedStatement) {
            writePunctuation(";");
        }
        else {
            writeTrailingSemicolon();
        }
    }

    function emitExpressionStatement(node: ExpressionStatement) {
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfExpressionStatement);
        // Emit semicolon in non json files
        // or if json file that created synthesized expression(eg.define expression statement when --out and amd code generation)
        if (!currentSourceFile || !isJsonSourceFile(currentSourceFile) || nodeIsSynthesized(node.expression)) {
            writeTrailingSemicolon();
        }
    }

    function emitIfStatement(node: IfStatement) {
        const openParenPos = emitTokenWithComment(SyntaxKind.IfKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        emitEmbeddedStatement(node, node.thenStatement);
        if (node.elseStatement) {
            writeLineOrSpace(node, node.thenStatement, node.elseStatement);
            emitTokenWithComment(SyntaxKind.ElseKeyword, node.thenStatement.end, writeKeyword, node);
            if (node.elseStatement.kind === SyntaxKind.IfStatement) {
                writeSpace();
                emit(node.elseStatement);
            }
            else {
                emitEmbeddedStatement(node, node.elseStatement);
            }
        }
    }

    function emitWhileClause(node: WhileStatement | DoStatement, startPos: number) {
        const openParenPos = emitTokenWithComment(SyntaxKind.WhileKeyword, startPos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
    }

    function emitDoStatement(node: DoStatement) {
        emitTokenWithComment(SyntaxKind.DoKeyword, node.pos, writeKeyword, node);
        emitEmbeddedStatement(node, node.statement);
        if (isBlock(node.statement) && !preserveSourceNewlines) {
            writeSpace();
        }
        else {
            writeLineOrSpace(node, node.statement, node.expression);
        }

        emitWhileClause(node, node.statement.end);
        writeTrailingSemicolon();
    }

    function emitWhileStatement(node: WhileStatement) {
        emitWhileClause(node, node.pos);
        emitEmbeddedStatement(node, node.statement);
    }

    function emitForStatement(node: ForStatement) {
        const openParenPos = emitTokenWithComment(SyntaxKind.ForKeyword, node.pos, writeKeyword, node);
        writeSpace();
        let pos = emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, /*contextNode*/ node);
        emitForBinding(node.initializer);
        pos = emitTokenWithComment(SyntaxKind.SemicolonToken, node.initializer ? node.initializer.end : pos, writePunctuation, node);
        emitExpressionWithLeadingSpace(node.condition);
        pos = emitTokenWithComment(SyntaxKind.SemicolonToken, node.condition ? node.condition.end : pos, writePunctuation, node);
        emitExpressionWithLeadingSpace(node.incrementor);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.incrementor ? node.incrementor.end : pos, writePunctuation, node);
        emitEmbeddedStatement(node, node.statement);
    }

    function emitForInStatement(node: ForInStatement) {
        const openParenPos = emitTokenWithComment(SyntaxKind.ForKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitForBinding(node.initializer);
        writeSpace();
        emitTokenWithComment(SyntaxKind.InKeyword, node.initializer.end, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        emitEmbeddedStatement(node, node.statement);
    }

    function emitForOfStatement(node: ForOfStatement) {
        const openParenPos = emitTokenWithComment(SyntaxKind.ForKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitWithTrailingSpace(node.awaitModifier);
        emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitForBinding(node.initializer);
        writeSpace();
        emitTokenWithComment(SyntaxKind.OfKeyword, node.initializer.end, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        emitEmbeddedStatement(node, node.statement);
    }

    function emitForBinding(node: VariableDeclarationList | Expression | undefined) {
        if (node !== undefined) {
            if (node.kind === SyntaxKind.VariableDeclarationList) {
                emit(node);
            }
            else {
                emitExpression(node);
            }
        }
    }

    function emitContinueStatement(node: ContinueStatement) {
        emitTokenWithComment(SyntaxKind.ContinueKeyword, node.pos, writeKeyword, node);
        emitWithLeadingSpace(node.label);
        writeTrailingSemicolon();
    }

    function emitBreakStatement(node: BreakStatement) {
        emitTokenWithComment(SyntaxKind.BreakKeyword, node.pos, writeKeyword, node);
        emitWithLeadingSpace(node.label);
        writeTrailingSemicolon();
    }

    function emitTokenWithComment(token: SyntaxKind, pos: number, writer: (s: string) => void, contextNode: Node, indentLeading?: boolean) {
        const node = getParseTreeNode(contextNode);
        const isSimilarNode = node && node.kind === contextNode.kind;
        const startPos = pos;
        if (isSimilarNode && currentSourceFile) {
            pos = skipTrivia(currentSourceFile.text, pos);
        }
        if (isSimilarNode && contextNode.pos !== startPos) {
            const needsIndent = indentLeading && currentSourceFile && !positionsAreOnSameLine(startPos, pos, currentSourceFile);
            if (needsIndent) {
                increaseIndent();
            }
            emitLeadingCommentsOfPosition(startPos);
            if (needsIndent) {
                decreaseIndent();
            }
        }
        pos = writeTokenText(token, writer, pos);
        if (isSimilarNode && contextNode.end !== pos) {
            const isJsxExprContext = contextNode.kind === SyntaxKind.JsxExpression;
            emitTrailingCommentsOfPosition(pos, /*prefixSpace*/ !isJsxExprContext, /*forceNoNewline*/ isJsxExprContext);
        }
        return pos;
    }

    function commentWillEmitNewLine(node: CommentRange) {
        return node.kind === SyntaxKind.SingleLineCommentTrivia || !!node.hasTrailingNewLine;
    }

    function willEmitLeadingNewLine(node: Expression): boolean {
        if (!currentSourceFile) return false;
        if (some(getLeadingCommentRanges(currentSourceFile.text, node.pos), commentWillEmitNewLine)) return true;
        if (some(getSyntheticLeadingComments(node), commentWillEmitNewLine)) return true;
        if (isPartiallyEmittedExpression(node)) {
            if (node.pos !== node.expression.pos) {
                if (some(getTrailingCommentRanges(currentSourceFile.text, node.expression.pos), commentWillEmitNewLine)) return true;
            }
            return willEmitLeadingNewLine(node.expression);
        }
        return false;
    }

    /**
     * Wraps an expression in parens if we would emit a leading comment that would introduce a line separator
     * between the node and its parent.
     */
    function parenthesizeExpressionForNoAsi(node: Expression) {
        if (!commentsDisabled && isPartiallyEmittedExpression(node) && willEmitLeadingNewLine(node)) {
            const parseNode = getParseTreeNode(node);
            if (parseNode && isParenthesizedExpression(parseNode)) {
                // If the original node was a parenthesized expression, restore it to preserve comment and source map emit
                const parens = factory.createParenthesizedExpression(node.expression);
                setOriginalNode(parens, node);
                setTextRange(parens, parseNode);
                return parens;
            }
            return factory.createParenthesizedExpression(node);
        }
        return node;
    }

    function parenthesizeExpressionForNoAsiAndDisallowedComma(node: Expression) {
        return parenthesizeExpressionForNoAsi(parenthesizer.parenthesizeExpressionForDisallowedComma(node));
    }

    function emitReturnStatement(node: ReturnStatement) {
        emitTokenWithComment(SyntaxKind.ReturnKeyword, node.pos, writeKeyword, /*contextNode*/ node);
        emitExpressionWithLeadingSpace(node.expression && parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsi);
        writeTrailingSemicolon();
    }

    function emitWithStatement(node: WithStatement) {
        const openParenPos = emitTokenWithComment(SyntaxKind.WithKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        emitEmbeddedStatement(node, node.statement);
    }

    function emitSwitchStatement(node: SwitchStatement) {
        const openParenPos = emitTokenWithComment(SyntaxKind.SwitchKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        writeSpace();
        emit(node.caseBlock);
    }

    function emitLabeledStatement(node: LabeledStatement) {
        emit(node.label);
        emitTokenWithComment(SyntaxKind.ColonToken, node.label.end, writePunctuation, node);
        writeSpace();
        emit(node.statement);
    }

    function emitThrowStatement(node: ThrowStatement) {
        emitTokenWithComment(SyntaxKind.ThrowKeyword, node.pos, writeKeyword, node);
        emitExpressionWithLeadingSpace(parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsi);
        writeTrailingSemicolon();
    }

    function emitTryStatement(node: TryStatement) {
        emitTokenWithComment(SyntaxKind.TryKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emit(node.tryBlock);
        if (node.catchClause) {
            writeLineOrSpace(node, node.tryBlock, node.catchClause);
            emit(node.catchClause);
        }
        if (node.finallyBlock) {
            writeLineOrSpace(node, node.catchClause || node.tryBlock, node.finallyBlock);
            emitTokenWithComment(SyntaxKind.FinallyKeyword, (node.catchClause || node.tryBlock).end, writeKeyword, node);
            writeSpace();
            emit(node.finallyBlock);
        }
    }

    function emitDebuggerStatement(node: DebuggerStatement) {
        writeToken(SyntaxKind.DebuggerKeyword, node.pos, writeKeyword);
        writeTrailingSemicolon();
    }

    //
    // Declarations
    //

    function emitVariableDeclaration(node: VariableDeclaration) {
        emit(node.name);
        emit(node.exclamationToken);
        emitTypeAnnotation(node.type);
        emitInitializer(node.initializer, node.type?.end ?? node.name.emitNode?.typeNode?.end ?? node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitVariableDeclarationList(node: VariableDeclarationList) {
        writeKeyword(isLet(node) ? "let" : isVarConst(node) ? "const" : "var");
        writeSpace();
        emitList(node, node.declarations, ListFormat.VariableDeclarationList);
    }

    function emitFunctionDeclaration(node: FunctionDeclaration) {
        emitFunctionDeclarationOrExpression(node);
    }

    function emitFunctionDeclarationOrExpression(node: FunctionDeclaration | FunctionExpression) {
        if (isFunctionDeclaration(node) && (isInEtsFile(node) || isInEtsFileWithOriginal(node))) {
            emitDecorators(node, node.illegalDecorators);
            getSourceFileOfNode
        }
        emitModifiers(node, factory.createNodeArray(getModifiers(node)));
        writeKeyword("function");
        emit(node.asteriskToken);
        writeSpace();
        emitIdentifierName(node.name);
        emitSignatureAndBody(node, emitSignatureHead);
    }

    function emitSignatureAndBody(node: FunctionLikeDeclaration, emitSignatureHead: (node: SignatureDeclaration) => void) {
        const body = node.body;
        if (body) {
            if (isBlock(body)) {
                const indentedFlag = getEmitFlags(node) & EmitFlags.Indented;
                if (indentedFlag) {
                    increaseIndent();
                }

                pushNameGenerationScope(node);
                forEach(node.parameters, generateNames);
                generateNames(node.body);

                emitSignatureHead(node);
                emitBlockFunctionBody(body);
                popNameGenerationScope(node);

                if (indentedFlag) {
                    decreaseIndent();
                }
            }
            else {
                emitSignatureHead(node);
                writeSpace();
                emitExpression(body, parenthesizer.parenthesizeConciseBodyOfArrowFunction);
            }
        }
        else {
            emitSignatureHead(node);
            writeTrailingSemicolon();
        }

    }

    function emitSignatureHead(node: FunctionDeclaration | FunctionExpression | MethodDeclaration | AccessorDeclaration | ConstructorDeclaration) {
        emitTypeParameters(node, node.typeParameters);
        emitParameters(node, node.parameters);
        emitTypeAnnotation(node.type);
    }

    function shouldEmitBlockFunctionBodyOnSingleLine(body: Block) {
        // We must emit a function body as a single-line body in the following case:
        // * The body has NodeEmitFlags.SingleLine specified.

        // We must emit a function body as a multi-line body in the following cases:
        // * The body is explicitly marked as multi-line.
        // * A non-synthesized body's start and end position are on different lines.
        // * Any statement in the body starts on a new line.

        if (getEmitFlags(body) & EmitFlags.SingleLine) {
            return true;
        }

        if (body.multiLine) {
            return false;
        }

        if (!nodeIsSynthesized(body) && currentSourceFile && !rangeIsOnSingleLine(body, currentSourceFile)) {
            return false;
        }

        if (getLeadingLineTerminatorCount(body, firstOrUndefined(body.statements), ListFormat.PreserveLines)
            || getClosingLineTerminatorCount(body, lastOrUndefined(body.statements), ListFormat.PreserveLines, body.statements)) {
            return false;
        }

        let previousStatement: Statement | undefined;
        for (const statement of body.statements) {
            if (getSeparatingLineTerminatorCount(previousStatement, statement, ListFormat.PreserveLines) > 0) {
                return false;
            }

            previousStatement = statement;
        }

        return true;
    }

    function emitBlockFunctionBody(body: Block) {
        onBeforeEmitNode?.(body);
        writeSpace();
        writePunctuation("{");
        increaseIndent();

        const emitBlockFunctionBody = shouldEmitBlockFunctionBodyOnSingleLine(body)
            ? emitBlockFunctionBodyOnSingleLine
            : emitBlockFunctionBodyWorker;

        emitBodyWithDetachedComments(body, body.statements, emitBlockFunctionBody);

        decreaseIndent();
        writeToken(SyntaxKind.CloseBraceToken, body.statements.end, writePunctuation, body);
        onAfterEmitNode?.(body);
    }

    function emitBlockFunctionBodyOnSingleLine(body: Block) {
        emitBlockFunctionBodyWorker(body, /*emitBlockFunctionBodyOnSingleLine*/ true);
    }

    function emitBlockFunctionBodyWorker(body: Block, emitBlockFunctionBodyOnSingleLine?: boolean) {
        // Emit all the prologue directives (like "use strict").
        const statementOffset = emitPrologueDirectives(body.statements);
        const pos = writer.getTextPos();
        emitHelpers(body);
        if (statementOffset === 0 && pos === writer.getTextPos() && emitBlockFunctionBodyOnSingleLine) {
            decreaseIndent();
            emitList(body, body.statements, ListFormat.SingleLineFunctionBodyStatements);
            increaseIndent();
        }
        else {
            emitList(body, body.statements, ListFormat.MultiLineFunctionBodyStatements, /*parenthesizerRule*/ undefined, statementOffset);
        }
    }

    function emitClassOrStructDeclaration(node: ClassDeclaration | StructDeclaration) {
        emitClassOrStructDeclarationOrExpression(node);
    }

    function emitClassOrStructDeclarationOrExpression(node: ClassDeclaration | ClassExpression | StructDeclaration) {
        forEach(node.members, generateMemberNames);

        emitDecoratorsAndModifiers(node, node.modifiers);
        if (isStructDeclaration(node)) {
            writeKeyword("struct");
        }
        else {
            writeKeyword("class");
        }
        if (node.name) {
            writeSpace();
            emitIdentifierName(node.name);
        }

        const indentedFlag = getEmitFlags(node) & EmitFlags.Indented;
        if (indentedFlag) {
            increaseIndent();
        }

        emitTypeParameters(node, node.typeParameters);
        emitList(node, node.heritageClauses, ListFormat.ClassHeritageClauses);

        writeSpace();
        writePunctuation("{");
        emitList(node, node.members, ListFormat.ClassMembers);
        writePunctuation("}");

        if (indentedFlag) {
            decreaseIndent();
        }
    }

    function emitInterfaceDeclaration(node: InterfaceDeclaration) {
        emitModifiers(node, node.modifiers);
        writeKeyword("interface");
        writeSpace();
        emit(node.name);
        emitTypeParameters(node, node.typeParameters);
        emitList(node, node.heritageClauses, ListFormat.HeritageClauses);
        writeSpace();
        writePunctuation("{");
        emitList(node, node.members, ListFormat.InterfaceMembers);
        writePunctuation("}");
    }

    function emitAnnotationDeclaration(node: AnnotationDeclaration): void {
        emitDecoratorsAndModifiers(node, node.modifiers);
        writeKeyword("@interface");

        if (node.name) {
            writeSpace();
            emitIdentifierName(node.name);
        }

        const indentedFlag = getEmitFlags(node) & EmitFlags.Indented;
        if (indentedFlag) {
            increaseIndent();
        }

        writeSpace();
        writePunctuation("{");
        emitList(node, node.members, ListFormat.ClassMembers);
        writePunctuation("}");

        if (indentedFlag) {
            decreaseIndent();
        }
    }

    function emitTypeAliasDeclaration(node: TypeAliasDeclaration) {
        if (isSendableFunctionOrType(node, /*maybeNotOriginalNode*/ true)) {
            emitDecorators(node, node.illegalDecorators);
        }
        emitModifiers(node, node.modifiers);
        writeKeyword("type");
        writeSpace();
        emit(node.name);
        emitTypeParameters(node, node.typeParameters);
        writeSpace();
        writePunctuation("=");
        writeSpace();
        emit(node.type);
        writeTrailingSemicolon();
    }

    function emitEnumDeclaration(node: EnumDeclaration) {
        emitModifiers(node, node.modifiers);
        writeKeyword("enum");
        writeSpace();
        emit(node.name);

        writeSpace();
        writePunctuation("{");
        emitList(node, node.members, ListFormat.EnumMembers);
        writePunctuation("}");
    }

    function emitModuleDeclaration(node: ModuleDeclaration) {
        emitModifiers(node, node.modifiers);
        if (~node.flags & NodeFlags.GlobalAugmentation) {
            writeKeyword(node.flags & NodeFlags.Namespace ? "namespace" : "module");
            writeSpace();
        }
        emit(node.name);

        let body = node.body;
        if (!body) return writeTrailingSemicolon();
        while (body && isModuleDeclaration(body)) {
            writePunctuation(".");
            emit(body.name);
            body = body.body;
        }

        writeSpace();
        emit(body);
    }

    function emitModuleBlock(node: ModuleBlock) {
        pushNameGenerationScope(node);
        forEach(node.statements, generateNames);
        emitBlockStatements(node, /*forceSingleLine*/ isEmptyBlock(node));
        popNameGenerationScope(node);
    }

    function emitCaseBlock(node: CaseBlock) {
        emitTokenWithComment(SyntaxKind.OpenBraceToken, node.pos, writePunctuation, node);
        emitList(node, node.clauses, ListFormat.CaseBlockClauses);
        emitTokenWithComment(SyntaxKind.CloseBraceToken, node.clauses.end, writePunctuation, node, /*indentLeading*/ true);
    }

    function emitImportEqualsDeclaration(node: ImportEqualsDeclaration) {
        emitModifiers(node, node.modifiers);
        emitTokenWithComment(SyntaxKind.ImportKeyword, node.modifiers ? node.modifiers.end : node.pos, writeKeyword, node);
        writeSpace();
        if (node.isTypeOnly) {
            emitTokenWithComment(SyntaxKind.TypeKeyword, node.pos, writeKeyword, node);
            writeSpace();
        }
        emit(node.name);
        writeSpace();
        emitTokenWithComment(SyntaxKind.EqualsToken, node.name.end, writePunctuation, node);
        writeSpace();
        emitModuleReference(node.moduleReference);
        writeTrailingSemicolon();
    }

    function emitModuleReference(node: ModuleReference) {
        if (node.kind === SyntaxKind.Identifier) {
            emitExpression(node);
        }
        else {
            emit(node);
        }
    }

    function emitImportDeclaration(node: ImportDeclaration) {
        emitModifiers(node, node.modifiers);
        emitTokenWithComment(SyntaxKind.ImportKeyword, node.modifiers ? node.modifiers.end : node.pos, writeKeyword, node);
        writeSpace();
        if (node.importClause) {
            emit(node.importClause);
            writeSpace();
            emitTokenWithComment(SyntaxKind.FromKeyword, node.importClause.end, writeKeyword, node);
            writeSpace();
        }
        emitExpression(node.moduleSpecifier);
        if (node.assertClause) {
            emitWithLeadingSpace(node.assertClause);
        }
        writeTrailingSemicolon();
    }

    function emitImportClause(node: ImportClause) {
        if (node.isTypeOnly) {
            emitTokenWithComment(SyntaxKind.TypeKeyword, node.pos, writeKeyword, node);
            writeSpace();
        }
        else if (node.isLazy) {
            emitTokenWithComment(SyntaxKind.LazyKeyword, node.pos, writeKeyword, node);
            writeSpace();
        }
        emit(node.name);
        if (node.name && node.namedBindings) {
            emitTokenWithComment(SyntaxKind.CommaToken, node.name.end, writePunctuation, node);
            writeSpace();
        }
        emit(node.namedBindings);
    }

    function emitNamespaceImport(node: NamespaceImport) {
        const asPos = emitTokenWithComment(SyntaxKind.AsteriskToken, node.pos, writePunctuation, node);
        writeSpace();
        emitTokenWithComment(SyntaxKind.AsKeyword, asPos, writeKeyword, node);
        writeSpace();
        emit(node.name);
    }

    function emitNamedImports(node: NamedImports) {
        emitNamedImportsOrExports(node);
    }

    function emitImportSpecifier(node: ImportSpecifier) {
        emitImportOrExportSpecifier(node);
    }

    function emitExportAssignment(node: ExportAssignment) {
        const nextPos = emitTokenWithComment(SyntaxKind.ExportKeyword, node.pos, writeKeyword, node);
        writeSpace();
        if (node.isExportEquals) {
            emitTokenWithComment(SyntaxKind.EqualsToken, nextPos, writeOperator, node);
        }
        else {
            emitTokenWithComment(SyntaxKind.DefaultKeyword, nextPos, writeKeyword, node);
        }
        writeSpace();
        emitExpression(node.expression, node.isExportEquals ?
            parenthesizer.getParenthesizeRightSideOfBinaryForOperator(SyntaxKind.EqualsToken) :
            parenthesizer.parenthesizeExpressionOfExportDefault);
        writeTrailingSemicolon();
    }

    function emitExportDeclaration(node: ExportDeclaration) {
        emitModifiers(node, node.modifiers);
        let nextPos = emitTokenWithComment(SyntaxKind.ExportKeyword, node.pos, writeKeyword, node);
        writeSpace();
        if (node.isTypeOnly) {
            nextPos = emitTokenWithComment(SyntaxKind.TypeKeyword, nextPos, writeKeyword, node);
            writeSpace();
        }
        if (node.exportClause) {
            emit(node.exportClause);
        }
        else {
            nextPos = emitTokenWithComment(SyntaxKind.AsteriskToken, nextPos, writePunctuation, node);
        }
        if (node.moduleSpecifier) {
            writeSpace();
            const fromPos = node.exportClause ? node.exportClause.end : nextPos;
            emitTokenWithComment(SyntaxKind.FromKeyword, fromPos, writeKeyword, node);
            writeSpace();
            emitExpression(node.moduleSpecifier);
        }
        if (node.assertClause) {
            emitWithLeadingSpace(node.assertClause);
        }
        writeTrailingSemicolon();
    }

    function emitAssertClause(node: AssertClause) {
        emitTokenWithComment(SyntaxKind.AssertKeyword, node.pos, writeKeyword, node);
        writeSpace();
        const elements = node.elements;
        emitList(node, elements, ListFormat.ImportClauseEntries);
    }

    function emitAssertEntry(node: AssertEntry) {
        emit(node.name);
        writePunctuation(":");
        writeSpace();

        const value = node.value;
        /** @see {emitPropertyAssignment} */
        if ((getEmitFlags(value) & EmitFlags.NoLeadingComments) === 0) {
            const commentRange = getCommentRange(value);
            emitTrailingCommentsOfPosition(commentRange.pos);
        }
        emit(value);
    }

    function emitNamespaceExportDeclaration(node: NamespaceExportDeclaration) {
        let nextPos = emitTokenWithComment(SyntaxKind.ExportKeyword, node.pos, writeKeyword, node);
        writeSpace();
        nextPos = emitTokenWithComment(SyntaxKind.AsKeyword, nextPos, writeKeyword, node);
        writeSpace();
        nextPos = emitTokenWithComment(SyntaxKind.NamespaceKeyword, nextPos, writeKeyword, node);
        writeSpace();
        emit(node.name);
        writeTrailingSemicolon();
    }

    function emitNamespaceExport(node: NamespaceExport) {
        const asPos = emitTokenWithComment(SyntaxKind.AsteriskToken, node.pos, writePunctuation, node);
        writeSpace();
        emitTokenWithComment(SyntaxKind.AsKeyword, asPos, writeKeyword, node);
        writeSpace();
        emit(node.name);
    }

    function emitNamedExports(node: NamedExports) {
        emitNamedImportsOrExports(node);
    }

    function emitExportSpecifier(node: ExportSpecifier) {
        emitImportOrExportSpecifier(node);
    }

    function emitNamedImportsOrExports(node: NamedImportsOrExports) {
        writePunctuation("{");
        emitList(node, node.elements, ListFormat.NamedImportsOrExportsElements);
        writePunctuation("}");
    }

    function emitImportOrExportSpecifier(node: ImportOrExportSpecifier) {
        if (node.isTypeOnly) {
            writeKeyword("type");
            writeSpace();
        }
        if (node.propertyName) {
            emit(node.propertyName);
            writeSpace();
            emitTokenWithComment(SyntaxKind.AsKeyword, node.propertyName.end, writeKeyword, node);
            writeSpace();
        }

        emit(node.name);
    }

    //
    // Module references
    //

    function emitExternalModuleReference(node: ExternalModuleReference) {
        writeKeyword("require");
        writePunctuation("(");
        emitExpression(node.expression);
        writePunctuation(")");
    }

    //
    // JSX
    //

    function emitJsxElement(node: JsxElement) {
        emit(node.openingElement);
        emitList(node, node.children, ListFormat.JsxElementOrFragmentChildren);
        emit(node.closingElement);
    }

    function emitJsxSelfClosingElement(node: JsxSelfClosingElement) {
        writePunctuation("<");
        emitJsxTagName(node.tagName);
        emitTypeArguments(node, node.typeArguments);
        writeSpace();
        emit(node.attributes);
        writePunctuation("/>");
    }

    function emitJsxFragment(node: JsxFragment) {
        emit(node.openingFragment);
        emitList(node, node.children, ListFormat.JsxElementOrFragmentChildren);
        emit(node.closingFragment);
    }

    function emitJsxOpeningElementOrFragment(node: JsxOpeningElement | JsxOpeningFragment) {
        writePunctuation("<");

        if (isJsxOpeningElement(node)) {
            const indented = writeLineSeparatorsAndIndentBefore(node.tagName, node);
            emitJsxTagName(node.tagName);
            emitTypeArguments(node, node.typeArguments);
            if (node.attributes.properties && node.attributes.properties.length > 0) {
                writeSpace();
            }
            emit(node.attributes);
            writeLineSeparatorsAfter(node.attributes, node);
            decreaseIndentIf(indented);
        }

        writePunctuation(">");
    }

    function emitJsxText(node: JsxText) {
        writer.writeLiteral(node.text);
    }

    function emitJsxClosingElementOrFragment(node: JsxClosingElement | JsxClosingFragment) {
        writePunctuation("</");
        if (isJsxClosingElement(node)) {
            emitJsxTagName(node.tagName);
        }
        writePunctuation(">");
    }

    function emitJsxAttributes(node: JsxAttributes) {
        emitList(node, node.properties, ListFormat.JsxElementAttributes);
    }

    function emitJsxAttribute(node: JsxAttribute) {
        emit(node.name);
        emitNodeWithPrefix("=", writePunctuation, node.initializer, emitJsxAttributeValue);
    }

    function emitJsxSpreadAttribute(node: JsxSpreadAttribute) {
        writePunctuation("{...");
        emitExpression(node.expression);
        writePunctuation("}");
    }

    function hasTrailingCommentsAtPosition(pos: number) {
        let result = false;
        forEachTrailingCommentRange(currentSourceFile?.text || "", pos + 1, () => result = true);
        return result;
    }

    function hasLeadingCommentsAtPosition(pos: number) {
        let result = false;
        forEachLeadingCommentRange(currentSourceFile?.text || "", pos + 1, () => result = true);
        return result;
    }

    function hasCommentsAtPosition(pos: number) {
        return hasTrailingCommentsAtPosition(pos) || hasLeadingCommentsAtPosition(pos);
    }

    function emitJsxExpression(node: JsxExpression) {
        if (node.expression || (!commentsDisabled && !nodeIsSynthesized(node) && hasCommentsAtPosition(node.pos))) { // preserve empty expressions if they contain comments!
            const isMultiline = currentSourceFile && !nodeIsSynthesized(node) && getLineAndCharacterOfPosition(currentSourceFile, node.pos).line !== getLineAndCharacterOfPosition(currentSourceFile, node.end).line;
            if (isMultiline) {
                writer.increaseIndent();
            }
            const end = emitTokenWithComment(SyntaxKind.OpenBraceToken, node.pos, writePunctuation, node);
            emit(node.dotDotDotToken);
            emitExpression(node.expression);
            emitTokenWithComment(SyntaxKind.CloseBraceToken, node.expression?.end || end, writePunctuation, node);
            if (isMultiline) {
                writer.decreaseIndent();
            }
        }
    }

    function emitJsxTagName(node: JsxTagNameExpression) {
        if (node.kind === SyntaxKind.Identifier) {
            emitExpression(node);
        }
        else {
            emit(node);
        }
    }

    //
    // Clauses
    //

    function emitCaseClause(node: CaseClause) {
        emitTokenWithComment(SyntaxKind.CaseKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);

        emitCaseOrDefaultClauseRest(node, node.statements, node.expression.end);
    }

    function emitDefaultClause(node: DefaultClause) {
        const pos = emitTokenWithComment(SyntaxKind.DefaultKeyword, node.pos, writeKeyword, node);
        emitCaseOrDefaultClauseRest(node, node.statements, pos);
    }

    function emitCaseOrDefaultClauseRest(parentNode: Node, statements: NodeArray<Statement>, colonPos: number) {
        const emitAsSingleStatement =
            statements.length === 1 &&
            (
                // treat synthesized nodes as located on the same line for emit purposes
                !currentSourceFile ||
                nodeIsSynthesized(parentNode) ||
                nodeIsSynthesized(statements[0]) ||
                rangeStartPositionsAreOnSameLine(parentNode, statements[0], currentSourceFile)
            );

        let format = ListFormat.CaseOrDefaultClauseStatements;
        if (emitAsSingleStatement) {
            writeToken(SyntaxKind.ColonToken, colonPos, writePunctuation, parentNode);
            writeSpace();
            format &= ~(ListFormat.MultiLine | ListFormat.Indented);
        }
        else {
            emitTokenWithComment(SyntaxKind.ColonToken, colonPos, writePunctuation, parentNode);
        }
        emitList(parentNode, statements, format);
    }

    function emitHeritageClause(node: HeritageClause) {
        writeSpace();
        writeTokenText(node.token, writeKeyword);
        writeSpace();
        emitList(node, node.types, ListFormat.HeritageClauseTypes);
    }

    function emitCatchClause(node: CatchClause) {
        const openParenPos = emitTokenWithComment(SyntaxKind.CatchKeyword, node.pos, writeKeyword, node);
        writeSpace();
        if (node.variableDeclaration) {
            emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
            emit(node.variableDeclaration);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.variableDeclaration.end, writePunctuation, node);
            writeSpace();
        }
        emit(node.block);
    }

    //
    // Property assignments
    //

    function emitPropertyAssignment(node: PropertyAssignment) {
        emit(node.name);
        writePunctuation(":");
        writeSpace();
        // This is to ensure that we emit comment in the following case:
        //      For example:
        //          obj = {
        //              id: /*comment1*/ ()=>void
        //          }
        // "comment1" is not considered to be leading comment for node.initializer
        // but rather a trailing comment on the previous node.
        const initializer = node.initializer;
        if ((getEmitFlags(initializer) & EmitFlags.NoLeadingComments) === 0) {
            const commentRange = getCommentRange(initializer);
            emitTrailingCommentsOfPosition(commentRange.pos);
        }
        emitExpression(initializer, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitShorthandPropertyAssignment(node: ShorthandPropertyAssignment) {
        emit(node.name);
        if (node.objectAssignmentInitializer) {
            writeSpace();
            writePunctuation("=");
            writeSpace();
            emitExpression(node.objectAssignmentInitializer, parenthesizer.parenthesizeExpressionForDisallowedComma);
        }
    }

    function emitSpreadAssignment(node: SpreadAssignment) {
        if (node.expression) {
            emitTokenWithComment(SyntaxKind.DotDotDotToken, node.pos, writePunctuation, node);
            emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);
        }
    }

    //
    // Enum
    //

    function emitEnumMember(node: EnumMember) {
        emit(node.name);
        emitInitializer(node.initializer, node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    //
    // JSDoc
    //
    function emitJSDoc(node: JSDoc) {
        write("/**");
        if (node.comment) {
            const text = getTextOfJSDocComment(node.comment);
            if (text) {
                const lines = text.split(/\r\n?|\n/g);
                for (const line of lines) {
                    writeLine();
                    writeSpace();
                    writePunctuation("*");
                    writeSpace();
                    write(line);
                }
            }
        }
        if (node.tags) {
            if (node.tags.length === 1 && node.tags[0].kind === SyntaxKind.JSDocTypeTag && !node.comment) {
                writeSpace();
                emit(node.tags[0]);
            }
            else {
                emitList(node, node.tags, ListFormat.JSDocComment);
            }
        }
        writeSpace();
        write("*/");
    }

    function emitJSDocSimpleTypedTag(tag: JSDocTypeTag | JSDocThisTag | JSDocEnumTag | JSDocReturnTag) {
        emitJSDocTagName(tag.tagName);
        emitJSDocTypeExpression(tag.typeExpression);
        emitJSDocComment(tag.comment);
    }

    function emitJSDocSeeTag(tag: JSDocSeeTag) {
        emitJSDocTagName(tag.tagName);
        emit(tag.name);
        emitJSDocComment(tag.comment);
    }

    function emitJSDocNameReference(node: JSDocNameReference) {
        writeSpace();
        writePunctuation("{");
        emit(node.name);
        writePunctuation("}");
    }

    function emitJSDocHeritageTag(tag: JSDocImplementsTag | JSDocAugmentsTag) {
        emitJSDocTagName(tag.tagName);
        writeSpace();
        writePunctuation("{");
        emit(tag.class);
        writePunctuation("}");
        emitJSDocComment(tag.comment);
    }

    function emitJSDocTemplateTag(tag: JSDocTemplateTag) {
        emitJSDocTagName(tag.tagName);
        emitJSDocTypeExpression(tag.constraint);
        writeSpace();
        emitList(tag, tag.typeParameters, ListFormat.CommaListElements);
        emitJSDocComment(tag.comment);
    }

    function emitJSDocTypedefTag(tag: JSDocTypedefTag) {
        emitJSDocTagName(tag.tagName);
        if (tag.typeExpression) {
            if (tag.typeExpression.kind === SyntaxKind.JSDocTypeExpression) {
                emitJSDocTypeExpression(tag.typeExpression);
            }
            else {
                writeSpace();
                writePunctuation("{");
                write("Object");
                if (tag.typeExpression.isArrayType) {
                    writePunctuation("[");
                    writePunctuation("]");
                }
                writePunctuation("}");
            }
        }
        if (tag.fullName) {
            writeSpace();
            emit(tag.fullName);
        }
        emitJSDocComment(tag.comment);
        if (tag.typeExpression && tag.typeExpression.kind === SyntaxKind.JSDocTypeLiteral) {
            emitJSDocTypeLiteral(tag.typeExpression);
        }
    }

    function emitJSDocCallbackTag(tag: JSDocCallbackTag) {
        emitJSDocTagName(tag.tagName);
        if (tag.name) {
            writeSpace();
            emit(tag.name);
        }
        emitJSDocComment(tag.comment);
        emitJSDocSignature(tag.typeExpression);
    }

    function emitJSDocSimpleTag(tag: JSDocTag) {
        emitJSDocTagName(tag.tagName);
        emitJSDocComment(tag.comment);
    }

    function emitJSDocTypeLiteral(lit: JSDocTypeLiteral) {
        emitList(lit, factory.createNodeArray(lit.jsDocPropertyTags), ListFormat.JSDocComment);
    }

    function emitJSDocSignature(sig: JSDocSignature) {
        if (sig.typeParameters) {
            emitList(sig, factory.createNodeArray(sig.typeParameters), ListFormat.JSDocComment);
        }
        if (sig.parameters) {
            emitList(sig, factory.createNodeArray(sig.parameters), ListFormat.JSDocComment);
        }
        if (sig.type) {
            writeLine();
            writeSpace();
            writePunctuation("*");
            writeSpace();
            emit(sig.type);
        }
    }

    function emitJSDocPropertyLikeTag(param: JSDocPropertyLikeTag) {
        emitJSDocTagName(param.tagName);
        emitJSDocTypeExpression(param.typeExpression);
        writeSpace();
        if (param.isBracketed) {
            writePunctuation("[");
        }
        emit(param.name);
        if (param.isBracketed) {
            writePunctuation("]");
        }
        emitJSDocComment(param.comment);
    }

    function emitJSDocTagName(tagName: Identifier) {
        writePunctuation("@");
        emit(tagName);
    }

    function emitJSDocComment(comment: string | NodeArray<JSDocComment> | undefined) {
        const text = getTextOfJSDocComment(comment);
        if (text) {
            writeSpace();
            write(text);
        }
    }

    function emitJSDocTypeExpression(typeExpression: JSDocTypeExpression | undefined) {
        if (typeExpression) {
            writeSpace();
            writePunctuation("{");
            emit(typeExpression.type);
            writePunctuation("}");
        }
    }

    //
    // Top-level nodes
    //

    function emitSourceFile(node: SourceFile) {
        writeLine();
        // @ts-ignore
        if (node.writeTsHarComments) {
            writeComment('// @keepTs\n// @ts-nocheck\n');
        }
        const statements = node.statements;
        // Emit detached comment if there are no prologue directives or if the first node is synthesized.
        // The synthesized node will have no leading comment so some comments may be missed.
        const shouldEmitDetachedComment = statements.length === 0 ||
            !isPrologueDirective(statements[0]) ||
            nodeIsSynthesized(statements[0]);
        if (shouldEmitDetachedComment) {
            emitBodyWithDetachedComments(node, statements, emitSourceFileWorker);
            return;
        }
        emitSourceFileWorker(node);
    }

    function emitSyntheticTripleSlashReferencesIfNeeded(node: Bundle) {
        emitTripleSlashDirectives(!!node.hasNoDefaultLib, node.syntheticFileReferences || [], node.syntheticTypeReferences || [], node.syntheticLibReferences || []);
        for (const prepend of node.prepends) {
            if (isUnparsedSource(prepend) && prepend.syntheticReferences) {
                for (const ref of prepend.syntheticReferences) {
                    emit(ref);
                    writeLine();
                }
            }
        }
    }

    function emitTripleSlashDirectivesIfNeeded(node: SourceFile) {
        if (node.isDeclarationFile) emitTripleSlashDirectives(node.hasNoDefaultLib, node.referencedFiles, node.typeReferenceDirectives, node.libReferenceDirectives);
    }

    function emitTripleSlashDirectives(hasNoDefaultLib: boolean, files: readonly FileReference[], types: readonly FileReference[], libs: readonly FileReference[]) {
        if (hasNoDefaultLib) {
            const pos = writer.getTextPos();
            writeComment(`/// <reference no-default-lib="true"/>`);
            if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.NoDefaultLib });
            writeLine();
        }
        if (currentSourceFile && currentSourceFile.moduleName) {
            writeComment(`/// <amd-module name="${currentSourceFile.moduleName}" />`);
            writeLine();
        }
        if (currentSourceFile && currentSourceFile.amdDependencies) {
            for (const dep of currentSourceFile.amdDependencies) {
                if (dep.name) {
                    writeComment(`/// <amd-dependency name="${dep.name}" path="${dep.path}" />`);
                }
                else {
                    writeComment(`/// <amd-dependency path="${dep.path}" />`);
                }
                writeLine();
            }
        }
        for (const directive of files) {
            const pos = writer.getTextPos();
            writeComment(`/// <reference path="${directive.fileName}" />`);
            if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.Reference, data: directive.fileName });
            writeLine();
        }
        for (const directive of types) {
            const pos = writer.getTextPos();
            const resolutionMode = directive.resolutionMode && directive.resolutionMode !== currentSourceFile?.impliedNodeFormat
                ? `resolution-mode="${directive.resolutionMode === ModuleKind.ESNext ? "import" : "require"}"`
                : "";
            writeComment(`/// <reference types="${directive.fileName}" ${resolutionMode}/>`);
            if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: !directive.resolutionMode ? BundleFileSectionKind.Type : directive.resolutionMode === ModuleKind.ESNext ? BundleFileSectionKind.TypeResolutionModeImport : BundleFileSectionKind.TypeResolutionModeRequire, data: directive.fileName });
            writeLine();
        }
        for (const directive of libs) {
            const pos = writer.getTextPos();
            writeComment(`/// <reference lib="${directive.fileName}" />`);
            if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.Lib, data: directive.fileName });
            writeLine();
        }
    }

    function emitSourceFileWorker(node: SourceFile) {
        const statements = node.statements;
        pushNameGenerationScope(node);
        forEach(node.statements, generateNames);
        emitHelpers(node);
        const index = findIndex(statements, statement => !isPrologueDirective(statement));
        emitTripleSlashDirectivesIfNeeded(node);
        emitList(node, statements, ListFormat.MultiLine, /*parenthesizerRule*/ undefined, index === -1 ? statements.length : index);
        popNameGenerationScope(node);
    }

    // Transformation nodes

    function emitPartiallyEmittedExpression(node: PartiallyEmittedExpression) {
        const emitFlags = getEmitFlags(node);
        if (!(emitFlags & EmitFlags.NoLeadingComments) && node.pos !== node.expression.pos) {
            emitTrailingCommentsOfPosition(node.expression.pos);
        }
        emitExpression(node.expression);
        if (!(emitFlags & EmitFlags.NoTrailingComments) && node.end !== node.expression.end) {
            emitLeadingCommentsOfPosition(node.expression.end);
        }
    }

    function emitCommaList(node: CommaListExpression) {
        emitExpressionList(node, node.elements, ListFormat.CommaListElements, /*parenthesizerRule*/ undefined);
    }

    /**
     * Emits any prologue directives at the start of a Statement list, returning the
     * number of prologue directives written to the output.
     */
    function emitPrologueDirectives(statements: readonly Node[], sourceFile?: SourceFile, seenPrologueDirectives?: Set<string>, recordBundleFileSection?: true): number {
        let needsToSetSourceFile = !!sourceFile;
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (isPrologueDirective(statement)) {
                const shouldEmitPrologueDirective = seenPrologueDirectives ? !seenPrologueDirectives.has(statement.expression.text) : true;
                if (shouldEmitPrologueDirective) {
                    if (needsToSetSourceFile) {
                        needsToSetSourceFile = false;
                        setSourceFile(sourceFile);
                    }
                    writeLine();
                    const pos = writer.getTextPos();
                    emit(statement);
                    if (recordBundleFileSection && bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.Prologue, data: statement.expression.text });
                    if (seenPrologueDirectives) {
                        seenPrologueDirectives.add(statement.expression.text);
                    }
                }
            }
            else {
                // return index of the first non prologue directive
                return i;
            }
        }

        return statements.length;
    }

    function emitUnparsedPrologues(prologues: readonly UnparsedPrologue[], seenPrologueDirectives: Set<string>) {
        for (const prologue of prologues) {
            if (!seenPrologueDirectives.has(prologue.data)) {
                writeLine();
                const pos = writer.getTextPos();
                emit(prologue);
                if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.Prologue, data: prologue.data });
                if (seenPrologueDirectives) {
                    seenPrologueDirectives.add(prologue.data);
                }
            }
        }
    }

    function emitPrologueDirectivesIfNeeded(sourceFileOrBundle: Bundle | SourceFile) {
        if (isSourceFile(sourceFileOrBundle)) {
            emitPrologueDirectives(sourceFileOrBundle.statements, sourceFileOrBundle);
        }
        else {
            const seenPrologueDirectives = new Set<string>();
            for (const prepend of sourceFileOrBundle.prepends) {
                emitUnparsedPrologues((prepend as UnparsedSource).prologues, seenPrologueDirectives);
            }
            for (const sourceFile of sourceFileOrBundle.sourceFiles) {
                emitPrologueDirectives(sourceFile.statements, sourceFile, seenPrologueDirectives, /*recordBundleFileSection*/ true);
            }
            setSourceFile(undefined);
        }
    }

    function getPrologueDirectivesFromBundledSourceFiles(bundle: Bundle): SourceFilePrologueInfo[] | undefined {
        const seenPrologueDirectives = new Set<string>();
        let prologues: SourceFilePrologueInfo[] | undefined;
        for (let index = 0; index < bundle.sourceFiles.length; index++) {
            const sourceFile = bundle.sourceFiles[index];
            let directives: SourceFilePrologueDirective[] | undefined;
            let end = 0;
            for (const statement of sourceFile.statements) {
                if (!isPrologueDirective(statement)) break;
                if (seenPrologueDirectives.has(statement.expression.text)) continue;
                seenPrologueDirectives.add(statement.expression.text);
                (directives || (directives = [])).push({
                    pos: statement.pos,
                    end: statement.end,
                    expression: {
                        pos: statement.expression.pos,
                        end: statement.expression.end,
                        text: statement.expression.text
                    }
                });
                end = end < statement.end ? statement.end : end;
            }
            if (directives) (prologues || (prologues = [])).push({ file: index, text: sourceFile.text.substring(0, end), directives });
        }
        return prologues;
    }

    function emitShebangIfNeeded(sourceFileOrBundle: Bundle | SourceFile | UnparsedSource) {
        if (isSourceFile(sourceFileOrBundle) || isUnparsedSource(sourceFileOrBundle)) {
            const shebang = getShebang(sourceFileOrBundle.text);
            if (shebang) {
                writeComment(shebang);
                writeLine();
                return true;
            }
        }
        else {
            for (const prepend of sourceFileOrBundle.prepends) {
                Debug.assertNode(prepend, isUnparsedSource);
                if (emitShebangIfNeeded(prepend)) {
                    return true;
                }
            }
            for (const sourceFile of sourceFileOrBundle.sourceFiles) {
                // Emit only the first encountered shebang
                if (emitShebangIfNeeded(sourceFile)) {
                    return true;
                }
            }
        }
    }

    //
    // Helpers
    //

    function emitNodeWithWriter(node: Node | undefined, writer: typeof write) {
        if (!node) return;
        const savedWrite = write;
        write = writer;
        emit(node);
        write = savedWrite;
    }

    function emitDecoratorsAndModifiers(node: Node, modifiers: NodeArray<ModifierLike> | undefined) {
        if (modifiers?.length) {
            if (every(modifiers, isModifier)) {
                // if all modifier-likes are `Modifier`, simply emit the array as modifiers.
                return emitModifiers(node, modifiers as NodeArray<Modifier>);
            }

            if (every(modifiers, isDecoratorOrAnnotation)) {
                // if all modifier-likes are `Decorator`, simply emit the array as decorators.
                return emitDecorators(node, modifiers as NodeArray<Decorator>);
            }

            onBeforeEmitNodeArray?.(modifiers);

            // partition modifiers into contiguous chunks of `Modifier` or `Decorator`
            let lastMode: "modifiers" | "decorators" | undefined;
            let mode: "modifiers" | "decorators" | undefined;
            let start = 0;
            let pos = 0;
            while (start < modifiers.length) {
                while (pos < modifiers.length) {
                    const modifier = modifiers[pos];
                    mode = isDecoratorOrAnnotation(modifier) ? "decorators" : "modifiers";
                    if (lastMode === undefined) {
                        lastMode = mode;
                    }
                    else if (mode !== lastMode) {
                        break;
                    }

                    pos++;
                }

                const textRange: TextRange = { pos: -1, end: -1 };
                if (start === 0) textRange.pos = modifiers.pos;
                if (pos === modifiers.length - 1) textRange.end = modifiers.end;
                emitNodeListItems(
                    emit,
                    node,
                    modifiers,
                    lastMode === "modifiers" ? ListFormat.Modifiers : ListFormat.Decorators,
                    /*parenthesizerRule*/ undefined,
                    start,
                    pos - start,
                    /*hasTrailingComma*/ false,
                    textRange);
                start = pos;
                lastMode = mode;
                pos++;
            }

            onAfterEmitNodeArray?.(modifiers);
        }
    }

    function emitModifiers(node: Node, modifiers: NodeArray<Modifier> | undefined): void {
        emitList(node, modifiers, ListFormat.Modifiers);
    }

    function emitTypeAnnotation(node: TypeNode | undefined) {
        if (node) {
            writePunctuation(":");
            writeSpace();
            emit(node);
        }
    }

    function emitInitializer(node: Expression | undefined, equalCommentStartPos: number, container: Node, parenthesizerRule?: (node: Expression) => Expression) {
        if (node) {
            writeSpace();
            emitTokenWithComment(SyntaxKind.EqualsToken, equalCommentStartPos, writeOperator, container);
            writeSpace();
            emitExpression(node, parenthesizerRule);
        }
    }

    function emitNodeWithPrefix<T extends Node>(prefix: string, prefixWriter: (s: string) => void, node: T | undefined, emit: (node: T) => void) {
        if (node) {
            prefixWriter(prefix);
            emit(node);
        }
    }

    function emitWithLeadingSpace(node: Node | undefined) {
        if (node) {
            writeSpace();
            emit(node);
        }
    }

    function emitExpressionWithLeadingSpace(node: Expression | undefined, parenthesizerRule?: (node: Expression) => Expression) {
        if (node) {
            writeSpace();
            emitExpression(node, parenthesizerRule);
        }
    }

    function emitWithTrailingSpace(node: Node | undefined) {
        if (node) {
            emit(node);
            writeSpace();
        }
    }

    function emitEmbeddedStatement(parent: Node, node: Statement) {
        if (isBlock(node) || getEmitFlags(parent) & EmitFlags.SingleLine) {
            writeSpace();
            emit(node);
        }
        else {
            writeLine();
            increaseIndent();
            if (isEmptyStatement(node)) {
                pipelineEmit(EmitHint.EmbeddedStatement, node);
            }
            else {
                emit(node);
            }
            decreaseIndent();
        }
    }

    function emitDecorators(parentNode: Node, decorators: NodeArray<Decorator> | undefined): void {
        emitList(parentNode, decorators, ListFormat.Decorators);
    }

    function emitTypeArguments(parentNode: Node, typeArguments: NodeArray<TypeNode> | undefined) {
        emitList(parentNode, typeArguments, ListFormat.TypeArguments, typeArgumentParenthesizerRuleSelector);
    }

    function emitTypeParameters(parentNode: SignatureDeclaration | InterfaceDeclaration | TypeAliasDeclaration | ClassDeclaration | ClassExpression | StructDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined) {
        if (isFunctionLike(parentNode) && parentNode.typeArguments) { // Quick info uses type arguments in place of type parameters on instantiated signatures
            return emitTypeArguments(parentNode, parentNode.typeArguments);
        }
        emitList(parentNode, typeParameters, ListFormat.TypeParameters);
    }

    function emitParameters(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
        emitList(parentNode, parameters, ListFormat.Parameters);
    }

    function canEmitSimpleArrowHead(parentNode: FunctionTypeNode | ArrowFunction, parameters: NodeArray<ParameterDeclaration>) {
        const parameter = singleOrUndefined(parameters);
        return parameter
            && parameter.pos === parentNode.pos // may not have parsed tokens between parent and parameter
            && isArrowFunction(parentNode)      // only arrow functions may have simple arrow head
            && !parentNode.type                 // arrow function may not have return type annotation
            && !some(parentNode.modifiers)      // parent may not have decorators or modifiers
            && !some(parentNode.typeParameters) // parent may not have type parameters
            && !some(parameter.modifiers)       // parameter may not have decorators or modifiers
            && !parameter.dotDotDotToken        // parameter may not be rest
            && !parameter.questionToken         // parameter may not be optional
            && !parameter.type                  // parameter may not have a type annotation
            && !parameter.initializer           // parameter may not have an initializer
            && isIdentifier(parameter.name);    // parameter name must be identifier
    }

    function emitParametersForArrow(parentNode: FunctionTypeNode | ArrowFunction, parameters: NodeArray<ParameterDeclaration>) {
        if (canEmitSimpleArrowHead(parentNode, parameters)) {
            emitList(parentNode, parameters, ListFormat.Parameters & ~ListFormat.Parenthesis);
        }
        else {
            emitParameters(parentNode, parameters);
        }
    }

    function emitParametersForIndexSignature(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
        emitList(parentNode, parameters, ListFormat.IndexSignatureParameters);
    }

    function writeDelimiter(format: ListFormat) {
        switch (format & ListFormat.DelimitersMask) {
            case ListFormat.None:
                break;
            case ListFormat.CommaDelimited:
                writePunctuation(",");
                break;
            case ListFormat.BarDelimited:
                writeSpace();
                writePunctuation("|");
                break;
            case ListFormat.AsteriskDelimited:
                writeSpace();
                writePunctuation("*");
                writeSpace();
                break;
            case ListFormat.AmpersandDelimited:
                writeSpace();
                writePunctuation("&");
                break;
        }
    }

    function emitList(parentNode: Node | undefined, children: NodeArray<Node> | undefined, format: ListFormat, parenthesizerRule?: ParenthesizerRuleOrSelector<Node>, start?: number, count?: number) {
        emitNodeList(emit, parentNode, children, format, parenthesizerRule, start, count);
    }

    function emitExpressionList(parentNode: Node | undefined, children: NodeArray<Node> | undefined, format: ListFormat, parenthesizerRule?: ParenthesizerRuleOrSelector<Expression>, start?: number, count?: number) {
        emitNodeList(emitExpression, parentNode, children, format, parenthesizerRule, start, count);
    }

    function emitNodeList(emit: (node: Node, parenthesizerRule?: ((node: Node) => Node) | undefined) => void, parentNode: Node | undefined, children: NodeArray<Node> | undefined, format: ListFormat, parenthesizerRule: ParenthesizerRuleOrSelector<Node> | undefined, start = 0, count = children ? children.length - start : 0) {
        const isUndefined = children === undefined;
        if (isUndefined && format & ListFormat.OptionalIfUndefined) {
            return;
        }

        const isEmpty = children === undefined || start >= children.length || count === 0;
        if (isEmpty && format & ListFormat.OptionalIfEmpty) {
            onBeforeEmitNodeArray?.(children);
            onAfterEmitNodeArray?.(children);
            return;
        }

        if (format & ListFormat.BracketsMask) {
            writePunctuation(getOpeningBracket(format));
            if (isEmpty && children) {
                emitTrailingCommentsOfPosition(children.pos, /*prefixSpace*/ true); // Emit comments within empty bracketed lists
            }
        }

        onBeforeEmitNodeArray?.(children);

        if (isEmpty) {
            // Write a line terminator if the parent node was multi-line
            if (format & ListFormat.MultiLine && !(preserveSourceNewlines && (!parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile)))) {
                writeLine();
            }
            else if (format & ListFormat.SpaceBetweenBraces && !(format & ListFormat.NoSpaceIfEmpty)) {
                writeSpace();
            }
        }
        else {
            emitNodeListItems(emit, parentNode, children, format, parenthesizerRule, start, count, children.hasTrailingComma, children);
        }

        onAfterEmitNodeArray?.(children);

        if (format & ListFormat.BracketsMask) {
            if (isEmpty && children) {
                emitLeadingCommentsOfPosition(children.end); // Emit leading comments within empty lists
            }
            writePunctuation(getClosingBracket(format));
        }
    }

    /**
     * Emits a list without brackets or raising events.
     *
     * NOTE: You probably don't want to call this directly and should be using `emitList` or `emitExpressionList` instead.
     */
    function emitNodeListItems(emit: (node: Node, parenthesizerRule?: ((node: Node) => Node) | undefined) => void, parentNode: Node | undefined, children: readonly Node[], format: ListFormat, parenthesizerRule: ParenthesizerRuleOrSelector<Node> | undefined, start: number, count: number, hasTrailingComma: boolean, childrenTextRange: TextRange | undefined) {
        // Write the opening line terminator or leading whitespace.
        const mayEmitInterveningComments = (format & ListFormat.NoInterveningComments) === 0;
        let shouldEmitInterveningComments = mayEmitInterveningComments;

        const leadingLineTerminatorCount = getLeadingLineTerminatorCount(parentNode, children[start], format);
        if (leadingLineTerminatorCount) {
            writeLine(leadingLineTerminatorCount);
            shouldEmitInterveningComments = false;
        }
        else if (format & ListFormat.SpaceBetweenBraces) {
            writeSpace();
        }

        // Increase the indent, if requested.
        if (format & ListFormat.Indented) {
            increaseIndent();
        }

        const emitListItem = getEmitListItem(emit, parenthesizerRule);

        // Emit each child.
        let previousSibling: Node | undefined;
        let previousSourceFileTextKind: ReturnType<typeof recordBundleFileInternalSectionStart>;
        let shouldDecreaseIndentAfterEmit = false;
        for (let i = 0; i < count; i++) {
            const child = children[start + i];

            // Write the delimiter if this is not the first node.
            if (format & ListFormat.AsteriskDelimited) {
                // always write JSDoc in the format "\n *"
                writeLine();
                writeDelimiter(format);
            }
            else if (previousSibling) {
                // i.e
                //      function commentedParameters(
                //          /* Parameter a */
                //          a
                //          /* End of parameter a */ -> this comment isn't considered to be trailing comment of parameter "a" due to newline
                //          ,
                if (format & ListFormat.DelimitersMask && previousSibling.end !== (parentNode ? parentNode.end : -1)) {
                    emitLeadingCommentsOfPosition(previousSibling.end);
                }
                writeDelimiter(format);
                recordBundleFileInternalSectionEnd(previousSourceFileTextKind);

                // Write either a line terminator or whitespace to separate the elements.
                const separatingLineTerminatorCount = getSeparatingLineTerminatorCount(previousSibling, child, format);
                if (separatingLineTerminatorCount > 0) {
                    // If a synthesized node in a single-line list starts on a new
                    // line, we should increase the indent.
                    if ((format & (ListFormat.LinesMask | ListFormat.Indented)) === ListFormat.SingleLine) {
                        increaseIndent();
                        shouldDecreaseIndentAfterEmit = true;
                    }

                    writeLine(separatingLineTerminatorCount);
                    shouldEmitInterveningComments = false;
                }
                else if (previousSibling && format & ListFormat.SpaceBetweenSiblings) {
                    writeSpace();
                }
            }

            // Emit this child.
            previousSourceFileTextKind = recordBundleFileInternalSectionStart(child);
            if (shouldEmitInterveningComments) {
                const commentRange = getCommentRange(child);
                emitTrailingCommentsOfPosition(commentRange.pos);
            }
            else {
                shouldEmitInterveningComments = mayEmitInterveningComments;
            }

            nextListElementPos = child.pos;
            emitListItem(child, emit, parenthesizerRule, i);

            if (shouldDecreaseIndentAfterEmit) {
                decreaseIndent();
                shouldDecreaseIndentAfterEmit = false;
            }

            previousSibling = child;
        }

        // Write a trailing comma, if requested.
        const emitFlags = previousSibling ? getEmitFlags(previousSibling) : 0;
        const skipTrailingComments = commentsDisabled || !!(emitFlags & EmitFlags.NoTrailingComments);
        const emitTrailingComma = hasTrailingComma && (format & ListFormat.AllowTrailingComma) && (format & ListFormat.CommaDelimited);
        if (emitTrailingComma) {
            if (previousSibling && !skipTrailingComments) {
                emitTokenWithComment(SyntaxKind.CommaToken, previousSibling.end, writePunctuation, previousSibling);
            }
            else {
                writePunctuation(",");
            }
        }

        // Emit any trailing comment of the last element in the list
        // i.e
        //       var array = [...
        //          2
        //          /* end of element 2 */
        //       ];
        if (previousSibling && (parentNode ? parentNode.end : -1) !== previousSibling.end && (format & ListFormat.DelimitersMask) && !skipTrailingComments) {
            emitLeadingCommentsOfPosition(emitTrailingComma && childrenTextRange?.end ? childrenTextRange.end : previousSibling.end);
        }

        // Decrease the indent, if requested.
        if (format & ListFormat.Indented) {
            decreaseIndent();
        }

        recordBundleFileInternalSectionEnd(previousSourceFileTextKind);

        // Write the closing line terminator or closing whitespace.
        const closingLineTerminatorCount = getClosingLineTerminatorCount(parentNode, children[start + count - 1], format, childrenTextRange);
        if (closingLineTerminatorCount) {
            writeLine(closingLineTerminatorCount);
        }
        else if (format & (ListFormat.SpaceAfterList | ListFormat.SpaceBetweenBraces)) {
            writeSpace();
        }
    }

    // Writers

    function writeLiteral(s: string) {
        writer.writeLiteral(s);
    }

    function writeStringLiteral(s: string) {
        writer.writeStringLiteral(s);
    }

    function writeBase(s: string) {
        writer.write(s);
    }

    function writeSymbol(s: string, sym: Symbol) {
        writer.writeSymbol(s, sym);
    }

    function writePunctuation(s: string) {
        writer.writePunctuation(s);
    }

    function writeTrailingSemicolon() {
        writer.writeTrailingSemicolon(";");
    }

    function writeKeyword(s: string) {
        writer.writeKeyword(s);
    }

    function writeOperator(s: string) {
        writer.writeOperator(s);
    }

    function writeParameter(s: string) {
        writer.writeParameter(s);
    }

    function writeComment(s: string) {
        writer.writeComment(s);
    }

    function writeSpace() {
        writer.writeSpace(" ");
    }

    function writeProperty(s: string) {
        writer.writeProperty(s);
    }

    function nonEscapingWrite(s: string) {
        // This should be defined in a snippet-escaping text writer.
        if (writer.nonEscapingWrite) {
            writer.nonEscapingWrite(s);
        }
        else {
            writer.write(s);
        }
    }

    function writeLine(count = 1) {
        for (let i = 0; i < count; i++) {
            writer.writeLine(i > 0);
        }
    }

    function increaseIndent() {
        writer.increaseIndent();
    }

    function decreaseIndent() {
        writer.decreaseIndent();
    }

    function writeToken(token: SyntaxKind, pos: number, writer: (s: string) => void, contextNode?: Node) {
        return !sourceMapsDisabled
            ? emitTokenWithSourceMap(contextNode, token, writer, pos, writeTokenText)
            : writeTokenText(token, writer, pos);
    }

    function writeTokenNode(node: Node, writer: (s: string) => void) {
        if (onBeforeEmitToken) {
            onBeforeEmitToken(node);
        }
        writer(tokenToString(node.kind)!);
        if (onAfterEmitToken) {
            onAfterEmitToken(node);
        }
    }

    function writeTokenText(token: SyntaxKind, writer: (s: string) => void): void;
    function writeTokenText(token: SyntaxKind, writer: (s: string) => void, pos: number): number;
    function writeTokenText(token: SyntaxKind, writer: (s: string) => void, pos?: number): number {
        const tokenString = tokenToString(token)!;
        writer(tokenString);
        return pos! < 0 ? pos! : pos! + tokenString.length;
    }

    function writeLineOrSpace(parentNode: Node, prevChildNode: Node, nextChildNode: Node) {
        if (getEmitFlags(parentNode) & EmitFlags.SingleLine) {
            writeSpace();
        }
        else if (preserveSourceNewlines) {
            const lines = getLinesBetweenNodes(parentNode, prevChildNode, nextChildNode);
            if (lines) {
                writeLine(lines);
            }
            else {
                writeSpace();
            }
        }
        else {
            writeLine();
        }
    }

    function writeLines(text: string): void {
        const lines = text.split(/\r\n?|\n/g);
        const indentation = guessIndentation(lines);
        for (const lineText of lines) {
            const line = indentation ? lineText.slice(indentation) : lineText;
            if (line.length) {
                writeLine();
                write(line);
            }
        }
    }

    function writeLinesAndIndent(lineCount: number, writeSpaceIfNotIndenting: boolean) {
        if (lineCount) {
            increaseIndent();
            writeLine(lineCount);
        }
        else if (writeSpaceIfNotIndenting) {
            writeSpace();
        }
    }

    // Helper function to decrease the indent if we previously indented.  Allows multiple
    // previous indent values to be considered at a time.  This also allows caller to just
    // call this once, passing in all their appropriate indent values, instead of needing
    // to call this helper function multiple times.
    function decreaseIndentIf(value1: boolean | number | undefined, value2?: boolean | number) {
        if (value1) {
            decreaseIndent();
        }
        if (value2) {
            decreaseIndent();
        }
    }

    function getLeadingLineTerminatorCount(parentNode: Node | undefined, firstChild: Node | undefined, format: ListFormat): number {
        if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
            if (format & ListFormat.PreferNewLine) {
                return 1;
            }

            if (firstChild === undefined) {
                return !parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
            }
            if (firstChild.pos === nextListElementPos) {
                // If this child starts at the beginning of a list item in a parent list, its leading
                // line terminators have already been written as the separating line terminators of the
                // parent list. Example:
                //
                // class Foo {
                //   constructor() {}
                //   public foo() {}
                // }
                //
                // The outer list is the list of class members, with one line terminator between the
                // constructor and the method. The constructor is written, the separating line terminator
                // is written, and then we start emitting the method. Its modifiers ([public]) constitute an inner
                // list, so we look for its leading line terminators. If we didn't know that we had already
                // written a newline as part of the parent list, it would appear that we need to write a
                // leading newline to start the modifiers.
                return 0;
            }
            if (firstChild.kind === SyntaxKind.JsxText) {
                // JsxText will be written with its leading whitespace, so don't add more manually.
                return 0;
            }
            if (currentSourceFile && parentNode &&
                !positionIsSynthesized(parentNode.pos) &&
                !nodeIsSynthesized(firstChild) &&
                (!firstChild.parent || getOriginalNode(firstChild.parent) === getOriginalNode(parentNode))
            ) {
                if (preserveSourceNewlines) {
                    return getEffectiveLines(
                        includeComments => getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(
                            firstChild.pos,
                            parentNode.pos,
                            currentSourceFile!,
                            includeComments));
                }
                return rangeStartPositionsAreOnSameLine(parentNode, firstChild, currentSourceFile) ? 0 : 1;
            }
            if (synthesizedNodeStartsOnNewLine(firstChild, format)) {
                return 1;
            }
        }
        return format & ListFormat.MultiLine ? 1 : 0;
    }

    function getSeparatingLineTerminatorCount(previousNode: Node | undefined, nextNode: Node, format: ListFormat): number {
        if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
            if (previousNode === undefined || nextNode === undefined) {
                return 0;
            }
            if (nextNode.kind === SyntaxKind.JsxText) {
                // JsxText will be written with its leading whitespace, so don't add more manually.
                return 0;
            }
            else if (currentSourceFile && !nodeIsSynthesized(previousNode) && !nodeIsSynthesized(nextNode)) {
                if (preserveSourceNewlines && siblingNodePositionsAreComparable(previousNode, nextNode)) {
                    return getEffectiveLines(
                        includeComments => getLinesBetweenRangeEndAndRangeStart(
                            previousNode,
                            nextNode,
                            currentSourceFile!,
                            includeComments));
                }
                // If `preserveSourceNewlines` is `false` we do not intend to preserve the effective lines between the
                // previous and next node. Instead we naively check whether nodes are on separate lines within the
                // same node parent. If so, we intend to preserve a single line terminator. This is less precise and
                // expensive than checking with `preserveSourceNewlines` as above, but the goal is not to preserve the
                // effective source lines between two sibling nodes.
                else if (!preserveSourceNewlines && originalNodesHaveSameParent(previousNode, nextNode)) {
                    return rangeEndIsOnSameLineAsRangeStart(previousNode, nextNode, currentSourceFile) ? 0 : 1;
                }
                // If the two nodes are not comparable, add a line terminator based on the format that can indicate
                // whether new lines are preferred or not.
                return format & ListFormat.PreferNewLine ? 1 : 0;
            }
            else if (synthesizedNodeStartsOnNewLine(previousNode, format) || synthesizedNodeStartsOnNewLine(nextNode, format)) {
                return 1;
            }
        }
        else if (getStartsOnNewLine(nextNode)) {
            return 1;
        }
        return format & ListFormat.MultiLine ? 1 : 0;
    }

    function getClosingLineTerminatorCount(parentNode: Node | undefined, lastChild: Node | undefined, format: ListFormat, childrenTextRange: TextRange | undefined): number {
        if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
            if (format & ListFormat.PreferNewLine) {
                return 1;
            }

            if (lastChild === undefined) {
                return !parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
            }
            if (currentSourceFile && parentNode && !positionIsSynthesized(parentNode.pos) && !nodeIsSynthesized(lastChild) && (!lastChild.parent || lastChild.parent === parentNode)) {
                if (preserveSourceNewlines) {
                    const end = childrenTextRange && !positionIsSynthesized(childrenTextRange.end) ? childrenTextRange.end : lastChild.end;
                    return getEffectiveLines(
                        includeComments => getLinesBetweenPositionAndNextNonWhitespaceCharacter(
                            end,
                            parentNode.end,
                            currentSourceFile!,
                            includeComments));
                }
                return rangeEndPositionsAreOnSameLine(parentNode, lastChild, currentSourceFile) ? 0 : 1;
            }
            if (synthesizedNodeStartsOnNewLine(lastChild, format)) {
                return 1;
            }
        }
        if (format & ListFormat.MultiLine && !(format & ListFormat.NoTrailingNewLine)) {
            return 1;
        }
        return 0;
    }

    function getEffectiveLines(getLineDifference: (includeComments: boolean) => number) {
        // If 'preserveSourceNewlines' is disabled, we should never call this function
        // because it could be more expensive than alternative approximations.
        Debug.assert(!!preserveSourceNewlines);
        // We start by measuring the line difference from a position to its adjacent comments,
        // so that this is counted as a one-line difference, not two:
        //
        //   node1;
        //   // NODE2 COMMENT
        //   node2;
        const lines = getLineDifference(/*includeComments*/ true);
        if (lines === 0) {
            // However, if the line difference considering comments was 0, we might have this:
            //
            //   node1; // NODE2 COMMENT
            //   node2;
            //
            // in which case we should be ignoring node2's comment, so this too is counted as
            // a one-line difference, not zero.
            return getLineDifference(/*includeComments*/ false);
        }
        return lines;
    }

    function writeLineSeparatorsAndIndentBefore(node: Node, parent: Node): boolean {
        const leadingNewlines = preserveSourceNewlines && getLeadingLineTerminatorCount(parent, node, ListFormat.None);
        if (leadingNewlines) {
            writeLinesAndIndent(leadingNewlines, /*writeSpaceIfNotIndenting*/ false);
        }
        return !!leadingNewlines;
    }

    function writeLineSeparatorsAfter(node: Node, parent: Node) {
        const trailingNewlines = preserveSourceNewlines && getClosingLineTerminatorCount(parent, node, ListFormat.None, /*childrenTextRange*/ undefined);
        if (trailingNewlines) {
            writeLine(trailingNewlines);
        }
    }

    function synthesizedNodeStartsOnNewLine(node: Node, format: ListFormat) {
        if (nodeIsSynthesized(node)) {
            const startsOnNewLine = getStartsOnNewLine(node);
            if (startsOnNewLine === undefined) {
                return (format & ListFormat.PreferNewLine) !== 0;
            }

            return startsOnNewLine;
        }

        return (format & ListFormat.PreferNewLine) !== 0;
    }

    function getLinesBetweenNodes(parent: Node, node1: Node, node2: Node): number {
        if (getEmitFlags(parent) & EmitFlags.NoIndentation) {
            return 0;
        }

        parent = skipSynthesizedParentheses(parent);
        node1 = skipSynthesizedParentheses(node1);
        node2 = skipSynthesizedParentheses(node2);

        // Always use a newline for synthesized code if the synthesizer desires it.
        if (getStartsOnNewLine(node2)) {
            return 1;
        }

        if (currentSourceFile && !nodeIsSynthesized(parent) && !nodeIsSynthesized(node1) && !nodeIsSynthesized(node2)) {
            if (preserveSourceNewlines) {
                return getEffectiveLines(
                    includeComments => getLinesBetweenRangeEndAndRangeStart(
                        node1,
                        node2,
                        currentSourceFile!,
                        includeComments));
            }
            return rangeEndIsOnSameLineAsRangeStart(node1, node2, currentSourceFile) ? 0 : 1;
        }

        return 0;
    }

    function isEmptyBlock(block: BlockLike) {
        return block.statements.length === 0
            && (!currentSourceFile || rangeEndIsOnSameLineAsRangeStart(block, block, currentSourceFile));
    }

    function skipSynthesizedParentheses(node: Node) {
        while (node.kind === SyntaxKind.ParenthesizedExpression && nodeIsSynthesized(node)) {
            node = (node as ParenthesizedExpression).expression;
        }

        return node;
    }

    function getTextOfNode(node: Identifier | PrivateIdentifier | LiteralExpression, includeTrivia?: boolean): string {
        if (isGeneratedIdentifier(node) || isGeneratedPrivateIdentifier(node)) {
            return generateName(node);
        }
        if (isStringLiteral(node) && node.textSourceNode) {
            return getTextOfNode(node.textSourceNode, includeTrivia);
        }
        const sourceFile = currentSourceFile; // const needed for control flow
        const canUseSourceFile = !!sourceFile && !!node.parent && !nodeIsSynthesized(node) && !(node.flags & NodeFlags.NoOriginalText);
        if (isMemberName(node)) {
            if (!canUseSourceFile || getSourceFileOfNode(node) !== getOriginalNode(sourceFile)) {
                return idText(node);
            }
        }
        else {
            Debug.assertNode(node, isLiteralExpression); // not strictly necessary
            if (!canUseSourceFile) {
                return node.text;
            }
        }
        return getSourceTextOfNodeFromSourceFile(sourceFile, node, includeTrivia);
    }

    function getLiteralTextOfNode(node: LiteralLikeNode, neverAsciiEscape: boolean | undefined, jsxAttributeEscape: boolean): string {
        if (node.kind === SyntaxKind.StringLiteral && (node as StringLiteral).textSourceNode) {
            const textSourceNode = (node as StringLiteral).textSourceNode!;
            if (isIdentifier(textSourceNode) || isPrivateIdentifier(textSourceNode) || isNumericLiteral(textSourceNode)) {
                const text = isNumericLiteral(textSourceNode) ? textSourceNode.text : getTextOfNode(textSourceNode);
                return jsxAttributeEscape ? `"${escapeJsxAttributeString(text)}"` :
                    neverAsciiEscape || (getEmitFlags(node) & EmitFlags.NoAsciiEscaping) ? `"${escapeString(text)}"` :
                    `"${escapeNonAsciiString(text)}"`;
            }
            else {
                return getLiteralTextOfNode(textSourceNode, neverAsciiEscape, jsxAttributeEscape);
            }
        }

        const flags = (neverAsciiEscape ? GetLiteralTextFlags.NeverAsciiEscape : 0)
            | (jsxAttributeEscape ? GetLiteralTextFlags.JsxAttributeEscape : 0)
            | (printerOptions.terminateUnterminatedLiterals ? GetLiteralTextFlags.TerminateUnterminatedLiterals : 0)
            | (printerOptions.target && printerOptions.target === ScriptTarget.ESNext ? GetLiteralTextFlags.AllowNumericSeparator : 0);

        return getLiteralText(node, currentSourceFile, flags);
    }

    /**
     * Push a new name generation scope.
     */
    function pushNameGenerationScope(node: Node | undefined) {
        if (node && getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
            return;
        }
        tempFlagsStack.push(tempFlags);
        tempFlags = TempFlags.Auto;
        privateNameTempFlagsStack.push(privateNameTempFlags);
        privateNameTempFlags = TempFlags.Auto;
        formattedNameTempFlagsStack.push(formattedNameTempFlags);
        formattedNameTempFlags = undefined;
        reservedNamesStack.push(reservedNames);
    }

    /**
     * Pop the current name generation scope.
     */
    function popNameGenerationScope(node: Node | undefined) {
        if (node && getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
            return;
        }
        tempFlags = tempFlagsStack.pop()!;
        privateNameTempFlags = privateNameTempFlagsStack.pop()!;
        formattedNameTempFlags = formattedNameTempFlagsStack.pop();
        reservedNames = reservedNamesStack.pop()!;
    }

    function reserveNameInNestedScopes(name: string) {
        if (!reservedNames || reservedNames === lastOrUndefined(reservedNamesStack)) {
            reservedNames = new Set();
        }
        reservedNames.add(name);
    }

    function generateNames(node: Node | undefined) {
        if (!node) return;
        switch (node.kind) {
            case SyntaxKind.Block:
                forEach((node as Block).statements, generateNames);
                break;
            case SyntaxKind.LabeledStatement:
            case SyntaxKind.WithStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
                generateNames((node as LabeledStatement | WithStatement | DoStatement | WhileStatement).statement);
                break;
            case SyntaxKind.IfStatement:
                generateNames((node as IfStatement).thenStatement);
                generateNames((node as IfStatement).elseStatement);
                break;
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.ForInStatement:
                generateNames((node as ForStatement | ForInOrOfStatement).initializer);
                generateNames((node as ForStatement | ForInOrOfStatement).statement);
                break;
            case SyntaxKind.SwitchStatement:
                generateNames((node as SwitchStatement).caseBlock);
                break;
            case SyntaxKind.CaseBlock:
                forEach((node as CaseBlock).clauses, generateNames);
                break;
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                forEach((node as CaseOrDefaultClause).statements, generateNames);
                break;
            case SyntaxKind.TryStatement:
                generateNames((node as TryStatement).tryBlock);
                generateNames((node as TryStatement).catchClause);
                generateNames((node as TryStatement).finallyBlock);
                break;
            case SyntaxKind.CatchClause:
                generateNames((node as CatchClause).variableDeclaration);
                generateNames((node as CatchClause).block);
                break;
            case SyntaxKind.VariableStatement:
                generateNames((node as VariableStatement).declarationList);
                break;
            case SyntaxKind.VariableDeclarationList:
                forEach((node as VariableDeclarationList).declarations, generateNames);
                break;
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
            case SyntaxKind.ClassDeclaration:
                generateNameIfNeeded((node as NamedDeclaration).name);
                break;
            case SyntaxKind.FunctionDeclaration:
                generateNameIfNeeded((node as FunctionDeclaration).name);
                if (getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
                    forEach((node as FunctionDeclaration).parameters, generateNames);
                    generateNames((node as FunctionDeclaration).body);
                }
                break;
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                forEach((node as BindingPattern).elements, generateNames);
                break;
            case SyntaxKind.ImportDeclaration:
                generateNames((node as ImportDeclaration).importClause);
                break;
            case SyntaxKind.ImportClause:
                generateNameIfNeeded((node as ImportClause).name);
                generateNames((node as ImportClause).namedBindings);
                break;
            case SyntaxKind.NamespaceImport:
                generateNameIfNeeded((node as NamespaceImport).name);
                break;
            case SyntaxKind.NamespaceExport:
                generateNameIfNeeded((node as NamespaceExport).name);
                break;
            case SyntaxKind.NamedImports:
                forEach((node as NamedImports).elements, generateNames);
                break;
            case SyntaxKind.ImportSpecifier:
                generateNameIfNeeded((node as ImportSpecifier).propertyName || (node as ImportSpecifier).name);
                break;
        }
    }

    function generateMemberNames(node: Node | undefined) {
        if (!node) return;
        switch (node.kind) {
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.AnnotationPropertyDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                generateNameIfNeeded((node as NamedDeclaration).name);
                break;
        }
    }

    function generateNameIfNeeded(name: DeclarationName | undefined) {
        if (name) {
            if (isGeneratedIdentifier(name) || isGeneratedPrivateIdentifier(name)) {
                generateName(name);
            }
            else if (isBindingPattern(name)) {
                generateNames(name);
            }
        }
    }

    /**
     * Generate the text for a generated identifier.
     */
    function generateName(name: GeneratedIdentifier | GeneratedPrivateIdentifier) {
        if ((name.autoGenerateFlags & GeneratedIdentifierFlags.KindMask) === GeneratedIdentifierFlags.Node) {
            // Node names generate unique names based on their original node
            // and are cached based on that node's id.
            return generateNameCached(getNodeForGeneratedName(name), isPrivateIdentifier(name), name.autoGenerateFlags, name.autoGeneratePrefix, name.autoGenerateSuffix);
        }
        else {
            // Auto, Loop, and Unique names are cached based on their unique
            // autoGenerateId.
            const autoGenerateId = name.autoGenerateId!;
            return autoGeneratedIdToGeneratedName[autoGenerateId] || (autoGeneratedIdToGeneratedName[autoGenerateId] = makeName(name));
        }
    }

    function generateNameCached(node: Node, privateName: boolean, flags?: GeneratedIdentifierFlags, prefix?: string | GeneratedNamePart, suffix?: string) {
        const nodeId = getNodeId(node);
        return nodeIdToGeneratedName[nodeId] || (nodeIdToGeneratedName[nodeId] = generateNameForNode(node, privateName, flags ?? GeneratedIdentifierFlags.None, formatGeneratedNamePart(prefix, generateName), formatGeneratedNamePart(suffix)));
    }

    /**
     * Returns a value indicating whether a name is unique globally, within the current file,
     * or within the NameGenerator.
     */
    function isUniqueName(name: string): boolean {
        return isFileLevelUniqueName(name)
            && !generatedNames.has(name)
            && !(reservedNames && reservedNames.has(name));
    }

    /**
     * Returns a value indicating whether a name is unique globally or within the current file.
     */
    function isFileLevelUniqueName(name: string) {
        return currentSourceFile ? ts.isFileLevelUniqueName(currentSourceFile, name, hasGlobalName) : true;
    }

    /**
     * Returns a value indicating whether a name is unique within a container.
     */
    function isUniqueLocalName(name: string, container: Node): boolean {
        for (let node = container; isNodeDescendantOf(node, container); node = node.nextContainer!) {
            if (node.locals) {
                const local = node.locals.get(escapeLeadingUnderscores(name));
                // We conservatively include alias symbols to cover cases where they're emitted as locals
                if (local && local.flags & (SymbolFlags.Value | SymbolFlags.ExportValue | SymbolFlags.Alias)) {
                    return false;
                }
            }
        }
        return true;
    }

    function getTempFlags(formattedNameKey: string) {
        switch (formattedNameKey) {
            case "":
                return tempFlags;
            case "#":
                return privateNameTempFlags;
            default:
                return formattedNameTempFlags?.get(formattedNameKey) ?? TempFlags.Auto;
        }
    }

    function setTempFlags(formattedNameKey: string, flags: TempFlags) {
        switch (formattedNameKey) {
            case "":
                tempFlags = flags;
                break;
            case "#":
                privateNameTempFlags = flags;
                break;
            default:
                formattedNameTempFlags ??= new Map();
                formattedNameTempFlags.set(formattedNameKey, flags);
                break;
        }
    }

    /**
     * Return the next available name in the pattern _a ... _z, _0, _1, ...
     * TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
     * Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
     */
    function makeTempVariableName(flags: TempFlags, reservedInNestedScopes: boolean, privateName: boolean, prefix: string, suffix: string): string {
        if (prefix.length > 0 && prefix.charCodeAt(0) === CharacterCodes.hash) {
            prefix = prefix.slice(1);
        }

        // Generate a key to use to acquire a TempFlags counter based on the fixed portions of the generated name.
        const key = formatGeneratedName(privateName, prefix, "", suffix);
        let tempFlags = getTempFlags(key);

        if (flags && !(tempFlags & flags)) {
            const name = flags === TempFlags._i ? "_i" : "_n";
            const fullName = formatGeneratedName(privateName, prefix, name, suffix);
            if (isUniqueName(fullName)) {
                tempFlags |= flags;
                if (reservedInNestedScopes) {
                    reserveNameInNestedScopes(fullName);
                }
                setTempFlags(key, tempFlags);
                return fullName;
            }
        }

        while (true) {
            const count = tempFlags & TempFlags.CountMask;
            tempFlags++;
            // Skip over 'i' and 'n'
            if (count !== 8 && count !== 13) {
                const name = count < 26
                    ? "_" + String.fromCharCode(CharacterCodes.a + count)
                    : "_" + (count - 26);
                const fullName = formatGeneratedName(privateName, prefix, name, suffix);
                if (isUniqueName(fullName)) {
                    if (reservedInNestedScopes) {
                        reserveNameInNestedScopes(fullName);
                    }
                    setTempFlags(key, tempFlags);
                    return fullName;
                }
            }
        }
    }

    /**
     * Generate a name that is unique within the current file and doesn't conflict with any names
     * in global scope. The name is formed by adding an '_n' suffix to the specified base name,
     * where n is a positive integer. Note that names generated by makeTempVariableName and
     * makeUniqueName are guaranteed to never conflict.
     * If `optimistic` is set, the first instance will use 'baseName' verbatim instead of 'baseName_1'
     */
    function makeUniqueName(baseName: string, checkFn: (name: string) => boolean = isUniqueName, optimistic: boolean, scoped: boolean, privateName: boolean, prefix: string, suffix: string): string {
        if (baseName.length > 0 && baseName.charCodeAt(0) === CharacterCodes.hash) {
            baseName = baseName.slice(1);
        }
        if (prefix.length > 0 && prefix.charCodeAt(0) === CharacterCodes.hash) {
            prefix = prefix.slice(1);
        }
        if (optimistic) {
            const fullName = formatGeneratedName(privateName, prefix, baseName, suffix);
            if (checkFn(fullName)) {
                if (scoped) {
                    reserveNameInNestedScopes(fullName);
                }
                else {
                    generatedNames.add(fullName);
                }
                return fullName;
            }
        }
        // Find the first unique 'name_n', where n is a positive number
        if (baseName.charCodeAt(baseName.length - 1) !== CharacterCodes._) {
            baseName += "_";
        }
        let i = 1;
        while (true) {
            const fullName = formatGeneratedName(privateName, prefix, baseName + i, suffix);
            if (checkFn(fullName)) {
                if (scoped) {
                    reserveNameInNestedScopes(fullName);
                }
                else {
                    generatedNames.add(fullName);
                }
                return fullName;
            }
            i++;
        }
    }

    function makeFileLevelOptimisticUniqueName(name: string) {
        return makeUniqueName(name, isFileLevelUniqueName, /*optimistic*/ true, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    /**
     * Generates a unique name for a ModuleDeclaration or EnumDeclaration.
     */
    function generateNameForModuleOrEnum(node: ModuleDeclaration | EnumDeclaration) {
        const name = getTextOfNode(node.name);
        // Use module/enum name itself if it is unique, otherwise make a unique variation
        return isUniqueLocalName(name, node) ? name : makeUniqueName(name, isUniqueName, /*optimistic*/ false, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    /**
     * Generates a unique name for an ImportDeclaration or ExportDeclaration.
     */
    function generateNameForImportOrExportDeclaration(node: ImportDeclaration | ExportDeclaration) {
        const expr = getExternalModuleName(node)!; // TODO: GH#18217
        const baseName = isStringLiteral(expr) ?
            makeIdentifierFromModuleName(expr.text) : "module";
        return makeUniqueName(baseName, isUniqueName, /*optimistic*/ false, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    /**
     * Generates a unique name for a default export.
     */
    function generateNameForExportDefault() {
        return makeUniqueName("default", isUniqueName, /*optimistic*/ false, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    /**
     * Generates a unique name for a class expression.
     */
    function generateNameForClassExpression() {
        return makeUniqueName("class", isUniqueName, /*optimistic*/ false, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    function generateNameForMethodOrAccessor(node: MethodDeclaration | AccessorDeclaration, privateName: boolean, prefix: string, suffix: string) {
        if (isIdentifier(node.name)) {
            return generateNameCached(node.name, privateName);
        }
        return makeTempVariableName(TempFlags.Auto, /*reservedInNestedScopes*/ false, privateName, prefix, suffix);
    }

    /**
     * Generates a unique name from a node.
     */
    function generateNameForNode(node: Node, privateName: boolean, flags: GeneratedIdentifierFlags, prefix: string, suffix: string): string {
        switch (node.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.PrivateIdentifier:
                return makeUniqueName(
                    getTextOfNode(node as Identifier),
                    isUniqueName,
                    !!(flags & GeneratedIdentifierFlags.Optimistic),
                    !!(flags & GeneratedIdentifierFlags.ReservedInNestedScopes),
                    privateName,
                    prefix,
                    suffix
                );
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
                Debug.assert(!prefix && !suffix && !privateName);
                return generateNameForModuleOrEnum(node as ModuleDeclaration | EnumDeclaration);
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
                Debug.assert(!prefix && !suffix && !privateName);
                return generateNameForImportOrExportDeclaration(node as ImportDeclaration | ExportDeclaration);
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ExportAssignment:
                Debug.assert(!prefix && !suffix && !privateName);
                return generateNameForExportDefault();
            case SyntaxKind.ClassExpression:
                Debug.assert(!prefix && !suffix && !privateName);
                return generateNameForClassExpression();
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return generateNameForMethodOrAccessor(node as MethodDeclaration | AccessorDeclaration, privateName, prefix, suffix);
            case SyntaxKind.ComputedPropertyName:
                return makeTempVariableName(TempFlags.Auto, /*reserveInNestedScopes*/ true, privateName, prefix, suffix);
            default:
                return makeTempVariableName(TempFlags.Auto, /*reserveInNestedScopes*/ false, privateName, prefix, suffix);
        }
    }

    /**
     * Generates a unique identifier for a node.
     */
    function makeName(name: GeneratedIdentifier | GeneratedPrivateIdentifier) {
        const prefix = formatGeneratedNamePart(name.autoGeneratePrefix, generateName);
        const suffix = formatGeneratedNamePart (name.autoGenerateSuffix);
        switch (name.autoGenerateFlags & GeneratedIdentifierFlags.KindMask) {
            case GeneratedIdentifierFlags.Auto:
                return makeTempVariableName(TempFlags.Auto, !!(name.autoGenerateFlags & GeneratedIdentifierFlags.ReservedInNestedScopes), isPrivateIdentifier(name), prefix, suffix);
            case GeneratedIdentifierFlags.Loop:
                Debug.assertNode(name, isIdentifier);
                return makeTempVariableName(TempFlags._i, !!(name.autoGenerateFlags & GeneratedIdentifierFlags.ReservedInNestedScopes), /*privateName*/ false, prefix, suffix);
            case GeneratedIdentifierFlags.Unique:
                return makeUniqueName(
                    idText(name),
                    (name.autoGenerateFlags & GeneratedIdentifierFlags.FileLevel) ? isFileLevelUniqueName : isUniqueName,
                    !!(name.autoGenerateFlags & GeneratedIdentifierFlags.Optimistic),
                    !!(name.autoGenerateFlags & GeneratedIdentifierFlags.ReservedInNestedScopes),
                    isPrivateIdentifier(name),
                    prefix,
                    suffix
                );
        }

        return Debug.fail(`Unsupported GeneratedIdentifierKind: ${Debug.formatEnum(name.autoGenerateFlags & GeneratedIdentifierFlags.KindMask, (ts as any).GeneratedIdentifierFlags, /*isFlags*/ true)}.`);
    }

    // Comments

    function pipelineEmitWithComments(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Comments, hint, node);
        const savedContainerPos = containerPos;
        const savedContainerEnd = containerEnd;
        const savedDeclarationListContainerEnd = declarationListContainerEnd;
        if(needToKeepComments(node)) {
            emitCommentsBeforeNode(node);
        }
        pipelinePhase(hint, node);
        emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
    }

    function needToKeepComments(node: Node) {
        if (removeCommentsCollection === undefined && universalRemoveCommentsCollection === undefined) {
            return true;
        }
        //@ts-ignore
        let escapedText = node?.name?.escapedText;
        if (!escapedText) {
            return false;
        }
        if (removeCommentsCollection?.includes(escapedText)) {
            return true;
        }
        if (universalRemoveCommentsCollection) {
            return isMatchWildcard(universalRemoveCommentsCollection, escapedText);
        }
        return false;
    }

    function isMatchWildcard(wildcardArray: RegExp[], item: string): boolean {
        for (const wildcard of wildcardArray) {
            if (wildcard.test(item)) {
                return true;
            }
        }
        return false;
    }

    function emitCommentsBeforeNode(node: Node) {
        const emitFlags = getEmitFlags(node);
        const commentRange = getCommentRange(node);

        // Emit leading comments
        emitLeadingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end);
        if (emitFlags & EmitFlags.NoNestedComments) {
            commentsDisabled = true;
        }
    }

    function emitCommentsAfterNode(node: Node, savedContainerPos: number, savedContainerEnd: number, savedDeclarationListContainerEnd: number) {
        const emitFlags = getEmitFlags(node);
        const commentRange = getCommentRange(node);

        // Emit trailing comments
        if (emitFlags & EmitFlags.NoNestedComments) {
            commentsDisabled = false;
        }
        emitTrailingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
        const typeNode = getTypeNode(node);
        if (typeNode) {
            emitTrailingCommentsOfNode(node, emitFlags, typeNode.pos, typeNode.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
        }
    }

    function emitLeadingCommentsOfNode(node: Node, emitFlags: EmitFlags, pos: number, end: number) {
        enterComment();
        hasWrittenComment = false;

        // We have to explicitly check that the node is JsxText because if the compilerOptions.jsx is "preserve" we will not do any transformation.
        // It is expensive to walk entire tree just to set one kind of node to have no comments.
        const skipLeadingComments = pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0 || node.kind === SyntaxKind.JsxText;
        const skipTrailingComments = end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0 || node.kind === SyntaxKind.JsxText;

        // Save current container state on the stack.
        if ((pos > 0 || end > 0) && pos !== end) {
            // Emit leading comments if the position is not synthesized and the node
            // has not opted out from emitting leading comments.
            if (!skipLeadingComments) {
                emitLeadingComments(pos, /*isEmittedNode*/ node.kind !== SyntaxKind.NotEmittedStatement);
            }

            if (!skipLeadingComments || (pos >= 0 && (emitFlags & EmitFlags.NoLeadingComments) !== 0)) {
                // Advance the container position if comments get emitted or if they've been disabled explicitly using NoLeadingComments.
                containerPos = pos;
            }

            if (!skipTrailingComments || (end >= 0 && (emitFlags & EmitFlags.NoTrailingComments) !== 0)) {
                // As above.
                containerEnd = end;

                // To avoid invalid comment emit in a down-level binding pattern, we
                // keep track of the last declaration list container's end
                if (node.kind === SyntaxKind.VariableDeclarationList) {
                    declarationListContainerEnd = end;
                }
            }
        }
        forEach(getSyntheticLeadingComments(node), emitLeadingSynthesizedComment);
        exitComment();
    }

    function emitTrailingCommentsOfNode(node: Node, emitFlags: EmitFlags, pos: number, end: number, savedContainerPos: number, savedContainerEnd: number, savedDeclarationListContainerEnd: number) {
        enterComment();
        const skipTrailingComments = end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0 || node.kind === SyntaxKind.JsxText;
        forEach(getSyntheticTrailingComments(node), emitTrailingSynthesizedComment);
        if ((pos > 0 || end > 0) && pos !== end) {
            // Restore previous container state.
            containerPos = savedContainerPos;
            containerEnd = savedContainerEnd;
            declarationListContainerEnd = savedDeclarationListContainerEnd;

            // Emit trailing comments if the position is not synthesized and the node
            // has not opted out from emitting leading comments and is an emitted node.
            if (!skipTrailingComments && node.kind !== SyntaxKind.NotEmittedStatement) {
                emitTrailingComments(end);
            }
        }
        exitComment();
    }

    function emitLeadingSynthesizedComment(comment: SynthesizedComment) {
        if (comment.hasLeadingNewline || comment.kind === SyntaxKind.SingleLineCommentTrivia) {
            writer.writeLine();
        }
        writeSynthesizedComment(comment);
        if (comment.hasTrailingNewLine || comment.kind === SyntaxKind.SingleLineCommentTrivia) {
            writer.writeLine();
        }
        else {
            writer.writeSpace(" ");
        }
    }

    function emitTrailingSynthesizedComment(comment: SynthesizedComment) {
        if (!writer.isAtStartOfLine()) {
            writer.writeSpace(" ");
        }
        writeSynthesizedComment(comment);
        if (comment.hasTrailingNewLine) {
            writer.writeLine();
        }
    }

    function writeSynthesizedComment(comment: SynthesizedComment) {
        const text = formatSynthesizedComment(comment);
        const lineMap = comment.kind === SyntaxKind.MultiLineCommentTrivia ? computeLineStarts(text) : undefined;
        writeCommentRange(text, lineMap!, writer, 0, text.length, newLine);
    }

    function formatSynthesizedComment(comment: SynthesizedComment) {
        return comment.kind === SyntaxKind.MultiLineCommentTrivia
            ? `/*${comment.text}*/`
            : `//${comment.text}`;
    }

    function emitBodyWithDetachedComments(node: Node, detachedRange: TextRange, emitCallback: (node: Node) => void) {
        enterComment();
        const { pos, end } = detachedRange;
        const emitFlags = getEmitFlags(node);
        const skipLeadingComments = pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0;
        const skipTrailingComments = commentsDisabled || end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0;
        if (!skipLeadingComments) {
            emitDetachedCommentsAndUpdateCommentsInfo(detachedRange);
        }

        exitComment();
        if (emitFlags & EmitFlags.NoNestedComments && !commentsDisabled) {
            commentsDisabled = true;
            emitCallback(node);
            commentsDisabled = false;
        }
        else {
            emitCallback(node);
        }

        enterComment();
        if (!skipTrailingComments) {
            emitLeadingComments(detachedRange.end, /*isEmittedNode*/ true);
            if (hasWrittenComment && !writer.isAtStartOfLine()) {
                writer.writeLine();
            }
        }
        exitComment();

    }

    function originalNodesHaveSameParent(nodeA: Node, nodeB: Node) {
        nodeA = getOriginalNode(nodeA);
        // For performance, do not call `getOriginalNode` for `nodeB` if `nodeA` doesn't even
        // have a parent node.
        return nodeA.parent && nodeA.parent === getOriginalNode(nodeB).parent;
    }

    function siblingNodePositionsAreComparable(previousNode: Node, nextNode: Node) {
        if (nextNode.pos < previousNode.end) {
            return false;
        }

        previousNode = getOriginalNode(previousNode);
        nextNode = getOriginalNode(nextNode);
        const parent = previousNode.parent;
        if (!parent || parent !== nextNode.parent) {
            return false;
        }

        const parentNodeArray = getContainingNodeArray(previousNode);
        const prevNodeIndex = parentNodeArray?.indexOf(previousNode);
        return prevNodeIndex !== undefined && prevNodeIndex > -1 && parentNodeArray!.indexOf(nextNode) === prevNodeIndex + 1;
    }

    function emitLeadingComments(pos: number, isEmittedNode: boolean) {
        hasWrittenComment = false;

        if (isEmittedNode) {
            if (pos === 0 && currentSourceFile?.isDeclarationFile) {
                forEachLeadingCommentToEmit(pos, emitNonTripleSlashLeadingComment);
            }
            else {
                forEachLeadingCommentToEmit(pos, emitLeadingComment);
            }
        }
        else if (pos === 0) {
            // If the node will not be emitted in JS, remove all the comments(normal, pinned and ///) associated with the node,
            // unless it is a triple slash comment at the top of the file.
            // For Example:
            //      /// <reference-path ...>
            //      declare var x;
            //      /// <reference-path ...>
            //      interface F {}
            //  The first /// will NOT be removed while the second one will be removed even though both node will not be emitted
            forEachLeadingCommentToEmit(pos, emitTripleSlashLeadingComment);
        }
    }

    function emitTripleSlashLeadingComment(commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
        if (isTripleSlashComment(commentPos, commentEnd)) {
            emitLeadingComment(commentPos, commentEnd, kind, hasTrailingNewLine, rangePos);
        }
    }

    function emitNonTripleSlashLeadingComment(commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
        if (!isTripleSlashComment(commentPos, commentEnd)) {
            emitLeadingComment(commentPos, commentEnd, kind, hasTrailingNewLine, rangePos);
        }
    }

    function shouldWriteComment(text: string, pos: number) {
        if (printerOptions.onlyPrintJsDocStyle) {
            return (isJSDocLikeText(text, pos) || isPinnedComment(text, pos));
        }
        return true;
    }

    function emitLeadingComment(commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
        if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos)) return;
        if (!hasWrittenComment) {
            emitNewLineBeforeLeadingCommentOfPosition(getCurrentLineMap(), writer, rangePos, commentPos);
            hasWrittenComment = true;
        }

        // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
        emitPos(commentPos);
        writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);

        if (hasTrailingNewLine) {
            writer.writeLine();
        }
        else if (kind === SyntaxKind.MultiLineCommentTrivia) {
            writer.writeSpace(" ");
        }
    }

    function emitLeadingCommentsOfPosition(pos: number) {
        if (commentsDisabled || pos === -1) {
            return;
        }

        emitLeadingComments(pos, /*isEmittedNode*/ true);
    }

    function emitTrailingComments(pos: number) {
        forEachTrailingCommentToEmit(pos, emitTrailingComment);
    }

    function emitTrailingComment(commentPos: number, commentEnd: number, _kind: SyntaxKind, hasTrailingNewLine: boolean) {
        if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos)) return;
        // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment2*/
        if (!writer.isAtStartOfLine()) {
            writer.writeSpace(" ");
        }

        emitPos(commentPos);
        writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);

        if (hasTrailingNewLine) {
            writer.writeLine();
        }
    }

    function emitTrailingCommentsOfPosition(pos: number, prefixSpace?: boolean, forceNoNewline?: boolean) {
        if (commentsDisabled) {
            return;
        }
        enterComment();
        forEachTrailingCommentToEmit(pos, prefixSpace ? emitTrailingComment : forceNoNewline ? emitTrailingCommentOfPositionNoNewline : emitTrailingCommentOfPosition);
        exitComment();
    }

    function emitTrailingCommentOfPositionNoNewline(commentPos: number, commentEnd: number, kind: SyntaxKind) {
        if (!currentSourceFile) return;
        // trailing comments of a position are emitted at /*trailing comment1 */space/*trailing comment*/space

        emitPos(commentPos);
        writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);

        if (kind === SyntaxKind.SingleLineCommentTrivia) {
            writer.writeLine(); // still write a newline for single-line comments, so closing tokens aren't written on the same line
        }
    }

    function emitTrailingCommentOfPosition(commentPos: number, commentEnd: number, _kind: SyntaxKind, hasTrailingNewLine: boolean) {
        if(!currentSourceFile) return;
        // trailing comments of a position are emitted at /*trailing comment1 */space/*trailing comment*/space

        emitPos(commentPos);
        writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);

        if (hasTrailingNewLine) {
            writer.writeLine();
        }
        else {
            writer.writeSpace(" ");
        }
    }

    function forEachLeadingCommentToEmit(pos: number, cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
        // Emit the leading comments only if the container's pos doesn't match because the container should take care of emitting these comments
        if (currentSourceFile && (containerPos === -1 || pos !== containerPos)) {
            if (hasDetachedComments(pos)) {
                forEachLeadingCommentWithoutDetachedComments(cb);
            }
            else {
                forEachLeadingCommentRange(currentSourceFile.text, pos, cb, /*state*/ pos);
            }
        }
    }

    function forEachTrailingCommentToEmit(end: number, cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean) => void) {
        // Emit the trailing comments only if the container's end doesn't match because the container should take care of emitting these comments
        if (currentSourceFile && (containerEnd === -1 || (end !== containerEnd && end !== declarationListContainerEnd))) {
            forEachTrailingCommentRange(currentSourceFile.text, end, cb);
        }
    }

    function hasDetachedComments(pos: number) {
        return detachedCommentsInfo !== undefined && last(detachedCommentsInfo).nodePos === pos;
    }

    function forEachLeadingCommentWithoutDetachedComments(cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
        if (!currentSourceFile) return;
        // get the leading comments from detachedPos
        const pos = last(detachedCommentsInfo!).detachedCommentEndPos;
        if (detachedCommentsInfo!.length - 1) {
            detachedCommentsInfo!.pop();
        }
        else {
            detachedCommentsInfo = undefined;
        }

        forEachLeadingCommentRange(currentSourceFile.text, pos, cb, /*state*/ pos);
    }

    function emitDetachedCommentsAndUpdateCommentsInfo(range: TextRange) {
        const currentDetachedCommentInfo = currentSourceFile && emitDetachedComments(currentSourceFile.text, getCurrentLineMap(), writer, emitComment, range, newLine, commentsDisabled);
        if (currentDetachedCommentInfo) {
            if (detachedCommentsInfo) {
                detachedCommentsInfo.push(currentDetachedCommentInfo);
            }
            else {
                detachedCommentsInfo = [currentDetachedCommentInfo];
            }
        }
    }

    function emitComment(text: string, lineMap: number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
        if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos)) return;
        emitPos(commentPos);
        writeCommentRange(text, lineMap, writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);
    }

    /**
     * Determine if the given comment is a triple-slash
     *
     * @return true if the comment is a triple-slash comment else false
     */
    function isTripleSlashComment(commentPos: number, commentEnd: number) {
        return !!currentSourceFile && isRecognizedTripleSlashComment(currentSourceFile.text, commentPos, commentEnd);
    }

    // Source Maps

    function getParsedSourceMap(node: UnparsedSource) {
        if (node.parsedSourceMap === undefined && node.sourceMapText !== undefined) {
            node.parsedSourceMap = tryParseRawSourceMap(node.sourceMapText) || false;
        }
        return node.parsedSourceMap || undefined;
    }

    function pipelineEmitWithSourceMaps(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.SourceMaps, hint, node);
        emitSourceMapsBeforeNode(node);
        pipelinePhase(hint, node);
        emitSourceMapsAfterNode(node);
    }

    function emitSourceMapsBeforeNode(node: Node) {
        const emitFlags = getEmitFlags(node);
        const sourceMapRange = getSourceMapRange(node);

        // Emit leading sourcemap
        if (isUnparsedNode(node)) {
            Debug.assertIsDefined(node.parent, "UnparsedNodes must have parent pointers");
            const parsed = getParsedSourceMap(node.parent);
            if (parsed && sourceMapGenerator) {
                sourceMapGenerator.appendSourceMap(
                    writer.getLine(),
                    writer.getColumn(),
                    parsed,
                    node.parent.sourceMapPath!,
                    node.parent.getLineAndCharacterOfPosition(node.pos),
                    node.parent.getLineAndCharacterOfPosition(node.end)
                );
            }
        }
        else {
            const source = sourceMapRange.source || sourceMapSource;
            if (node.kind !== SyntaxKind.NotEmittedStatement
                && (emitFlags & EmitFlags.NoLeadingSourceMap) === 0
                && sourceMapRange.pos >= 0) {
                emitSourcePos(sourceMapRange.source || sourceMapSource, skipSourceTrivia(source, sourceMapRange.pos));
            }
            if (emitFlags & EmitFlags.NoNestedSourceMaps) {
                sourceMapsDisabled = true;
            }
        }
    }

    function emitSourceMapsAfterNode(node: Node) {
        const emitFlags = getEmitFlags(node);
        const sourceMapRange = getSourceMapRange(node);

        // Emit trailing sourcemap
        if (!isUnparsedNode(node)) {
            if (emitFlags & EmitFlags.NoNestedSourceMaps) {
                sourceMapsDisabled = false;
            }
            if (node.kind !== SyntaxKind.NotEmittedStatement
                && (emitFlags & EmitFlags.NoTrailingSourceMap) === 0
                && sourceMapRange.end >= 0) {
                emitSourcePos(sourceMapRange.source || sourceMapSource, sourceMapRange.end);
            }
        }
    }

    /**
     * Skips trivia such as comments and white-space that can be optionally overridden by the source-map source
     */
    function skipSourceTrivia(source: SourceMapSource, pos: number): number {
        return source.skipTrivia ? source.skipTrivia(pos) : skipTrivia(source.text, pos);
    }

    /**
     * Emits a mapping.
     *
     * If the position is synthetic (undefined or a negative value), no mapping will be
     * created.
     *
     * @param pos The position.
     */
    function emitPos(pos: number) {
        if (sourceMapsDisabled || positionIsSynthesized(pos) || isJsonSourceMapSource(sourceMapSource)) {
            return;
        }

        const { line: sourceLine, character: sourceCharacter } = getLineAndCharacterOfPosition(sourceMapSource, pos);
        sourceMapGenerator!.addMapping(
            writer.getLine(),
            writer.getColumn(),
            sourceMapSourceIndex,
            sourceLine,
            sourceCharacter,
            /*nameIndex*/ undefined);
    }

    function emitSourcePos(source: SourceMapSource, pos: number) {
        if (source !== sourceMapSource) {
            const savedSourceMapSource = sourceMapSource;
            const savedSourceMapSourceIndex = sourceMapSourceIndex;
            setSourceMapSource(source);
            emitPos(pos);
            resetSourceMapSource(savedSourceMapSource, savedSourceMapSourceIndex);
        }
        else {
            emitPos(pos);
        }
    }

    /**
     * Emits a token of a node with possible leading and trailing source maps.
     *
     * @param node The node containing the token.
     * @param token The token to emit.
     * @param tokenStartPos The start pos of the token.
     * @param emitCallback The callback used to emit the token.
     */
    function emitTokenWithSourceMap(node: Node | undefined, token: SyntaxKind, writer: (s: string) => void, tokenPos: number, emitCallback: (token: SyntaxKind, writer: (s: string) => void, tokenStartPos: number) => number) {
        if (sourceMapsDisabled || node && isInJsonFile(node)) {
            return emitCallback(token, writer, tokenPos);
        }

        const emitNode = node && node.emitNode;
        const emitFlags = emitNode && emitNode.flags || EmitFlags.None;
        const range = emitNode && emitNode.tokenSourceMapRanges && emitNode.tokenSourceMapRanges[token];
        const source = range && range.source || sourceMapSource;

        tokenPos = skipSourceTrivia(source, range ? range.pos : tokenPos);
        if ((emitFlags & EmitFlags.NoTokenLeadingSourceMaps) === 0 && tokenPos >= 0) {
            emitSourcePos(source, tokenPos);
        }

        tokenPos = emitCallback(token, writer, tokenPos);

        if (range) tokenPos = range.end;
        if ((emitFlags & EmitFlags.NoTokenTrailingSourceMaps) === 0 && tokenPos >= 0) {
            emitSourcePos(source, tokenPos);
        }

        return tokenPos;
    }

    function setSourceMapSource(source: SourceMapSource) {
        if (sourceMapsDisabled) {
            return;
        }

        sourceMapSource = source;

        if (source === mostRecentlyAddedSourceMapSource) {
            // Fast path for when the new source map is the most recently added, in which case
            // we use its captured index without going through the source map generator.
            sourceMapSourceIndex = mostRecentlyAddedSourceMapSourceIndex;
            return;
        }

        if (isJsonSourceMapSource(source)) {
            return;
        }

        sourceMapSourceIndex = sourceMapGenerator!.addSource(source.fileName);
        if (printerOptions.inlineSources) {
            sourceMapGenerator!.setSourceContent(sourceMapSourceIndex, source.text);
        }

        mostRecentlyAddedSourceMapSource = source;
        mostRecentlyAddedSourceMapSourceIndex = sourceMapSourceIndex;
    }

    function resetSourceMapSource(source: SourceMapSource, sourceIndex: number) {
        sourceMapSource = source;
        sourceMapSourceIndex = sourceIndex;
    }

    function isJsonSourceMapSource(sourceFile: SourceMapSource) {
        return fileExtensionIs(sourceFile.fileName, Extension.Json);
    }
}

function createBracketsMap() {
    const brackets: string[][] = [];
    brackets[ListFormat.Braces] = ["{", "}"];
    brackets[ListFormat.Parenthesis] = ["(", ")"];
    brackets[ListFormat.AngleBrackets] = ["<", ">"];
    brackets[ListFormat.SquareBrackets] = ["[", "]"];
    return brackets;
}

function getOpeningBracket(format: ListFormat) {
    return brackets[format & ListFormat.BracketsMask][0];
}

function getClosingBracket(format: ListFormat) {
    return brackets[format & ListFormat.BracketsMask][1];
}

// Flags enum to track count of temp variables and a few dedicated names
const enum TempFlags {
    Auto = 0x00000000,  // No preferred name
    CountMask = 0x0FFFFFFF,  // Temp variable counter
    _i = 0x10000000,  // Use/preference flag for '_i'
}

interface OrdinalParentheizerRuleSelector<T extends Node> {
    select(index: number): ((node: T) => T) | undefined;
}

type ParenthesizerRule<T extends Node> = (node: T) => T;

type ParenthesizerRuleOrSelector<T extends Node> = OrdinalParentheizerRuleSelector<T> | ParenthesizerRule<T>;

function emitListItemNoParenthesizer(node: Node, emit: (node: Node, parenthesizerRule?: ((node: Node) => Node) | undefined) => void, _parenthesizerRule: ParenthesizerRuleOrSelector<Node> | undefined, _index: number) {
    emit(node);
}

function emitListItemWithParenthesizerRuleSelector(node: Node, emit: (node: Node, parenthesizerRule?: ((node: Node) => Node) | undefined) => void, parenthesizerRuleSelector: OrdinalParentheizerRuleSelector<Node>, index: number) {
    emit(node, parenthesizerRuleSelector.select(index));
}

function emitListItemWithParenthesizerRule(node: Node, emit: (node: Node, parenthesizerRule?: ((node: Node) => Node) | undefined) => void, parenthesizerRule: ParenthesizerRule<Node> | undefined, _index: number) {
    emit(node, parenthesizerRule);
}

function getEmitListItem<T extends Node, R extends ParenthesizerRuleOrSelector<T> | undefined>(emit: (node: Node, parenthesizerRule?: ((node: Node) => Node) | undefined) => void, parenthesizerRule: R): (node: Node, emit: (node: Node, parenthesizerRule?: ((node: Node) => Node) | undefined) => void, parenthesizerRule: R, index: number) => void {
    return emit.length === 1 ? emitListItemNoParenthesizer :
        typeof parenthesizerRule === "object" ? emitListItemWithParenthesizerRuleSelector :
        emitListItemWithParenthesizerRule;
}
