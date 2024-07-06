namespace ts {
    /* @internal */
    export function isInEtsFile(node: Node |undefined): boolean {
        return node !== undefined && getSourceFileOfNode(node)?.scriptKind === ScriptKind.ETS;
    }
    /* @internal */
    export function isInEtsFileWithOriginal(node: Node |undefined) {
        while (node) {
            node = node.original;
            if (node !== undefined && getSourceFileOfNode(node)?.scriptKind === ScriptKind.ETS) {
                return true;
            }
        }
        return false;
    }

    /* @internal */
    export function getReservedDecoratorsOfEtsFile(node: ClassDeclaration | StructDeclaration | FunctionDeclaration | MethodDeclaration | PropertyDeclaration, host: EmitHost): Decorator[] | undefined {
        let reservedDecorators;
        if (isInEtsFile(node)) {
            reservedDecorators = ensureEtsDecorators(node, host);
        }
        return reservedDecorators;
    }

    /* @internal */
    export function getReservedDecoratorsOfStructDeclaration(node: ClassDeclaration | StructDeclaration | FunctionDeclaration | MethodDeclaration | PropertyDeclaration, host: EmitHost): Decorator[] | undefined {
        let reservedDecorators;
        if (node.parent.kind === SyntaxKind.StructDeclaration) {
            reservedDecorators = ensureEtsDecorators(node, host);
        }
        return reservedDecorators;
    }

    /* @internal */
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

    // Get the effective ETS Decorators for the node
    /* @internal */
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

    /* @internal */
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
        return (name === options.ets?.render?.decorator || name === options.ets?.styles?.decorator ||
            (options.ets?.extend?.decorator?.includes(name as string) ?? false));
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

    /* @internal */
    export function isOHModulesAtTypesDirectory(dirPath: Path) {
        return endsWith(dirPath, "/oh_modules/@types");
    }

    /* @internal */
    export function isOHModulesReference(fileName: string): boolean {
        return startsWith(fileName, "oh_modules/") || pathContainsOHModules(fileName);
    }

    /* @internal */
    export function isArkTsDecorator(node: Node, compilerOptions?: CompilerOptions): boolean {
        if (compilerOptions) {
            return hasEtsExtendDecoratorNames(getAllDecorators(node), compilerOptions) ||
            hasEtsStylesDecoratorNames(getAllDecorators(node), compilerOptions) ||
            hasEtsBuilderDecoratorNames(getAllDecorators(node), compilerOptions) ||
            hasEtsConcurrentDecoratorNames(getAllDecorators(node), compilerOptions);
        }
        return false;
    }

    /* @internal */
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

    /* @internal */
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

    /* @internal */
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

    /* @internal */
    export function hasEtsBuilderDecoratorNames(decorators: NodeArray<Decorator> | readonly Decorator[] | undefined, options: CompilerOptions): boolean {
        const names: string[] = [];
        if (!decorators || !decorators.length) {
        return false;
        }
        decorators.forEach(decorator => {
            const nameExpr = decorator.expression;
            if (isIdentifier(nameExpr) && nameExpr.escapedText.toString() === options.ets?.render?.decorator) {
                names.push(nameExpr.escapedText.toString());
            }
        });
        return names.length !== 0;
    }

    /* @internal */
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

    /* @internal */
    export function isTokenInsideBuilder(decorators: NodeArray<Decorator> | readonly Decorator[] | undefined, compilerOptions: CompilerOptions): boolean {
        const renderDecorator = compilerOptions.ets?.render?.decorator ?? "Builder";

        if (!decorators) {
            return false;
        }

        for (const decorator of decorators) {
            if (decorator.expression.kind === SyntaxKind.Identifier && (<Identifier>(decorator.expression)).escapedText === renderDecorator) {
                return true;
            }
        }
        return false;
    }

    /* @internal */
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

    /* @internal */
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

    /* @internal */
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

    /* @internal */
    function isInStateStylesObject(node: Node | undefined): boolean {
        const ancestor = <ObjectLiteralExpression>getAncestor(node, SyntaxKind.ObjectLiteralExpression);
        return ancestor !== undefined && ancestor.parent !== undefined && isPropertyAssignment(ancestor.parent);
    }

    /* @internal */
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

    /* @internal */
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

    /* @internal */
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

        function updateLineCountAndPosFor(s: string) {
            const lineStartsOfS = computeLineStarts(s);
            if (lineStartsOfS.length > 1) {
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
        }

        function rawWrite(s: string) {
            if (s !== undefined) {
                output += s;
                updateLineCountAndPosFor(s);
            }
        }

        function writeLiteral(s: string) {
            if (s && s.length) {
                write(s);
            }
        }

        function writeLine(force?: boolean) {
            if (!lineStart || force) {
                output += space;
                linePos = output.length;
            }
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
            getLine: () => 0,
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

    /* @internal */
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
}