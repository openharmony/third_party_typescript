import {
    __String, Annotation, AnnotationDeclaration, AnnotationPropertyDeclaration, CallExpression, ClassDeclaration, CommentDirectiveType, CompilerOptions,
    computeLineStarts, concatenate, Debug, Decorator, Diagnostic, ElementAccessExpression, EmitHost, EmitTextWriter, endsWith, EnumMember,
    EtsComponentExpression, ExportDeclaration, ExportSpecifier, Expression, ExpressionStatement, factory, flattenDiagnosticMessageText,
    FunctionDeclaration, getAllDecorators, getAncestor, getIllegalDecorators, getLineAndCharacterOfPosition, getRootEtsComponent, getSourceFileOfNode,
    Identifier, ImportClause, ImportDeclaration, ImportEqualsDeclaration, ImportSpecifier, isCallExpression, isEtsComponentExpression,
    isExportSpecifier, isExternalModuleImportEqualsDeclaration, isFunctionDeclaration, isIdentifier, isImportClause, isImportDeclaration,
    isImportSpecifier, isNamedExportBindings, isNamedImportBindings, isNamespaceImport, isNamespaceExport, isNodeModulesDirectory,
    isPropertyAccessExpression, isPropertyAssignment, isStringLiteral, isStructDeclaration, isTypeAliasDeclaration, isWhiteSpaceLike, last,
    LateVisibilityPaintedStatement, LeftHandSideExpression, LineAndCharacter, MethodDeclaration, Modifier, ModifierLike, Mutable,
    NamedExports, NamedImports, NamedImportBindings, NamespaceImport, Node, NodeArray, NodeFactory, NodeFlags, nodeModulesPathPart, noop,
    ObjectLiteralExpression, Path, pathContainsNodeModules, PropertyAccessExpression, PropertyAssignment, PropertyDeclaration, resolvePath,
    setTextRangePosEnd, ScriptKind, some, SourceFile, sys, startsWith, Statement, stringContains, StringLiteral, StructDeclaration, SyntaxKind,
    TextRange, TransformationContext, TransformerFactory, tryGetTextOfPropertyName, visitEachChild, visitLexicalEnvironment, visitNode, visitNodes,
    VisitResult, unescapeLeadingUnderscores
} from "./_namespaces/ts";

/** @internal */
// Required for distinguishing annotations and decorators in other code analysis tools
export const annotationMagicNamePrefix = "__$$ETS_ANNOTATION$$__";
const maxFlowDepthDefaultValue: number = 2000;

/** @internal */
export function isInEtsFile(node: Node |undefined): boolean {
    return node !== undefined && getSourceFileOfNode(node)?.scriptKind === ScriptKind.ETS;
}
/** @internal */
export function isInEtsFileWithOriginal(node: Node |undefined) {
    while (node) {
        node = node.original;
        if (node !== undefined && getSourceFileOfNode(node)?.scriptKind === ScriptKind.ETS) {
            return true;
        }
    }
    return false;
}

/** @internal */
export function getReservedDecoratorsOfEtsFile(node: ClassDeclaration | StructDeclaration | FunctionDeclaration | MethodDeclaration | PropertyDeclaration, host: EmitHost): Decorator[] | undefined {
    let reservedDecorators;
    if (isInEtsFile(node)) {
        reservedDecorators = ensureEtsDecorators(node, host);
    }
    return reservedDecorators;
}

/** @internal */
export function getReservedDecoratorsOfStructDeclaration(node: ClassDeclaration | StructDeclaration | FunctionDeclaration | MethodDeclaration | PropertyDeclaration, host: EmitHost): Decorator[] | undefined {
    let reservedDecorators;
    if (node.parent.kind === SyntaxKind.StructDeclaration) {
        reservedDecorators = ensureEtsDecorators(node, host);
    }
    return reservedDecorators;
}

/** @internal */
export function ensureEtsDecorators(node: ClassDeclaration | StructDeclaration | FunctionDeclaration | MethodDeclaration | PropertyDeclaration, host: EmitHost): Decorator[] | undefined {
    const allDecorators = getAllDecorators(node);
    return getEffectiveDecorators(allDecorators, host);
}

export function concatenateDecoratorsAndModifiers(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined): readonly ModifierLike[] | undefined {
    if (!decorators) return modifiers;
    if (!modifiers) return decorators;
    const decoratorsAndModifiers = concatenate<ModifierLike>(decorators, modifiers);
    return decoratorsAndModifiers;
}

/** 
 * @internal
 * Get the effective ETS Decorators for the node
 *  */
export function getEffectiveDecorators(decorators: readonly Decorator[] | NodeArray<Decorator> | undefined, host: EmitHost) {
    const emitDecorators = host.getCompilerOptions().ets?.emitDecorators;
    if (!emitDecorators) {
        return undefined;
    }
    const reservedComponents: Decorator[] = [];
    if (!decorators) {
        return reservedComponents
    }

    for (let decorator of decorators) {
        const expr = decorator.expression;
        if (isIdentifier(expr)) {
            for (const availableDecorator of emitDecorators) {
                if (availableDecorator.name === expr.escapedText.toString()) {
                    reservedComponents.push(decorator);
                    break;
                }
            }
        }
        else if (isCallExpression(expr)) {
            const childExpr = expr.expression;
            if (isIdentifier(childExpr)) {
                for (const availableDecorator of emitDecorators) {
                    if (availableDecorator.name === childExpr.escapedText.toString()) {
                        if (!availableDecorator.emitParameters) {
                            decorator = factory.updateDecorator(
                                decorator,
                                childExpr
                            );
                        }
                        reservedComponents.push(decorator);
                        break;
                    }
                }
            }
        }
    }

    return reservedComponents;
}

/** @internal */
export function inEtsStylesContext(input: LateVisibilityPaintedStatement | MethodDeclaration, host: EmitHost) {
    if (!host.getCompilerOptions().ets?.styles.component || getSourceFileOfNode(input).scriptKind !== ScriptKind.ETS) {
        return false;
    }
    const decorators: readonly Decorator[] = getAllDecorators(input);

    if (decorators.length == 0) {
        return false;
    }
    for (const decorator of decorators) {
        if (isIdentifier(decorator.expression) && decorator.expression.escapedText.toString() === "Styles") {
            return true;
        }
    }
    return false;
}

export function isEtsFunctionDecorators(name: string | undefined, options: CompilerOptions): boolean {
    const renderDecorators: string[] | undefined = options.ets?.render?.decorator;
    return ((renderDecorators?.length && name && renderDecorators.includes(name)) ||
        name === options.ets?.styles?.decorator || (options.ets?.extend?.decorator?.includes(name as string) ?? false));
}

export function isOhpm(packageManagerType: string | undefined): boolean {
    return packageManagerType === "ohpm";
}

