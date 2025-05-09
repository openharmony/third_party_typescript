namespace ts {
    describe("unittests:: TransformAPI", () => {
        function replaceUndefinedWithVoid0(context: TransformationContext) {
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.enableSubstitution(SyntaxKind.Identifier);
            context.onSubstituteNode = (hint, node) => {
                node = previousOnSubstituteNode(hint, node);
                if (hint === EmitHint.Expression && isIdentifier(node) && node.escapedText === "undefined") {
                    node = factory.createPartiallyEmittedExpression(
                        addSyntheticTrailingComment(
                            setTextRange(
                                factory.createVoidZero(),
                                node),
                            SyntaxKind.MultiLineCommentTrivia, "undefined"));
                }
                return node;
            };
            return (file: SourceFile) => file;
        }
        function replaceNumberWith2(context: TransformationContext) {
            function visitor(node: Node): Node {
                if (isNumericLiteral(node)) {
                    return factory.createNumericLiteral("2");
                }
                return visitEachChild(node, visitor, context);
            }
            return (file: SourceFile) => visitNode(file, visitor);
        }

        function replaceIdentifiersNamedOldNameWithNewName(context: TransformationContext) {
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.enableSubstitution(SyntaxKind.Identifier);
            context.onSubstituteNode = (hint, node) => {
                node = previousOnSubstituteNode(hint, node);
                if (isIdentifier(node) && node.escapedText === "oldName") {
                    node = setTextRange(factory.createIdentifier("newName"), node);
                }
                return node;
            };
            return (file: SourceFile) => file;
        }

        function replaceIdentifiersNamedOldNameWithNewName2(context: TransformationContext) {
            const visitor: Visitor = (node) => {
                if (isIdentifier(node) && node.text === "oldName") {
                    return factory.createIdentifier("newName");
                }
                return visitEachChild(node, visitor, context);
            };
            return (node: SourceFile) => visitNode(node, visitor);
        }

        function createTaggedTemplateLiteral(): Transformer<SourceFile> {
            return sourceFile => factory.updateSourceFile(sourceFile, [
                factory.createExpressionStatement(
                    factory.createTaggedTemplateExpression(
                        factory.createIdentifier("$tpl"),
                        /*typeArguments*/ undefined,
                        factory.createNoSubstitutionTemplateLiteral("foo", "foo")))
            ]);
        }

        function transformSourceFile(sourceText: string, transformers: TransformerFactory<SourceFile>[]) {
            const transformed = transform(createSourceFile("source.ts", sourceText, ScriptTarget.ES2015), transformers);
            const printer = createPrinter({ newLine: NewLineKind.CarriageReturnLineFeed }, {
                onEmitNode: transformed.emitNodeWithNotification,
                substituteNode: transformed.substituteNode
            });
            const result = printer.printBundle(factory.createBundle(transformed.transformed));
            transformed.dispose();
            return result;
        }

        function testBaseline(testName: string, test: () => string) {
            it(testName, () => {
                Harness.Baseline.runBaseline(`transformApi/transformsCorrectly.${testName}.js`, test());
            });
        }

        function testBaselineAndEvaluate(testName: string, test: () => string, onEvaluate: (exports: any) => void) {
            describe(testName, () => {
                let sourceText!: string;
                before(() => {
                    sourceText = test();
                });
                after(() => {
                    sourceText = undefined!;
                });
                it("compare baselines", () => {
                    Harness.Baseline.runBaseline(`transformApi/transformsCorrectly.${testName}.js`, sourceText);
                });
                it("evaluate", () => {
                    onEvaluate(evaluator.evaluateJavaScript(sourceText));
                });
            });
        }

        testBaseline("substitution", () => {
            return transformSourceFile(`var a = undefined;`, [replaceUndefinedWithVoid0]);
        });

        testBaseline("types", () => {
            return transformSourceFile(`let a: () => void`, [
                context => file => visitNode(file, function visitor(node: Node): VisitResult<Node> {
                    return visitEachChild(node, visitor, context);
                })
            ]);
        });

        testBaseline("transformDefiniteAssignmentAssertions", () => {
            return transformSourceFile(`let a!: () => void`, [
                context => file => visitNode(file, function visitor(node: Node): VisitResult<Node> {
                    if (node.kind === SyntaxKind.VoidKeyword) {
                        return factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword);
                    }
                    return visitEachChild(node, visitor, context);
                })
            ]);
        });

        testBaseline("fromTranspileModule", () => {
            return transpileModule(`var oldName = undefined;`, {
                transformers: {
                    before: [replaceUndefinedWithVoid0],
                    after: [replaceIdentifiersNamedOldNameWithNewName]
                },
                compilerOptions: {
                    newLine: NewLineKind.CarriageReturnLineFeed
                }
            }).outputText;
        });

        testBaseline("transformTaggedTemplateLiteral", () => {
            return transpileModule("", {
                transformers: {
                    before: [createTaggedTemplateLiteral],
                },
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    newLine: NewLineKind.CarriageReturnLineFeed
                }
            }).outputText;
        });

        testBaseline("issue27854", () => {
            return transpileModule(`oldName<{ a: string; }>\` ... \`;`, {
                transformers: {
                    before: [replaceIdentifiersNamedOldNameWithNewName2]
                },
                compilerOptions: {
                    newLine: NewLineKind.CarriageReturnLineFeed,
                    target: ScriptTarget.Latest
                }
            }).outputText;
        });

        testBaseline("issue44068", () => {
            return transformSourceFile(`
                const FirstVar = null;
                const SecondVar = null;
            `, [
                context => file => {
                    const firstVarName = (file.statements[0] as VariableStatement)
                        .declarationList.declarations[0].name as Identifier;
                    const secondVarName = (file.statements[0] as VariableStatement)
                        .declarationList.declarations[0].name as Identifier;

                    return context.factory.updateSourceFile(file, file.statements.concat([
                        context.factory.createExpressionStatement(
                            context.factory.createArrayLiteralExpression([firstVarName, secondVarName])
                        ),
                    ]));
                }
            ]);
        });

        testBaseline("rewrittenNamespace", () => {
            return transpileModule(`namespace Reflect { const x = 1; }`, {
                transformers: {
                    before: [forceNamespaceRewrite],
                },
                compilerOptions: {
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

        testBaseline("rewrittenNamespaceFollowingClass", () => {
            return transpileModule(`
            class C { foo = 10; static bar = 20 }
            namespace C { export let x = 10; }
            `, {
                transformers: {
                    before: [forceNamespaceRewrite],
                },
                compilerOptions: {
                    target: ScriptTarget.ESNext,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                    useDefineForClassFields: false,
                }
            }).outputText;
        });

        testBaseline("transformTypesInExportDefault", () => {
            return transpileModule(`
            export default (foo: string) => { return 1; }
            `, {
                transformers: {
                    before: [replaceNumberWith2],
                },
                compilerOptions: {
                    target: ScriptTarget.ESNext,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

        testBaseline("synthesizedClassAndNamespaceCombination", () => {
            return transpileModule("", {
                transformers: {
                    before: [replaceWithClassAndNamespace],
                },
                compilerOptions: {
                    target: ScriptTarget.ESNext,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function replaceWithClassAndNamespace() {
                return (sourceFile: SourceFile) => {
                    // TODO(rbuckton): Does this need to be parented?
                    const result = factory.updateSourceFile(
                        sourceFile,
                        factory.createNodeArray([
                            factory.createClassDeclaration(/*modifiers*/ undefined, "Foo", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, /*members*/ undefined!), // TODO: GH#18217
                            factory.createModuleDeclaration(/*modifiers*/ undefined, factory.createIdentifier("Foo"), factory.createModuleBlock([factory.createEmptyStatement()]))
                        ])
                    );
                    return result;
                };
            }
        });

        function forceNamespaceRewrite(context: TransformationContext) {
            return (sourceFile: SourceFile): SourceFile => {
                return visitNode(sourceFile);

                function visitNode<T extends Node>(node: T): T {
                    if (node.kind === SyntaxKind.ModuleBlock) {
                        const block = node as T & ModuleBlock;
                        const statements = factory.createNodeArray([...block.statements]);
                        return factory.updateModuleBlock(block, statements) as typeof block;
                    }
                    return visitEachChild(node, visitNode, context);
                }
            };
        }

        testBaseline("transformAwayExportStar", () => {
            return transpileModule("export * from './helper';", {
                transformers: {
                    before: [expandExportStar],
                },
                compilerOptions: {
                    target: ScriptTarget.ESNext,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function expandExportStar(context: TransformationContext) {
                return (sourceFile: SourceFile): SourceFile => {
                    return visitNode(sourceFile);

                    function visitNode<T extends Node>(node: T): T {
                        if (node.kind === SyntaxKind.ExportDeclaration) {
                            const ed = node as Node as ExportDeclaration;
                            const exports = [{ name: "x" }];
                            const exportSpecifiers = exports.map(e => factory.createExportSpecifier(/*isTypeOnly*/ false, e.name, e.name));
                            const exportClause = factory.createNamedExports(exportSpecifiers);
                            const newEd = factory.updateExportDeclaration(ed, ed.modifiers, ed.isTypeOnly, exportClause, ed.moduleSpecifier, ed.assertClause);

                            return newEd as Node as T;
                        }
                        return visitEachChild(node, visitNode, context);
                    }
                };
            }
        });

        // https://github.com/Microsoft/TypeScript/issues/19618
        testBaseline("transformAddImportStar", () => {
            return transpileModule("", {
                transformers: {
                    before: [transformAddImportStar],
                },
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    module: ModuleKind.System,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function transformAddImportStar(_context: TransformationContext) {
                return (sourceFile: SourceFile): SourceFile => {
                    return visitNode(sourceFile);
                };
                function visitNode(sf: SourceFile) {
                    // produce `import * as i0 from './comp';
                    const importStar = factory.createImportDeclaration(
                        /*modifiers*/ undefined,
                        /*importClause*/ factory.createImportClause(
                            /*isTypeOnly*/ false,
                            /*name*/ undefined,
                            factory.createNamespaceImport(factory.createIdentifier("i0"))
                        ),
                        /*moduleSpecifier*/ factory.createStringLiteral("./comp1"),
                        /*assertClause*/ undefined);
                    return factory.updateSourceFile(sf, [importStar]);
                }
            }
        });

        // https://github.com/Microsoft/TypeScript/issues/17384
        testBaseline("transformAddDecoratedNode", () => {
            return transpileModule("", {
                transformers: {
                    before: [transformAddDecoratedNode],
                },
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function transformAddDecoratedNode(_context: TransformationContext) {
                return (sourceFile: SourceFile): SourceFile => {
                    return visitNode(sourceFile);
                };
                function visitNode(sf: SourceFile) {
                    // produce `class Foo { @Bar baz() {} }`;
                    const classDecl = factory.createClassDeclaration(/*modifiers*/ undefined, "Foo", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, [
                        factory.createMethodDeclaration([factory.createDecorator(factory.createIdentifier("Bar"))], /**/ undefined, "baz", /**/ undefined, /**/ undefined, [], /**/ undefined, factory.createBlock([]))
                    ]);
                    return factory.updateSourceFile(sf, [classDecl]);
                }
            }
        });

        testBaseline("transformDeclarationFile", () => {
            return baselineDeclarationTransform(`var oldName = undefined;`, {
                transformers: {
                    afterDeclarations: [replaceIdentifiersNamedOldNameWithNewName]
                },
                compilerOptions: {
                    newLine: NewLineKind.CarriageReturnLineFeed,
                    declaration: true
                }
            });
        });

        // https://github.com/microsoft/TypeScript/issues/33295
        testBaseline("transformParameterProperty", () => {
            return transpileModule("", {
                transformers: {
                    before: [transformAddParameterProperty],
                },
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function transformAddParameterProperty(_context: TransformationContext) {
                return (sourceFile: SourceFile): SourceFile => {
                    return visitNode(sourceFile);
                };
                function visitNode(sf: SourceFile) {
                    // produce `class Foo { constructor(@Dec private x) {} }`;
                    // The decorator is required to trigger ts.ts transformations.
                    const classDecl = factory.createClassDeclaration([], "Foo", /*typeParameters*/ undefined, /*heritageClauses*/ undefined, [
                        factory.createConstructorDeclaration(/*modifiers*/ undefined, [
                            factory.createParameterDeclaration([factory.createDecorator(factory.createIdentifier("Dec")), factory.createModifier(SyntaxKind.PrivateKeyword)], /*dotDotDotToken*/ undefined, "x")], factory.createBlock([]))
                    ]);
                    return factory.updateSourceFile(sf, [classDecl]);
                }
            }
        });

        function baselineDeclarationTransform(text: string, opts: TranspileOptions) {
            const fs = vfs.createFromFileSystem(Harness.IO, /*caseSensitive*/ true, { documents: [new documents.TextDocument("/.src/index.ts", text)] });
            const host = new fakes.CompilerHost(fs, opts.compilerOptions);
            const program = createProgram(["/.src/index.ts"], opts.compilerOptions!, host);
            program.emit(program.getSourceFile("/.src/index.ts"), (p, s, bom) => host.writeFile(p, s, bom), /*cancellationToken*/ undefined, /*onlyDts*/ true, opts.transformers);
            return fs.readFileSync("/.src/index.d.ts").toString();
        }

        function addSyntheticComment(nodeFilter: (node: Node) => boolean) {
            return (context: TransformationContext) => {
                return (sourceFile: SourceFile): SourceFile => {
                    return visitNode(sourceFile, rootTransform, isSourceFile);
                };
                function rootTransform<T extends Node>(node: T): VisitResult<T> {
                    if (nodeFilter(node)) {
                        setEmitFlags(node, EmitFlags.NoLeadingComments);
                        setSyntheticLeadingComments(node, [{ kind: SyntaxKind.MultiLineCommentTrivia, text: "comment", pos: -1, end: -1, hasTrailingNewLine: true }]);
                    }
                    return visitEachChild(node, rootTransform, context);
                }
            };
        }

        // https://github.com/Microsoft/TypeScript/issues/24096
        testBaseline("transformAddCommentToArrowReturnValue", () => {
            return transpileModule(`const foo = () =>
    void 0
`, {
                transformers: {
                    before: [addSyntheticComment(isVoidExpression)],
                },
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

        // https://github.com/Microsoft/TypeScript/issues/17594
        testBaseline("transformAddCommentToExportedVar", () => {
            return transpileModule(`export const exportedDirectly = 1;
const exportedSeparately = 2;
export {exportedSeparately};
`, {
                transformers: {
                    before: [addSyntheticComment(isVariableStatement)],
                },
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

        // https://github.com/Microsoft/TypeScript/issues/17594
        testBaseline("transformAddCommentToImport", () => {
            return transpileModule(`
// Previous comment on import.
import {Value} from 'somewhere';
import * as X from 'somewhere';
// Previous comment on export.
export { /* specifier comment */ X, Y} from 'somewhere';
export * from 'somewhere';
export {Value};
`, {
                transformers: {
                    before: [addSyntheticComment(n => isImportDeclaration(n) || isExportDeclaration(n) || isImportSpecifier(n) || isExportSpecifier(n))],
                },
                compilerOptions: {
                    target: ScriptTarget.ES5,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

        // https://github.com/Microsoft/TypeScript/issues/17594
        testBaseline("transformAddCommentToProperties", () => {
            return transpileModule(`
// class comment.
class Clazz {
    // original comment 1.
    static staticProp: number = 1;
    // original comment 2.
    instanceProp: number = 2;
    // original comment 3.
    constructor(readonly field = 1) {}
}
`, {
                transformers: {
                    before: [addSyntheticComment(n => isPropertyDeclaration(n) || isParameterPropertyDeclaration(n, n.parent) || isClassDeclaration(n) || isConstructorDeclaration(n))],
                },
                compilerOptions: {
                    target: ScriptTarget.ES2015,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

        testBaseline("transformAddCommentToNamespace", () => {
            return transpileModule(`
// namespace comment.
namespace Foo {
    export const x = 1;
}
// another comment.
namespace Foo {
    export const y = 1;
}
`, {
                transformers: {
                    before: [addSyntheticComment(n => isModuleDeclaration(n))],
                },
                compilerOptions: {
                    target: ScriptTarget.ES2015,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

        testBaseline("transformUpdateModuleMember", () => {
            return transpileModule(`
module MyModule {
    const myVariable = 1;
    function foo(param: string) {}
}
`, {
                transformers: {
                    before: [renameVariable],
                },
                compilerOptions: {
                    target: ScriptTarget.ES2015,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;

            function renameVariable(context: TransformationContext) {
                    return (sourceFile: SourceFile): SourceFile => {
                        return visitNode(sourceFile, rootTransform, isSourceFile);
                    };
                    function rootTransform<T extends Node>(node: T): Node {
                        if (isVariableDeclaration(node)) {
                            return factory.updateVariableDeclaration(node, factory.createIdentifier("newName"), /*exclamationToken*/ undefined, /*type*/ undefined, node.initializer);
                        }
                        return visitEachChild(node, rootTransform, context);
                    }
            }
        });

        // https://github.com/Microsoft/TypeScript/issues/24709
        testBaseline("issue24709", () => {
            const fs = vfs.createFromFileSystem(Harness.IO, /*caseSensitive*/ true);
            const transformed = transform(createSourceFile("source.ts", "class X { echo(x: string) { return x; } }", ScriptTarget.ES3), [transformSourceFile]);
            const transformedSourceFile = transformed.transformed[0];
            transformed.dispose();
            const host = new fakes.CompilerHost(fs);
            host.getSourceFile = () => transformedSourceFile;
            const program = createProgram(["source.ts"], {
                target: ScriptTarget.ES3,
                module: ModuleKind.None,
                noLib: true
            }, host);
            program.emit(transformedSourceFile, (_p, s, b) => host.writeFile("source.js", s, b));
            return host.readFile("source.js")!.toString();

            function transformSourceFile(context: TransformationContext) {
                const visitor: Visitor = (node) => {
                    if (isMethodDeclaration(node)) {
                        return factory.updateMethodDeclaration(
                            node,
                            node.modifiers,
                            node.asteriskToken,
                            factory.createIdentifier("foobar"),
                            node.questionToken,
                            node.typeParameters,
                            node.parameters,
                            node.type,
                            node.body,
                        );
                    }
                    return visitEachChild(node, visitor, context);
                };
                return (node: SourceFile) => visitNode(node, visitor);
            }

        });

        testBaselineAndEvaluate("templateSpans", () => {
            return transpileModule("const x = String.raw`\n\nhello`; exports.stringLength = x.trim().length;", {
                compilerOptions: {
                    target: ScriptTarget.ESNext,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                },
                transformers: {
                    before: [transformSourceFile]
                }
            }).outputText;

            function transformSourceFile(context: TransformationContext): Transformer<SourceFile> {
                function visitor(node: Node): VisitResult<Node> {
                    if (isNoSubstitutionTemplateLiteral(node)) {
                        return factory.createNoSubstitutionTemplateLiteral(node.text, node.rawText);
                    }
                    else {
                        return visitEachChild(node, visitor, context);
                    }
                }
                return sourceFile => visitNode(sourceFile, visitor, isSourceFile);
            }
        }, exports => {
            assert.equal(exports.stringLength, 5);
        });

        function addStaticFieldWithComment(context: TransformationContext) {
            return (sourceFile: SourceFile): SourceFile => {
                return visitNode(sourceFile, rootTransform, isSourceFile);
            };
            function rootTransform<T extends Node>(node: T): Node {
                if (isClassLike(node)) {
                    const newMembers = [factory.createPropertyDeclaration([factory.createModifier(SyntaxKind.StaticKeyword)], "newField", /* questionOrExclamationToken */ undefined, /* type */ undefined, factory.createStringLiteral("x"))];
                    setSyntheticLeadingComments(newMembers[0], [{ kind: SyntaxKind.MultiLineCommentTrivia, text: "comment", pos: -1, end: -1, hasTrailingNewLine: true }]);
                    return isClassDeclaration(node) ?
                        factory.updateClassDeclaration(
                            node,
                            node.modifiers,
                            node.name,
                            node.typeParameters,
                            node.heritageClauses,
                            newMembers) :
                            isClassExpression(node) ? 
                        factory.updateClassExpression(
                            node,
                            node.modifiers,
                            node.name,
                            node.typeParameters,
                            node.heritageClauses,
                            newMembers) :
                        factory.updateStructDeclaration(
                            node,
                            node.modifiers,
                            node.name,
                            node.typeParameters,
                            node.heritageClauses,
                            node.members);
                }
                return visitEachChild(node, rootTransform, context);
            }
        }

        testBaseline("transformSyntheticCommentOnStaticFieldInClassDeclaration", () => {
            return transpileModule(`
declare const Decorator: any;
@Decorator
class MyClass {
}
`, {
                transformers: {
                    before: [addStaticFieldWithComment],
                },
                compilerOptions: {
                    target: ScriptTarget.ES2015,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

        testBaseline("transformSyntheticCommentOnStaticFieldInClassExpression", () => {
            return transpileModule(`
const MyClass = class {
};
`, {
                transformers: {
                    before: [addStaticFieldWithComment],
                },
                compilerOptions: {
                    target: ScriptTarget.ES2015,
                    newLine: NewLineKind.CarriageReturnLineFeed,
                }
            }).outputText;
        });

    });
}