export const ohModulesPathPart: string = "/oh_modules/";
export function isOHModules(modulePath: string): boolean {
    return modulePath.indexOf(ohModulesPathPart) >= 0;
}

export function isOhpmAndOhModules(packageManagerType: string | undefined, modulePath: string): boolean {
    return isOhpm(packageManagerType) && isOHModules(modulePath);
}

export function getModulePathPartByPMType(packageManagerType: string | undefined): string {
    return isOhpm(packageManagerType) ? ohModulesPathPart : nodeModulesPathPart
}

export function getModuleByPMType(packageManagerType: string | undefined): string {
    if (isOhpm(packageManagerType)) {
        return "oh_modules";
    }
    return "node_modules";
}

export function getPackageJsonByPMType(packageManagerType: string | undefined): string {
    if (isOhpm(packageManagerType)) {
        return "oh-package.json5";
    }
    return "package.json";
}

export function isOHModulesDirectory(dirPath: Path) {
    return endsWith(dirPath, "/oh_modules");
}

export function isTargetModulesDerectory(dirPath: Path): boolean {
    return isNodeModulesDirectory(dirPath) || isOHModulesDirectory(dirPath);
}
export function pathContainsOHModules(path: string): boolean {
    return stringContains(path, ohModulesPathPart);
}

export function choosePathContainsModules(packageManagerType: string | undefined, fileName: string): boolean {
    return isOhpm(packageManagerType) ? pathContainsOHModules(fileName) : pathContainsNodeModules(fileName);
}

/** @internal */
export function isOHModulesAtTypesDirectory(dirPath: Path) {
    return endsWith(dirPath, "/oh_modules/@types");
}

/** @internal */
export function isOHModulesReference(fileName: string): boolean {
    return startsWith(fileName, "oh_modules/") || pathContainsOHModules(fileName);
}

/** @internal */
export function isArkTsDecorator(node: Node, compilerOptions?: CompilerOptions): boolean {
    if (compilerOptions) {
        return hasEtsExtendDecoratorNames(getAllDecorators(node), compilerOptions) ||
        hasEtsStylesDecoratorNames(getAllDecorators(node), compilerOptions) ||
        hasEtsBuilderDecoratorNames(getAllDecorators(node), compilerOptions) ||
        hasEtsConcurrentDecoratorNames(getAllDecorators(node), compilerOptions);
    }
    return false;
}

/** @internal */
export function hasEtsExtendDecoratorNames(decorators: NodeArray<Decorator> | readonly Decorator[] | undefined, options: CompilerOptions): boolean {
    const names: string[] = [];
    if (!decorators || !decorators.length) {
        return false;
    }
    decorators.forEach(decorator => {
        const nameExpr = decorator.expression;
        if (isCallExpression(nameExpr) && isIdentifier(nameExpr.expression) &&
            options.ets?.extend.decorator?.includes(nameExpr.expression.escapedText.toString())) {
                names.push(nameExpr.expression.escapedText.toString());
        }
    });
    return names.length !== 0;
}

/** @internal */
export function hasEtsStylesDecoratorNames(decorators: NodeArray<Decorator> | readonly Decorator[] | undefined, options: CompilerOptions): boolean {
    const names: string[] = [];
    if (!decorators || !decorators.length) {
        return false;
    }
    decorators.forEach(decorator => {
        const nameExpr = decorator.expression;
        if (isIdentifier(nameExpr) && nameExpr.escapedText.toString() === options.ets?.styles?.decorator) {
            names.push(nameExpr.escapedText.toString());
        }
    });
    return names.length !== 0;
}

/** @internal */
export function hasEtsBuildDecoratorNames(decorators: NodeArray<Decorator> | readonly Decorator[] | undefined, options: CompilerOptions): boolean {
    const names: string[] = [];
    if (!decorators || !decorators.length) {
        return false;
    }
    decorators.forEach(decorator => {
        const nameExpr = decorator.expression;
        if (isIdentifier(nameExpr) && options.ets?.render?.method.indexOf(nameExpr.escapedText.toString()) !== -1) {
            names.push(nameExpr.escapedText.toString());
        }
    });
    return names.length !== 0;
}

/** @internal */
export function hasEtsBuilderDecoratorNames(decorators: NodeArray<Decorator> | readonly Decorator[] | undefined, options: CompilerOptions): boolean {
    const names: string[] = [];
    if (!decorators || !decorators.length) {
        return false;
    }
    const renderDecorators: string[] | undefined = options?.ets?.render?.decorator;
    if (!(renderDecorators && renderDecorators.length)) {
        return false;
    }
    decorators.forEach(decorator => {
        const nameExpr = decorator.expression;
        if (isIdentifier(nameExpr) && renderDecorators.includes(nameExpr.escapedText.toString())) {
            names.push(nameExpr.escapedText.toString());
        }
    });
    return names.length !== 0;
}

/** @internal */
export function hasEtsConcurrentDecoratorNames(decorators: NodeArray<Decorator> | readonly Decorator[] | undefined, options: CompilerOptions): boolean {
    const names: string[] = [];
    if (!decorators || !decorators.length) {
        return false;
    }
    decorators.forEach(decorator => {
        const nameExpr = decorator.expression;
        if (isIdentifier(nameExpr) && nameExpr.escapedText.toString() === options.ets?.concurrent?.decorator) {
            names.push(nameExpr.escapedText.toString());
        }
    });
    return names.length !== 0;
}

/** @internal */
export function isTokenInsideBuilder(decorators: NodeArray<Decorator> | readonly Decorator[] | undefined, compilerOptions: CompilerOptions): boolean {
    const renderDecorators = compilerOptions.ets?.render?.decorator ?? ["Builder", "LocalBuilder"];

    if (!decorators) {
        return false;
    }

    if (!(renderDecorators && renderDecorators.length)) {
        return false;
    }

    for (const decorator of decorators) {
        if (isIdentifier(decorator.expression) && renderDecorators.includes((<Identifier>(decorator.expression)).escapedText.toString())) {
            return true;
        }
    }
    return false;
}

/** @internal */
export function getEtsComponentExpressionInnerCallExpressionNode(node: Node | undefined): EtsComponentExpression | undefined {
    while (node && node.kind !== SyntaxKind.EtsComponentExpression) {
        if (node.kind === SyntaxKind.CallExpression) {
            node = (<CallExpression>node).expression;
        }
        else if (node.kind === SyntaxKind.PropertyAccessExpression) {
            node = (<PropertyAccessExpression>node).expression;
        }
        else {
            node = undefined;
        }
    }
    return <EtsComponentExpression>node;
}

/** @internal */
export function getRootEtsComponentInnerCallExpressionNode(node: Node | undefined): EtsComponentExpression | undefined {
    if (node && isEtsComponentExpression(node)) {
        return node;
    }

    while (node) {
        const ancestor = <CallExpression>getAncestor(isCallExpression(node) ? node.parent : node, SyntaxKind.CallExpression);
        const target = getRootEtsComponent(ancestor);
        if (target && isInStateStylesObject(node)) {
            return target;
        }
        node = ancestor ?? node.parent;
    }

    return undefined;
}

/** @internal */
export function getEtsComponentExpressionInnerExpressionStatementNode(node: Node | undefined): CallExpression | EtsComponentExpression | PropertyAccessExpression | undefined {
    while (node && !isIdentifier(node)) {
        const parent = node;
        const currentNode = (node as ExpressionStatement | CallExpression | PropertyAccessExpression | EtsComponentExpression).expression;
        if (currentNode && isIdentifier(currentNode)) {
            node = parent;
            break;
        }
        else {
            node = currentNode;
        }
    }
    if (!node) {
        return undefined;
    }
    if (isCallExpression(node) || isEtsComponentExpression(node) || isPropertyAccessExpression(node)) {
        return node;
    }
    return undefined;
}

/** @internal */
function isInStateStylesObject(node: Node | undefined): boolean {
    const ancestor = <ObjectLiteralExpression>getAncestor(node, SyntaxKind.ObjectLiteralExpression);
    return ancestor !== undefined && ancestor.parent !== undefined && isPropertyAssignment(ancestor.parent);
}

/** @internal */
export function getEtsExtendDecoratorsComponentNames(decorators: NodeArray<Decorator> | readonly Decorator[] | undefined, compilerOptions: CompilerOptions): __String[] {
    const extendComponents: __String[] = [];
    const extendDecorator = compilerOptions.ets?.extend?.decorator ?? "Extend";
    decorators?.forEach((decorator) => {
        if (decorator.expression.kind === SyntaxKind.CallExpression) {
            const identifier = (<CallExpression>decorator.expression).expression;
            const args = (<CallExpression>decorator.expression).arguments;
            if (identifier.kind === SyntaxKind.Identifier && extendDecorator?.includes((<Identifier>identifier).escapedText.toString()) && args.length) {
                // only read @Extend(...args) first argument
                if (args[0].kind === SyntaxKind.Identifier) {
                    extendComponents.push((<Identifier>args[0]).escapedText);
                }
            }
        }
    });
    return extendComponents;
}

/** @internal */
export function getEtsStylesDecoratorComponentNames(decorators: NodeArray<Decorator> | readonly Decorator[] | undefined, compilerOptions: CompilerOptions): __String[] {
    const stylesComponents: __String[] = [];
    const stylesDecorator = compilerOptions.ets?.styles?.decorator ?? "Styles";
    decorators?.forEach(decorator => {
        if (decorator.kind === SyntaxKind.Decorator && decorator.expression.kind === SyntaxKind.Identifier) {
            const identifier = <Identifier>decorator.expression;
            if (identifier.kind === SyntaxKind.Identifier && identifier.escapedText === stylesDecorator) {
                stylesComponents.push(identifier.escapedText);
            }
        }
    });
    return stylesComponents;
}

/** @internal */
export function filterEtsExtendDecoratorComponentNamesByOptions(decoratorComponentNames: __String[], compilerOptions: CompilerOptions): __String[] {
    if (!decoratorComponentNames.length) {
        return [];
    }
    const filtered: __String[] = [];
    compilerOptions.ets?.extend.components.forEach(({ name }) => {
        if (name === last(decoratorComponentNames)) {
            filtered.push(name);
        }
    });
    return filtered;
}

export function getTypeExportImportAndConstEnumTransformer(context: TransformationContext): (node: SourceFile) => SourceFile {
    return transformTypeExportImportAndConstEnumInTypeScript(context);
}

export function getAnnotationTransformer(): TransformerFactory<SourceFile> {
    return (context: TransformationContext) => transformAnnotation(context);
}

export function transformAnnotation(context: TransformationContext): (node: SourceFile) => SourceFile {
    const resolver = context.getEmitResolver();

    return transformSourceFile;

    function transformSourceFile(node: SourceFile): SourceFile {
        if (node.isDeclarationFile) {
            return node;
        }
        // Firstly, visit declarations
        const updatedSource = factory.updateSourceFile(node,
            visitLexicalEnvironment(node.statements, visitAnnotationsDeclarations, context));
        // Secondly, visit import and usage of annotations
        return factory.updateSourceFile(
            node,
            visitLexicalEnvironment(updatedSource.statements, visitAnnotations, context));
    }

    function visitAnnotationsDeclarations(node: Node): VisitResult<Node> {
        switch (node.kind) {
            case SyntaxKind.AnnotationDeclaration:
                return visitAnnotationDeclaration(<AnnotationDeclaration>node);
            default:
                return visitEachChild(node, visitAnnotationsDeclarations, context);
        }
    }

    function visitAnnotations(node: Node): VisitResult<Node> {
        switch (node.kind) {
            case SyntaxKind.ImportSpecifier:
                return visitImportSpecifier(<ImportSpecifier>node);
            case SyntaxKind.Decorator:
                return visitAnnotation(<Annotation>node);
            default:
                return visitEachChild(node, visitAnnotations, context);
        }
    }

    function visitImportSpecifier(node: ImportSpecifier): VisitResult<ImportSpecifier> {
        // Return if the import has type or not refered to Annotation
        if (node.isTypeOnly || !resolver.isReferredToAnnotation(node)) {
            return node;
        }
        const magicPrefixName = addMagicPrefixToAnnotationNameIdentifier(node.name);
        Debug.assert(isIdentifier(magicPrefixName));
        // Add magic prefix for import Annotation. For example,
        // import {Anno} from "xxx" ---> import {__$$ETS_ANNOTATION$$__Anno} from "xxx"
        return factory.updateImportSpecifier(node, node.isTypeOnly, node.propertyName, magicPrefixName);
    }

    function visitAnnotationDeclaration(node: AnnotationDeclaration): VisitResult<AnnotationDeclaration> {
        // Add magic prefix for AnnotationDeclaration. For example,
        // @interface Anno {} ---> @interface __$$ETS_ANNOTATION$$__Anno {}
        const magicPrefixName = addMagicPrefixToAnnotationNameIdentifier(node.name);
        Debug.assert(isIdentifier(magicPrefixName));
        // Add explicit type annotation and initializer. For example,
        // @interface Anno {
        //     a = 10 + 5
        // }
        //
        // will be transformed to
        //
        // @interface __$$ETS_ANNOTATION$$__Anno {
        //     a: number = 15
        // }
        const members = node.members.map((node: AnnotationPropertyDeclaration) => {
            const type = resolver.getAnnotationPropertyInferredType(node);
            const initializer = resolver.getAnnotationPropertyEvaluatedInitializer(node);
            return factory.updateAnnotationPropertyDeclaration(node, node.name, type, initializer);
        });

        return factory.updateAnnotationDeclaration(node, node.modifiers, magicPrefixName, members);
    }

    function visitAnnotation(node: Annotation): VisitResult<Annotation> {
        if (!node.annotationDeclaration) {
            return node;
        }
        // Add default values into annotation object literal. For example,
        // @interface Anno {
        //     a: number = 10
        //     b: string
        // }
        //
        // @Anno({b: "abc"}) --- > @Anno({a: 10, b: "abc"})
        // class C {}
        //
        // and
        //
        // Add the magic prefix for annotation name. For example,
        // @myModule.Anno({a: 10, b: "abc"}) --- > @myModule.__$$ETS_ANNOTATION$$__Anno({a: 10, b: "abc"})
        return factory.updateDecorator(
            node,
            addMagicPrefixToAnnotationNameIdentifier(addDefaultValuesIntoAnnotationObjectLiteral(node)),
            node.annotationDeclaration
        );
    }

    function addMagicPrefixToAnnotationNameIdentifier(expr: Expression): Identifier | PropertyAccessExpression | CallExpression {
        switch (expr.kind) {
            case SyntaxKind.Identifier:
                return factory.createIdentifier(
                    annotationMagicNamePrefix + (expr as Identifier).escapedText
                );
            case SyntaxKind.PropertyAccessExpression:
                const propAccessExpr = expr as PropertyAccessExpression;
                return factory.updatePropertyAccessExpression(
                    propAccessExpr,
                    propAccessExpr.expression,
                    addMagicPrefixToAnnotationNameIdentifier(propAccessExpr.name) as Identifier
                );
            case SyntaxKind.CallExpression:
                const callExpr = expr as CallExpression;
                return factory.updateCallExpression(
                    callExpr,
                    addMagicPrefixToAnnotationNameIdentifier(callExpr.expression),
                    callExpr.typeArguments,
                    callExpr.arguments
                );
            default:
                return expr as (Identifier | PropertyAccessExpression | CallExpression);
        }
    }

    function addDefaultValuesIntoAnnotationObjectLiteral(annotation: Annotation): CallExpression {
        Debug.assert(annotation.annotationDeclaration);
        const members = annotation.annotationDeclaration.members;
        if (isIdentifier(annotation.expression) || isPropertyAccessExpression(annotation.expression)) {
            const defaultValues = new Array<PropertyAssignment>(members.length);
            for (let i = 0; i < members.length; ++i) {
                const member = members[i] as AnnotationPropertyDeclaration;
                const initializer = resolver.getAnnotationPropertyEvaluatedInitializer(member);
                Debug.assert(initializer !== undefined);
                defaultValues[i] = factory.createPropertyAssignment(member.name, initializer!);
            }
            const newCallExpr = factory.createCallExpression(
                annotation.expression,
                /* typeArguments */ undefined,
                [factory.createObjectLiteralExpression(defaultValues, false)]);
            return newCallExpr;
        }
        else if (isCallExpression(annotation.expression)) {
            Debug.assert(annotation.expression.arguments.length === 1);
            const obj = annotation.expression.arguments[0] as ObjectLiteralExpression;
            const objPropNameToProp = new Map<__String, PropertyAssignment>();
            obj.properties.forEach(p => {
                Debug.assert(isPropertyAssignment(p));
                objPropNameToProp.set(tryGetTextOfPropertyName(p.name)!, p);
            });

            const defaultValues = new Array<PropertyAssignment>(members.length);
            for (let i = 0; i < members.length; ++i) {
                const member = members[i] as AnnotationPropertyDeclaration;
                const memberName = tryGetTextOfPropertyName(member.name)!;
                if (objPropNameToProp.has(memberName)) {
                    const evaluatedProps = resolver.getAnnotationObjectLiteralEvaluatedProps(annotation);
                    Debug.assert(evaluatedProps !== undefined);
                    defaultValues[i] = factory.createPropertyAssignment(member.name, evaluatedProps.get(memberName)!);
                }
                else {
                    const evaluatedInitializer = resolver.getAnnotationPropertyEvaluatedInitializer(member);
                    Debug.assert(evaluatedInitializer !== undefined);
                    defaultValues[i] = factory.createPropertyAssignment(member.name, evaluatedInitializer);
                }
            }
            const newCallExpr = factory.updateCallExpression(
                annotation.expression,
                annotation.expression.expression,
                /* typeArguments */ undefined,
                [factory.updateObjectLiteralExpression(obj, defaultValues)]);
            return newCallExpr;
        }
        Debug.fail();
    }
}

/**
 * Add 'type' flag to import/export when import/export an type member.
 * Replace const enum with number and string literal.
 */
export function transformTypeExportImportAndConstEnumInTypeScript(context: TransformationContext): (node: SourceFile) => SourceFile {
    const resolver = context.getEmitResolver();
    interface ImportInfo {
        name: Identifier | undefined,
        namespaceImport: NamespaceImport | undefined,
        namedImports: ImportSpecifier[]
    };
    interface ExportInfo {
        namedExports: ExportSpecifier[]
    };

    // recore type import/export info to create new import/export type statement
    let currentTypeImportInfo: ImportInfo;
    let currentTypeExportInfo: ExportInfo;

    return transformSourceFile;

    function transformSourceFile(node: SourceFile): SourceFile {
        if (node.isDeclarationFile) {
            return node;
        }
        const visited = factory.updateSourceFile(
            node,
            visitLexicalEnvironment(node.statements, visitImportExportAndConstEnumMember, context));
        return visited;
    }

    function visitImportExportAndConstEnumMember(node: Node): VisitResult<Node> {
        switch (node.kind) {
            case SyntaxKind.ImportDeclaration:
                return visitImportDeclaration(<ImportDeclaration>node);
            case SyntaxKind.ImportEqualsDeclaration:
                return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
            case SyntaxKind.ExportDeclaration:
                return visitExportDeclaration(<ExportDeclaration>node);
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                return visitConstEnum(<PropertyAccessExpression | ElementAccessExpression>node);
            case SyntaxKind.EnumMember:
                return visitEnumMember(<EnumMember>node);
            default:
                return visitEachChild(node, visitImportExportAndConstEnumMember, context);
        }
    }

    /**
     * Transform:
     *
     * import a, {b, c} from ...
     *
     * To:
     *
     * import {b} from ...
     * import type a from ...
     * import type {c} from ...
     *
     * when 'a' and 'c' are type.
     */
    function visitImportDeclaration(node: ImportDeclaration): VisitResult<Statement> {
        // return if the import already has 'type'
        if (!node.importClause || node.importClause.isTypeOnly) {
            return node;
        }
        resetcurrentTypeImportInfo();
        const res: Statement[] = [];
        const importClause = visitNode(node.importClause, visitImportClause, isImportClause);
        if (importClause) {
            res.push(factory.updateImportDeclaration(node, /*modifiers*/ undefined,
                importClause, node.moduleSpecifier, /*assertClause*/ undefined));
        }
        // create new import statement with 'type'
        const typeImportClauses = createTypeImportClause();
        for (const typeImportClause of typeImportClauses) {
            res.push(factory.createImportDeclaration(/*modifiers*/ undefined,
                typeImportClause, node.moduleSpecifier));
        }
        return res.length > 0 ? res : undefined;
    }

    function visitImportClause(node: ImportClause): VisitResult<ImportClause> {
        if (node.isTypeOnly) {
            return node;
        }
        let name: Identifier | undefined;
        if (resolver.isReferencedAliasDeclaration(node)) {
            name = node.name;
        }
        // consider it is a type if the symbol has referenced.
        else if (resolver.isReferenced(node)) {
            addTypeImportClauseName(node);
        }
        const namedBindings = visitNode(node.namedBindings, visitNamedImportBindings, isNamedImportBindings);
        return (name || namedBindings) ?
            factory.updateImportClause(node, /*isTypeOnly*/ false, name, namedBindings) :
            undefined;
    }

    function visitNamedImportBindings(node: NamedImportBindings): VisitResult<NamedImportBindings> {
        if (node.kind === SyntaxKind.NamespaceImport) {
            if (resolver.isReferencedAliasDeclaration(node)) {
                return node;
            }
            if (resolver.isReferenced(node)) {
                addTypeNamespaceImport(node);
            }
            return undefined;
        }
        else {
            const elements = visitNodes(node.elements, visitImportSpecifier, isImportSpecifier);
            return some(elements) ? factory.updateNamedImports(node, elements) : undefined;
        }
    }

    function visitImportSpecifier(node: ImportSpecifier): VisitResult<ImportSpecifier> {
        if (node.isTypeOnly) {
            return node;
        }
        if (resolver.isReferencedAliasDeclaration(node)) {
            return node;
        }
        if (resolver.isReferenced(node)) {
            addTypeImportSpecifier(node);
        }
        return undefined;
    }

    function addTypeImportClauseName(node: ImportClause): void {
        currentTypeImportInfo.name = node.name;
    }

    function addTypeNamespaceImport(node: NamespaceImport): void {
        currentTypeImportInfo.namespaceImport = node;
    }

    function addTypeImportSpecifier(node: ImportSpecifier): void {
        currentTypeImportInfo.namedImports.push(node);
    }

    /**
     * Create new import type statement, like:
     * import type {a} from ...
     */
    function createTypeImportClause(): ImportClause[] {
        const name: Identifier | undefined = currentTypeImportInfo.name;
        let namedBindings: NamedImportBindings | undefined;
        if (currentTypeImportInfo.namespaceImport) {
            namedBindings = currentTypeImportInfo.namespaceImport;
        }
        else if (currentTypeImportInfo.namedImports.length > 0) {
            namedBindings = factory.createNamedImports(currentTypeImportInfo.namedImports);
        }
        const typeImportClauses: ImportClause[] = [];
        if (name !== undefined) {
            typeImportClauses.push(factory.createImportClause(/*isTypeOnly*/ true, name, /*namedBindings*/ undefined));
        }
        if (namedBindings !== undefined) {
            typeImportClauses.push(factory.createImportClause(/*isTypeOnly*/ true, /*name*/ undefined, namedBindings));
        }
        resetcurrentTypeImportInfo();
        return typeImportClauses;
    }

    /**
     * Transform:
     *
     * import a = require(...)
     *
     * To:
     *
     * import type a = require(...)
     *
     * when 'a' is type.
     */
    function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): VisitResult<Statement> {
        // return if the import already has 'type'
        if (node.isTypeOnly) {
            return node;
        }

        if (isExternalModuleImportEqualsDeclaration(node)) {
            const isReferenced = resolver.isReferencedAliasDeclaration(node);
            if (isReferenced) {
                return node;
            }
            if (resolver.isReferenced(node)) {
                return factory.updateImportEqualsDeclaration(node, node.modifiers,
                    /*isTypeOnly*/ true, node.name, node.moduleReference);
            }

            return undefined;
        }

        return node;
    }

    /**
     * Transform:
     *
     * export {a}
     *
     * To:
     *
     * export type {a}
     *
     * when 'a' is type.
     */
    function visitExportDeclaration(node: ExportDeclaration): VisitResult<Statement> {
        // return if the export already has 'type'or export *
        if (node.isTypeOnly || !node.exportClause || isNamespaceExport(node.exportClause)) {
            return node;
        }

        resetcurrentTypeExportInfo();
        const res: Statement[] = [];

        const exportClause = visitNode(node.exportClause, visitNamedExports, isNamedExportBindings);
        if (exportClause) {
            res.push(factory.updateExportDeclaration(node, /*modifiers*/ undefined,
                node.isTypeOnly, exportClause, node.moduleSpecifier, /*assertClause*/ undefined));
        }
        const typeExportClause = createTypeExportClause();
        if (typeExportClause) {
            res.push(factory.createExportDeclaration(/*modifiers*/ undefined,
                /*isTypeOnly*/ true, typeExportClause, node.moduleSpecifier));
        }

        return res.length > 0 ? res : undefined;
    }

    function visitNamedExports(node: NamedExports): VisitResult<NamedExports> {
        const elements = visitNodes(node.elements, visitExportSpecifier, isExportSpecifier);
        return some(elements) ? factory.updateNamedExports(node, elements) : undefined;
    }

    function visitExportSpecifier(node: ExportSpecifier): VisitResult<ExportSpecifier> {
        if (node.isTypeOnly) {
            return node;
        }
        if (resolver.isValueAliasDeclaration(node)) {
            return node;
        }
        // consider all rest member are type.
        addTypeExportSpecifier(node);
        return undefined;
    }

    function addTypeExportSpecifier(node: ExportSpecifier): void {
        currentTypeExportInfo.namedExports.push(node);
    }

    /**
     * Create new export type statement, like:
     * export type {a}
     */
    function createTypeExportClause(): NamedExports | undefined {
        let namedBindings: NamedExports | undefined;
        if (currentTypeExportInfo.namedExports.length > 0) {
            namedBindings = factory.createNamedExports(currentTypeExportInfo.namedExports);
        }
        resetcurrentTypeExportInfo();
        return namedBindings;
    }

    function visitConstEnum(node: PropertyAccessExpression | ElementAccessExpression): LeftHandSideExpression {
        const constantValue = resolver.getConstantValue(node);
        if (constantValue !== undefined) {
            const substitute = typeof constantValue === "string" ?
                factory.createStringLiteral(constantValue) :
                factory.createNumericLiteral(constantValue);
            return substitute;
        }

        return visitEachChild(node, visitImportExportAndConstEnumMember, context);
    }

    /**
     * If the enum member is a const value, replace it.
     */
    function visitEnumMember(node: EnumMember): VisitResult<EnumMember> {
        const value = resolver.getConstantValue(node);
        if (value !== undefined) {
            const substitute = typeof value === "string" ?
                factory.createStringLiteral(value) :
                factory.createNumericLiteral(value);
            return factory.updateEnumMember(node, node.name, substitute);
        }
        return visitEachChild(node, visitImportExportAndConstEnumMember, context);
    }

    function resetcurrentTypeImportInfo(): void {
        currentTypeImportInfo = { name: undefined, namespaceImport: undefined, namedImports:[] };
    }

    function resetcurrentTypeExportInfo(): void {
        currentTypeExportInfo = { namedExports:[] };
    }
}

export function hasTsNoCheckOrTsIgnoreFlag(node: SourceFile): boolean {
    // check @ts-nocheck flag
    if (!!node.checkJsDirective && node.checkJsDirective.enabled === false) {
        return true;
    }
    // check @ts-ignore flag
    if (node.commentDirectives !== undefined) {
        for (const commentDirective of node.commentDirectives) {
            if (commentDirective.type === CommentDirectiveType.Ignore) {
                return true;
            }
        }
    }
    return false;
}

export function createObfTextSingleLineWriter(): EmitTextWriter {
    const space: string = " ";
    let output: string;
    let lineStart: boolean;
    let linePos: number;
    let lineCount: number;
    // If the last character of string is the one of below chars, there is no need to write space again.
    const noSpaceTrailingChars: Set<string> = new Set([' ', ';', ',', '(', ')', '{', '}']);

    function updateLineCountAndPosFor(s: string) {
        const lineStartsOfS = computeLineStarts(s);
        if (lineStartsOfS.length > 1) {
            // 1: The first element of the lineStartsOfS
            lineCount = lineCount + lineStartsOfS.length - 1;
            linePos = output.length - s.length + last(lineStartsOfS);
            lineStart = (linePos - output.length) === 0;
        }
        else {
            lineStart = false;
        }
    }

    function writeText(s: string) {
        if (s && s.length) {
            if (lineStart) {
                lineStart = false;
            }
            output += s;
            updateLineCountAndPosFor(s);
        }
    }

    function write(s: string) {
        writeText(s);
    }

    function reset(): void {
        output = "";
        lineStart = true;
        linePos = 0;
        lineCount = 0;
    }

        // This method is used to write indentation and line breaks. If the string is blank, the writing is skipped.
        // In addition, this method can be called to write comments and code in bundle mode, but obfuscation is not in bundle mode.
    function rawWrite(s: string) {
        if (s !== undefined) {
            if ((lineStart || endsWithNoSpaceTrailingChar(output)) && s.trim().length === 0) {
                return;
            }
            output += s;
            updateLineCountAndPosFor(s);
        }
    }

    function writeLiteral(s: string) {
        if (s && s.length) {
            write(s);
        }
    }

    function writeLine(force?: boolean): void {
        if (!force && (lineStart || endsWithNoSpaceTrailingChar(output))) {
            return;
        }
        output += space;
        lineStart = false;
    }

    function endsWithNoSpaceTrailingChar(input: string): boolean {
        // Get the last character of a string.
        const lastChar: string = input.charAt(input.length - 1);
        return noSpaceTrailingChars.has(lastChar);
    }

    function getTextPosWithWriteLine() {
        return lineStart ? output.length : (output.length + space.length);
    }

    reset();

    return {
        write,
        rawWrite,
        writeLiteral,
        writeLine,
        increaseIndent: noop,
        decreaseIndent: noop,
        getIndent: () => 0,
        getTextPos: () => output.length,
        getLine: () => lineCount,
        getColumn: () => lineStart ? 0 : output.length - linePos,
        getText: () => output,
        isAtStartOfLine: () => lineStart,
        hasTrailingComment: () => false,
        hasTrailingWhitespace: () => !!output.length && isWhiteSpaceLike(output.charCodeAt(output.length - 1)),
        clear: reset,
        reportInaccessibleThisError: noop,
        reportPrivateInBaseOfClassExpression: noop,
        reportInaccessibleUniqueSymbolError: noop,
        trackSymbol: () => false,
        writeKeyword: write,
        writeOperator: write,
        writeParameter: write,
        writeProperty: write,
        writePunctuation: write,
        writeSpace: write,
        writeStringLiteral: write,
        writeSymbol: (s, _) => write(s),
        writeTrailingSemicolon: write,
        writeComment: noop,
        getTextPosWithWriteLine
    };
}

/** @internal */
export function isSendableFunctionOrType(node: Node, maybeNotOriginalNode: boolean = false): boolean {
    if (!node || !(isFunctionDeclaration(node) || isTypeAliasDeclaration(node))) {
        return false;
    }
    if (!isInEtsFile(node) && !(maybeNotOriginalNode && isInEtsFileWithOriginal(node))) {
        return false;
    }
    const illegalDecorators = getIllegalDecorators(node);
    if (!illegalDecorators || illegalDecorators.length !== 1) {
        return false;
    }
    const nameExpr = illegalDecorators[0].expression;
    return (isIdentifier(nameExpr) && nameExpr.escapedText.toString() === 'Sendable');
}

/** @internal */
export function checkStructPropertyPosition(declaration: Node, prop: Node): boolean {
    // Struct can't be declared inside another struct, so if the parent of PropertyDeclaration node is StructDeclaration 
    // and its end position is behind the end position of PropertyDeclaration node, we can make sure the property is declared and used in the same struct.
    return declaration.pos < prop.pos && isStructDeclaration(declaration.parent) && declaration.parent.end > prop.end;
}

export const REQUIRE_DECORATOR = 'Require';
const JSON_SUFFIX = '.json';
const KIT_PREFIX = '@kit.';
const DEFAULT_KEYWORD = 'default';
const ETS_DECLARATION = '.d.ets';
const OHOS_KIT_CONFIG_PATH = './openharmony/ets/build-tools/ets-loader/kit_configs';
const HMS_KIT_CONFIG_PATH = './hms/ets/build-tools/ets-loader/kit_configs';

interface KitSymbolInfo {
    source: string,
    bindings: string,
}

interface KitJsonInfo {
    symbols: {
        [symbol: string]: KitSymbolInfo,
    }
}

const kitJsonCache = new Map<string, KitJsonInfo | undefined>();

/** @internal */
export function getSdkPath(compilerOptions: CompilerOptions): string | undefined {
    return compilerOptions.etsLoaderPath ? resolvePath(compilerOptions.etsLoaderPath, '../../../..') : undefined;
}

function getKitJsonObject(name: string, sdkPath: string): KitJsonInfo | undefined {
    if (kitJsonCache?.has(name)) {
        return kitJsonCache.get(name);
    }
    const ohosJsonPath = resolvePath(sdkPath, OHOS_KIT_CONFIG_PATH, `./${name}${JSON_SUFFIX}`);
    const hmsJsonPath = resolvePath(sdkPath, HMS_KIT_CONFIG_PATH, `./${name}${JSON_SUFFIX}`);

    let fileInfo: string | undefined =
        sys.fileExists(ohosJsonPath) ? sys.readFile(ohosJsonPath, 'utf-8') :
        sys.fileExists(hmsJsonPath) ? sys.readFile(hmsJsonPath, 'utf-8') :
        undefined;
    if (!fileInfo) {
        kitJsonCache?.set(name, undefined);
        return undefined;
    }

    const obj = JSON.parse(fileInfo) as KitJsonInfo;
    kitJsonCache?.set(name, obj);

    return obj;
}

export function cleanKitJsonCache(): void {
    kitJsonCache?.clear();
}

function setVirtualNodeAndKitImportFlags<T extends Node>(node: T, start: number = 0, end: number = 0): T {
    node.virtual = true;
    setTextRangePosEnd(node, start, end);
    (node as Mutable<T>).flags |= NodeFlags.KitImportFlags;
    return node;
}

function setNoOriginalText<T extends Node>(node: T): T {
    (node as Mutable<T>).flags |= NodeFlags.NoOriginalText;
    return node;
}

function createNameImportDeclaration(factory: NodeFactory, isType: boolean, name: Identifier, source: string,
    oldStatement: ImportDeclaration, importSpecifier: TextRange, isLazy?: boolean): ImportDeclaration {
    const oldModuleSpecifier = oldStatement.moduleSpecifier;
    const newModuleSpecifier = setNoOriginalText(setVirtualNodeAndKitImportFlags(
        factory.createStringLiteral(source), oldModuleSpecifier.pos, oldModuleSpecifier.end)
    );
    let newImportClause = factory.createImportClause(isType, name, undefined);
    // Add the isLazy flag in the original importDeclaration to the new importClause statement.
    (newImportClause as Mutable<ImportClause>).isLazy = isLazy;
    newImportClause = setVirtualNodeAndKitImportFlags(newImportClause, importSpecifier.pos, importSpecifier.end);
    const newImportDeclaration = setVirtualNodeAndKitImportFlags(
        factory.createImportDeclaration(undefined, newImportClause, newModuleSpecifier), oldStatement.pos, oldStatement.end);
    return newImportDeclaration;
}

function createBindingImportDeclaration(factory: NodeFactory, isType: boolean, propname: string, name: Identifier, source: string,
    oldStatement: ImportDeclaration, importSpecifier: TextRange, isLazy?: boolean): ImportDeclaration {
    const oldModuleSpecifier = oldStatement.moduleSpecifier;
    const newModuleSpecifier = setNoOriginalText(
        setVirtualNodeAndKitImportFlags(factory.createStringLiteral(source), oldModuleSpecifier.pos, oldModuleSpecifier.end));
    const newPropertyName = setNoOriginalText(setVirtualNodeAndKitImportFlags(factory.createIdentifier(propname), name.pos, name.end));
    // The location information of the newImportSpecific is created using the location information of the old importSpecifier.
    const newImportSpecific = setVirtualNodeAndKitImportFlags(
        factory.createImportSpecifier(false, newPropertyName, name), importSpecifier.pos, importSpecifier.end);
    // The location information of the newNamedBindings is created using the location information of the old importSpecifier.
    const newNamedBindings = setVirtualNodeAndKitImportFlags(factory.createNamedImports([newImportSpecific]), importSpecifier.pos, importSpecifier.end);
    let newImportClause = factory.createImportClause(isType, undefined, newNamedBindings);
    // Add the isLazy flag in the original importDeclaration to the new importClause statement.
    (newImportClause as Mutable<ImportClause>).isLazy = isLazy;
    // The location information of the newImportClause is created using the location information of the old importSpecifier.
    newImportClause = setVirtualNodeAndKitImportFlags(
        newImportClause, importSpecifier.pos, importSpecifier.end);
    const newImportDeclaration = setVirtualNodeAndKitImportFlags(
        factory.createImportDeclaration(undefined, newImportClause, newModuleSpecifier), oldStatement.pos, oldStatement.end);
    return newImportDeclaration;
}

function createImportDeclarationForKit(factory: NodeFactory, isType: boolean, name: Identifier, symbol: KitSymbolInfo,
    oldStatement: ImportDeclaration, importSpecifier: TextRange, isLazy?: boolean): ImportDeclaration {
    const source = symbol.source.replace(/\.d.[e]?ts$/, '');
    const binding = symbol.bindings;
    if (binding === DEFAULT_KEYWORD) {
        return createNameImportDeclaration(factory, isType, name, source, oldStatement, importSpecifier, isLazy);
    }
    return createBindingImportDeclaration(factory, isType, binding, name, source, oldStatement, importSpecifier, isLazy);
}

function markKitImport(statement : Statement, markedkitImportRanges: Array<TextRange>): void {
    markedkitImportRanges.push({ pos: statement.pos, end: statement.end });
}

/** @internal */
export function isInMarkedKitImport(sourceFile: SourceFile, pos: number, end: number): boolean {
    return !!sourceFile.markedKitImportRange?.some(
        range => {
            return (range.pos <= pos) && (end <= range.end);
        }
    );
}

function excludeStatementForKitImport(statement: Statement): boolean {
    if (!isImportDeclaration(statement) || // check is ImportDeclaration
        !statement.importClause || // exclude import 'mode'
        (statement.importClause.namedBindings && isNamespaceImport(statement.importClause.namedBindings)) || // exclude namespace import
        !isStringLiteral(statement.moduleSpecifier) || statement.illegalDecorators || // exclude if may has error
        !statement.moduleSpecifier.text.startsWith(KIT_PREFIX) || // is not kit import
        statement.modifiers || // exclude if has modifiers
        statement.assertClause) { // not support assertClause
        return true;
    }
    return false;
}

interface WhiteListInfo {
    kitName: string;
    symbolName: string;
}
// This symbols have error in kit files, so add it in white list and don't change
const whiteListForErrorSymbol: WhiteListInfo[] = [
    { kitName: '@kit.CoreFileKit', symbolName: 'DfsListeners' },
    { kitName: '@kit.NetworkKit', symbolName: 'VpnExtensionContext' },
    { kitName: '@kit.ArkUI', symbolName: 'CustomContentDialog' },
];

// This symbol will clause new warning in ts files
const whiteListForTsWarning: WhiteListInfo[] = [
    { kitName: '@kit.ConnectivityKit', symbolName: 'socket' },
];

// This files import the symbol from ets file, so we won't change them in ts files
const whiteListForTsFile: Set<string> = new Set([
    '@kit.AccountKit', '@kit.MapKit', '@kit.Penkit', '@kit.ScenarioFusionKit',
    '@kit.ServiceCollaborationKit', '@kit.SpeechKit', '@kit.VisionKit',
]);

function inWhiteList(moduleSpecifierText: string, importName: string, inEtsContext: boolean): boolean {
    if (whiteListForErrorSymbol.some(info => (info.kitName === moduleSpecifierText && info.symbolName === importName))) {
        return true;
    }
    if (!inEtsContext &&
        whiteListForTsWarning.some(info => (info.kitName === moduleSpecifierText && info.symbolName === importName))) {
        return true;
    }
    return false;
}

function processKitStatementSuccess(factory: NodeFactory, statement: ImportDeclaration, jsonObject: KitJsonInfo | undefined, inEtsContext: boolean,
    newImportStatements: Array<ImportDeclaration>): boolean {
    const importClause = statement.importClause!;
    const moduleSpecifierText = (statement.moduleSpecifier as StringLiteral).text;
    const kitSymbol = jsonObject?.symbols;
    if (!kitSymbol) {
        return false;
    }

    const isType = importClause.isTypeOnly;
    const isLazy = importClause.isLazy;
    if (importClause.name) {
        const symbol = kitSymbol[DEFAULT_KEYWORD];
        // has error when import ets declaration in ts file
        if (!symbol || (!inEtsContext && symbol.source.endsWith(ETS_DECLARATION))) {
            return false;
        }
        newImportStatements.push(createImportDeclarationForKit(factory, isType, importClause.name, symbol, statement, importClause.name, isLazy));
    }

    if (importClause.namedBindings) {
        let hasError = false;
        (importClause.namedBindings as NamedImports).elements.forEach(
            element => {
                if (hasError) {
                    return;
                }
                const importName = unescapeLeadingUnderscores(element.propertyName ? element.propertyName.escapedText : element.name.escapedText);
                const aliasName = element.name;

                if (inWhiteList(moduleSpecifierText, importName, inEtsContext)) {
                    hasError = true;
                    return;
                }

                const symbol = kitSymbol[importName];
                if (!symbol || !aliasName ||
                    // has error when import ets declaration in ts file
                    (!inEtsContext && symbol.source.endsWith(ETS_DECLARATION)) ||
                    // can not have duplicate type
                    (isType && element.isTypeOnly)) {
                    hasError = true;
                    return;
                }

                newImportStatements.push(
                    createImportDeclarationForKit(factory, isType || element.isTypeOnly, aliasName, symbol, statement, element, isLazy));
            }
        );
        if (hasError) {
            return false;
        }
    }
    return true;
}

/** @internal */
export function processKit(factory: NodeFactory, statements: NodeArray<Statement>, sdkPath: string,
    markedkitImportRanges: Array<TextRange>, inEtsContext: boolean): Statement[] {
    const list: Statement[] = [];
    let skipRestStatements = false;
    statements.forEach(
        statement => {
            // ArkTS don't allow import declaration after other statements
            if (!skipRestStatements && inEtsContext && !isImportDeclaration(statement)) {
                skipRestStatements = true;
            }
            if (skipRestStatements || excludeStatementForKitImport(statement)) {
                list.push(statement);
                return;
            }

            const moduleSpecifierText = ((statement as ImportDeclaration).moduleSpecifier as StringLiteral).text;
            if (!inEtsContext && whiteListForTsFile.has(moduleSpecifierText)) {
                list.push(statement);
                return;
            }

            const jsonObject = getKitJsonObject(moduleSpecifierText, sdkPath);
            const newImportStatements = new Array<ImportDeclaration>();
            
            if (!processKitStatementSuccess(factory, statement as ImportDeclaration, jsonObject, inEtsContext, newImportStatements)) {
                list.push(statement);
                return;
            }

            list.push(...newImportStatements);
            markKitImport(statement, markedkitImportRanges);
        }
    );
    return list;
}

export function getMaxFlowDepth(compilerOptions: CompilerOptions): number {
    // The value of maxFlowDepth ranges from 2000 to 65535.
    return compilerOptions.maxFlowDepth || maxFlowDepthDefaultValue;
}

export interface MoreInfo {
    cn: string,
    en: string
}

export class ErrorInfo {
    code: string = '';
    description: string = 'ArkTS Compiler Error'; // The description of type errors for TSC
    cause: string = '';
    position: string = '';
    solutions: string[] = [];
    moreInfo?: MoreInfo;

    getCode(): string {
        return this.code;
    }

    getDescription(): string {
        return this.description;
    }

    getCause(): string {
        return this.cause;
    }

    getPosition(): string {
        return this.position;
    }

    getSolutions(): string[] {
        return this.solutions;
    }

    getMoreInfo(): MoreInfo | undefined {
        return this.moreInfo;
    }
}

export enum ErrorCodeArea {
    TSC = 0,
    LINTER = 1,
    UI = 2
}

const SUBSYSTEM_CODE = '105'; // Subsystem coding
const ERROR_TYPE_CODE = '05'; // Error type code
const EXTENSION_CODE = '001'; // Extended codes defined by various subsystems
const codeCollectionUI = new Set([28000, 28001, 28002, 28003, 28004, 28005, 28006, 28007, 28015]); // UI code error collection
const codeCollectionLinter = new Set([28016, 28017]); // Linter code error collection
const newTscCodeMap = new Map([
    [28014, '10505114']
]); // New tsc code error collection

// Currently, only the tsc error reporting triggers this function.
export function getErrorCode(diagnostic: Diagnostic): ErrorInfo {
    let errorInfo: ErrorInfo = new ErrorInfo();
    errorInfo.cause = flattenDiagnosticMessageText(diagnostic.messageText, '\n');

    if (diagnostic.file) {
        const { line, character }: LineAndCharacter = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
        errorInfo.position = `File: ${diagnostic.file.fileName}:${line + 1}:${character + 1}`;
    }

    if (newTscCodeMap.has(diagnostic.code)) {
        errorInfo.code = newTscCodeMap.get(diagnostic.code) as string;
    } else {
        errorInfo.code = SUBSYSTEM_CODE + ERROR_TYPE_CODE + EXTENSION_CODE;
    }
    return errorInfo;
}

export function getErrorCodeArea(code: number): ErrorCodeArea {
    if (codeCollectionLinter.has(code)) {
        return ErrorCodeArea.LINTER;
    } else if (codeCollectionUI.has(code)) {
        return ErrorCodeArea.UI;
    } else {
        return ErrorCodeArea.TSC;
    }
}