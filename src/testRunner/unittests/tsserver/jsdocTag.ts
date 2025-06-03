import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: jsdoc @link ", () => {
    const config: ts.projectSystem.File = {
        path: "/a/tsconfig.json",
        content: `{
"compilerOptions": {
"checkJs": true,
"noEmit": true
}
"files": ["someFile1.js"]
}
`
    };
    function assertQuickInfoJSDoc(file: ts.projectSystem.File, options: {
        displayPartsForJSDoc: boolean,
        command: ts.projectSystem.protocol.CommandTypes,
        tags: string | unknown[] | undefined,
        documentation: string | unknown[]
    }) {

        const { command, displayPartsForJSDoc, tags, documentation } = options;
        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([file, config]));
        session.getProjectService().setHostConfiguration({ preferences: { displayPartsForJSDoc } });
        ts.projectSystem.openFilesForSession([file], session);
        const indexOfX = file.content.indexOf("x");
        const quickInfo = session.executeCommandSeq<ts.projectSystem.protocol.QuickInfoRequest>({
            command: command as ts.projectSystem.protocol.CommandTypes.Quickinfo,
            arguments: {
                file: file.path,
                position: indexOfX,
            } as ts.projectSystem.protocol.FileLocationRequestArgs
        }).response;
        const summaryAndLocation = command === ts.projectSystem.protocol.CommandTypes.Quickinfo ? {
            displayString: "var x: number",
            start: {
                line: 3,
                offset: 5,
            },
            end: {
                line: 3,
                offset: 6,
            }
        } : {
            displayParts: [{
                kind: "keyword",
                text: "var",
            }, {
                kind: "space",
                text: " ",
            }, {
                kind: "localName",
                text: "x",
            }, {
                kind: "punctuation",
                text: ":",
            }, {
                kind: "space",
                text: " ",
            }, {
                kind: "keyword",
                text: "number",
            }],
            textSpan: {
                length: 1,
                start: 38,
            }
        };
        assert.deepEqual(quickInfo, {
            kind: "var",
            kindModifiers: "",
            ...summaryAndLocation,
            documentation,
            tags
        });
    }

    const linkInTag: ts.projectSystem.File = {
        path: "/a/someFile1.js",
        content: `class C { }
/** @wat {@link C} */
var x = 1`
    };
    const linkInComment: ts.projectSystem.File = {
        path: "/a/someFile1.js",
        content: `class C { }
     /** {@link C} */
var x = 1
;`
    };

    it("for quickinfo, should provide display parts plus a span for a working link in a tag", () => {
        assertQuickInfoJSDoc(linkInTag, {
            command: ts.projectSystem.protocol.CommandTypes.Quickinfo,
            displayPartsForJSDoc: true,
            documentation: [],
            tags: [{
                name: "wat",
                text: [{
                    kind: "text",
                    text: "",
                }, {
                    kind: "link",
                    text: "{@link ",
                }, {
                    kind: "linkName",
                    target: {
                        end: {
                            line: 1,
                            offset: 12,
                        },
                        file: "/a/someFile1.js",
                        start: {
                            line: 1,
                            offset: 1,
                        },
                    },
                    text: "C",
                }, {
                    kind: "link",
                    text: "}",
                }]
            }],
        });
    });
    it("for quickinfo, should provide a string for a working link in a tag", () => {
        assertQuickInfoJSDoc(linkInTag, {
            command: ts.projectSystem.protocol.CommandTypes.Quickinfo,
            displayPartsForJSDoc: false,
            documentation: "",
            tags: [{
                name: "wat",
                text: "{@link C}"
            }],
        });
    });
    it("for quickinfo, should provide display parts for a working link in a comment", () => {
        assertQuickInfoJSDoc(linkInComment, {
            command: ts.projectSystem.protocol.CommandTypes.Quickinfo,
            displayPartsForJSDoc: true,
            documentation: [{
                kind: "text",
                text: "",
            }, {
                kind: "link",
                text: "{@link ",
            }, {
                kind: "linkName",
                target: {
                    end: {
                        line: 1,
                        offset: 12,
                    },
                    file: "/a/someFile1.js",
                    start: {
                        line: 1,
                        offset: 1,
                    },
                },
                text: "C",
            }, {
                kind: "link",
                text: "}",
            }],
            tags: [],
        });
    });
    it("for quickinfo, should provide a string for a working link in a comment", () => {
        assertQuickInfoJSDoc(linkInComment, {
            command: ts.projectSystem.protocol.CommandTypes.Quickinfo,
            displayPartsForJSDoc: false,
            documentation: "{@link C}",
            tags: [],
        });
    });

    it("for quickinfo-full, should provide display parts plus a span for a working link in a tag", () => {
        assertQuickInfoJSDoc(linkInTag, {
            command: ts.projectSystem.protocol.CommandTypes.QuickinfoFull,
            displayPartsForJSDoc: true,
            documentation: [],
            tags: [{
                name: "wat",
                text: [{
                    kind: "text",
                    text: "",
                }, {
                    kind: "link",
                    text: "{@link ",
                }, {
                    kind: "linkName",
                    target: {
                        fileName: "/a/someFile1.js",
                        textSpan: {
                            length: 11,
                            start: 0
                        },
                    },
                    text: "C",
                }, {
                    kind: "link",
                    text: "}",
                }]
            }],
        });
    });
    it("for quickinfo-full, should provide a string for a working link in a tag", () => {
        assertQuickInfoJSDoc(linkInTag, {
            command: ts.projectSystem.protocol.CommandTypes.QuickinfoFull,
            displayPartsForJSDoc: false,
            documentation: [],
            tags: [{
                name: "wat",
                text: "{@link C}"
            }],
        });
    });
    it("for quickinfo-full, should provide display parts plus a span for a working link in a comment", () => {
        assertQuickInfoJSDoc(linkInComment, {
            command: ts.projectSystem.protocol.CommandTypes.QuickinfoFull,
            displayPartsForJSDoc: true,
            documentation: [{
                kind: "text",
                text: "",
            }, {
                kind: "link",
                text: "{@link ",
            }, {
                kind: "linkName",
                target: {
                    fileName: "/a/someFile1.js",
                    textSpan: {
                        length: 11,
                        start: 0
                    },
                },
                text: "C",
            }, {
                kind: "link",
                text: "}",
            }],
            tags: undefined,
        });
    });
    it("for quickinfo-full, should provide a string for a working link in a comment", () => {
        assertQuickInfoJSDoc(linkInComment, {
            command: ts.projectSystem.protocol.CommandTypes.QuickinfoFull,
            displayPartsForJSDoc: false,
            documentation: [{
                    kind: "text",
                    text: "",
                }, {
                    kind: "link",
                    text: "{@link ",
                }, {
                    kind: "linkName",
                    target: {
                        fileName: "/a/someFile1.js",
                        textSpan: {
                            length: 11,
                            start: 0
                        },
                    },
                    text: "C",
                }, {
                    kind: "link",
                    text: "}",
                }],
            tags: [],
        });
    });

    function assertSignatureHelpJSDoc(options: {
        displayPartsForJSDoc: boolean,
        command: ts.projectSystem.protocol.CommandTypes,
        documentation: string | unknown[],
        tags: unknown[]
    }) {
        const linkInParamTag: ts.projectSystem.File = {
            path: "/a/someFile1.js",
            content: `class C { }
/** @param y - {@link C} */
function x(y) { }
x(1)`
        };

        const { command, displayPartsForJSDoc, documentation, tags } = options;
        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([linkInParamTag, config]));
        session.getProjectService().setHostConfiguration({ preferences: { displayPartsForJSDoc } });
        ts.projectSystem.openFilesForSession([linkInParamTag], session);
        const indexOfX = linkInParamTag.content.lastIndexOf("1");
        const signatureHelp = session.executeCommandSeq<ts.projectSystem.protocol.SignatureHelpRequest>({
            command: command as ts.projectSystem.protocol.CommandTypes.SignatureHelp,
            arguments: {
                triggerReason: {
                    kind: "invoked"
                },
                file: linkInParamTag.path,
                position: indexOfX,
            } as ts.projectSystem.protocol.SignatureHelpRequestArgs
        }).response;
        const applicableSpan = command === ts.projectSystem.protocol.CommandTypes.SignatureHelp ? {
            end: {
                line: 4,
                offset: 4
            },
            start: {
                line: 4,
                offset: 3
            }
        } : {
            length: 1,
            start: 60
        };
        assert.deepEqual(signatureHelp, {
            applicableSpan,
            argumentCount: 1,
            argumentIndex: 0,
            selectedItemIndex: 0,
            items: [{
                documentation: [],
                isVariadic: false,
                parameters: [{
                    displayParts: [{
                        kind: "parameterName",
                        text: "y"
                    }, {
                        kind: "punctuation",
                        text: ":"
                    }, {
                        kind: "space",
                        text: " "
                    }, {
                        kind: "keyword",
                        text: "any"
                    }],
                    documentation,
                    isOptional: false,
                    isRest: false,
                    name: "y"
                }],
                prefixDisplayParts: [
                    {
                        kind: "functionName",
                        text: "x",
                    },
                    {
                        kind: "punctuation",
                        text: "(",
                    },
                ],
                separatorDisplayParts: [
                    {
                        kind: "punctuation",
                        text: ",",
                    },
                    {
                        kind: "space",
                        text: " ",
                    },
                ],
                suffixDisplayParts: [
                    {
                        kind: "punctuation",
                        text: ")",
                    },
                    {
                        kind: "punctuation",
                        text: ":",
                    },
                    {
                        kind: "space",
                        text: " ",
                    },
                    {
                        kind: "keyword",
                        text: "void",
                    }
                ],
                tags,
            }],
        });
    }
    it("for signature help, should provide a string for a working link in a comment", () => {
        assertSignatureHelpJSDoc({
            command: ts.projectSystem.protocol.CommandTypes.SignatureHelp,
            displayPartsForJSDoc: false,
            tags: [{
                name: "param",
                text: "y - {@link C}"
            }],
            documentation: [{
                kind: "text",
                text: "- "
            }, {
                kind: "link",
                text: "{@link "
            }, {
                kind: "linkName",
                target: {
                    file: "/a/someFile1.js",
                    start: {
                        line: 1,
                        offset: 1
                    },
                    end: {
                        line: 1,
                        offset: 12
                    }
                },
                text: "C"
            }, {
                kind: "link",
                text: "}"
            }],
        });
    });
    it("for signature help, should provide display parts for a working link in a comment", () => {
        const tags = [{
            name: "param",
            text: [{
                kind: "parameterName",
                text: "y"
            }, {
                kind: "space",
                text: " "
            }, {
                kind: "text",
                text: "- "
            }, {
                kind: "link",
                text: "{@link "
            }, {
                kind: "linkName",
                target: {
                    file: "/a/someFile1.js",
                    start: {
                        line: 1,
                        offset: 1
                    },
                    end: {
                        line: 1,
                        offset: 12
                    }
                },
                text: "C"
            }, {
                kind: "link",
                text: "}"
            }]
        }];
        assertSignatureHelpJSDoc({
            command: ts.projectSystem.protocol.CommandTypes.SignatureHelp,
            displayPartsForJSDoc: true,
            tags,
            documentation: tags[0].text.slice(2)
        });
    });
    it("for signature help-full, should provide a string for a working link in a comment", () => {
        assertSignatureHelpJSDoc({
            command: ts.projectSystem.protocol.CommandTypes.SignatureHelpFull,
            displayPartsForJSDoc: false,
            tags: [{
                name: "param",
                text: "y - {@link C}"
            }],
            documentation: [{
                kind: "text",
                text: "- "
            }, {
                kind: "link",
                text: "{@link "
            }, {
                kind: "linkName",
                target: {
                    fileName: "/a/someFile1.js",
                    textSpan: {
                        length: 11,
                        start: 0
                    }
                },
                text: "C"
            }, {
                kind: "link",
                text: "}"
            }],
        });
    });
    it("for signature help-full, should provide display parts for a working link in a comment", () => {
        const tags = [{
            name: "param",
            text: [{
                kind: "parameterName",
                text: "y"
            }, {
                kind: "space",
                text: " "
            }, {
                kind: "text",
                text: "- "
            }, {
                kind: "link",
                text: "{@link "
            }, {
                kind: "linkName",
                target: {
                    fileName: "/a/someFile1.js",
                    textSpan: {
                        length: 11,
                        start: 0
                    }
                },
                text: "C"
            }, {
                kind: "link",
                text: "}"
            }]
        }];
        assertSignatureHelpJSDoc({
            command: ts.projectSystem.protocol.CommandTypes.SignatureHelpFull,
            displayPartsForJSDoc: true,
            tags,
            documentation: tags[0].text.slice(2),
        });
    });

    function assertCompletionsJSDoc(options: {
        displayPartsForJSDoc: boolean,
        command: ts.projectSystem.protocol.CommandTypes,
        tags: unknown[]
    }) {
        const linkInParamJSDoc: ts.projectSystem.File = {
            path: "/a/someFile1.js",
            content: `class C { }
/** @param x - see {@link C} */
function foo (x) { }
foo`
        };
        const { command, displayPartsForJSDoc, tags } = options;
        const session = ts.projectSystem.createSession(ts.projectSystem.createServerHost([linkInParamJSDoc, config]));
        session.getProjectService().setHostConfiguration({ preferences: { displayPartsForJSDoc } });
        ts.projectSystem.openFilesForSession([linkInParamJSDoc], session);
        const indexOfFoo = linkInParamJSDoc.content.lastIndexOf("fo");
        const completions = session.executeCommandSeq<ts.projectSystem.protocol.CompletionDetailsRequest>({
            command: command as ts.projectSystem.protocol.CommandTypes.CompletionDetails,
            arguments: {
                entryNames: ["foo"],
                file: linkInParamJSDoc.path,
                position: indexOfFoo,
            } as ts.projectSystem.protocol.CompletionDetailsRequestArgs
        }).response;
        assert.deepEqual(completions, [{
            codeActions: undefined,
            displayParts: [{
                kind: "keyword",
                text: "function",
            }, {
                kind: "space",
                text: " ",
            }, {
                kind: "functionName",
                text: "foo",
            }, {
                kind: "punctuation",
                text: "(",
            }, {
                kind: "parameterName",
                text: "x",
            }, {
                kind: "punctuation",
                text: ":",
            }, {
                kind: "space",
                text: " ",
            }, {
                kind: "keyword",
                text: "any",
            }, {
                kind: "punctuation",
                text: ")",
            }, {
                kind: "punctuation",
                text: ":",
            }, {
                kind: "space",
                text: " ",
            }, {
                kind: "keyword",
                text: "void",
            }],
            documentation: [],
            kind: "function",
            kindModifiers: "",
            name: "foo",
            source: undefined,
            sourceDisplay: undefined,
            tags,
        }]);
    }
    it("for completions, should provide display parts for a working link in a comment", () => {
        assertCompletionsJSDoc({
            command: ts.projectSystem.protocol.CommandTypes.CompletionDetails,
            displayPartsForJSDoc: true,
            tags: [{
                name: "param",
                text: [{
                    kind: "parameterName",
                    text: "x"
                }, {
                    kind: "space",
                    text: " "
                }, {
                    kind: "text",
                    text: "- see "
                }, {
                    kind: "link",
                    text: "{@link "
                }, {
                    kind: "linkName",
                    target: {
                        file: "/a/someFile1.js",
                        end: {
                            line: 1,
                            offset: 12,
                        },
                        start: {
                            line: 1,
                            offset: 1,
                        }
                    },
                    text: "C"
                }, {
                    kind: "link",
                    text: "}"
                }],
            }],
        });
    });
    it("for completions, should provide a string for a working link in a comment", () => {
        assertCompletionsJSDoc({
            command: ts.projectSystem.protocol.CommandTypes.CompletionDetails,
            displayPartsForJSDoc: false,
            tags: [{
                name: "param",
                text: "x - see {@link C}",
            }],
        });
    });
    it("for completions-full, should provide display parts for a working link in a comment", () => {
        assertCompletionsJSDoc({
            command: ts.projectSystem.protocol.CommandTypes.CompletionDetailsFull,
            displayPartsForJSDoc: true,
            tags: [{
                name: "param",
                text: [{
                    kind: "parameterName",
                    text: "x"
                }, {
                    kind: "space",
                    text: " "
                }, {
                    kind: "text",
                    text: "- see "
                }, {
                    kind: "link",
                    text: "{@link "
                }, {
                    kind: "linkName",
                    target: {
                        fileName: "/a/someFile1.js",
                        textSpan: {
                            length: 11,
                            start: 0
                        }
                    },
                    text: "C"
                }, {
                    kind: "link",
                    text: "}"
                }],
            }],
        });
    });
    it("for completions-full, should provide a string for a working link in a comment", () => {
        assertCompletionsJSDoc({
            command: ts.projectSystem.protocol.CommandTypes.CompletionDetailsFull,
            displayPartsForJSDoc: false,
            tags: [{
                name: "param",
                text: "x - see {@link C}",
            }],
        });
    });
});

describe("unittests:: tsserver:: jsDoc tag check", () => {
    it("works jsDoc tag check", () => {
        const aUser: ts.projectSystem.File = {
            path: "/a.ts",
            content: `import { y } from "./b";
    y.test()
    y.test2()
`
        };
        const bUser: ts.projectSystem.File = {
            path: "/b.ts",
            content: `
export class y {
/**
 * @ignore
 */
static test(): void {

}
/**
 * @systemApi
 */
static test2(): void {

}
}`
        };
        const tsconfigFile: ts.projectSystem.File = {
            path: "/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: {
                    target: "es6",
                    module: "es6",
                    baseUrl: "./",  // all paths are relative to the baseUrl
                    paths: {
                        "~/*": ["*"]   // resolve any `~/foo/bar` to `<baseUrl>/foo/bar`
                    }
                },
                exclude: [
                    "api",
                    "build",
                    "node_modules",
                    "public",
                    "seeds",
                    "sql_updates",
                    "tests.build"
                ]
            })
        };

        const projectFiles = [aUser, bUser, tsconfigFile];
        const host = ts.projectSystem.createServerHost(projectFiles);
        host.getFileCheckedModuleInfo = (sourceFilePath: string) => {
            ts.Debug.log(sourceFilePath);
            return {
                fileNeedCheck: true,
                checkPayload: undefined,
                currentFileName: "",
            }
        }
        host.getJsDocNodeCheckedConfig = (jsDocFileCheckInfo: ts.FileCheckModuleInfo, sourceFilePath: string) => {
            ts.Debug.log(jsDocFileCheckInfo.fileNeedCheck.toString());
            ts.Debug.log(sourceFilePath);
            return {
                nodeNeedCheck: true,
                checkConfig: [{
                    tagName: ["ignore"],
                    message: "This API has been ignored. exercise caution when using this API.",
                    needConditionCheck: false,
                    type: ts.DiagnosticCategory.Warning,
                    specifyCheckConditionFuncName: "",
                    tagNameShouldExisted: false,
                },{
                    tagName: ["systemApi"],
                    message: "This API is used to develop system apps. exercise caution when using this API.",
                    needConditionCheck: false,
                    type: ts.DiagnosticCategory.Warning,
                    specifyCheckConditionFuncName: "",
                    tagNameShouldExisted: false,
                }]
            };
        };
        host.getJsDocNodeConditionCheckedResult = (jsDocFileCheckInfo: ts.FileCheckModuleInfo, jsDocs: ts.JSDocTagInfo[]) => {
            ts.Debug.log(jsDocFileCheckInfo.fileNeedCheck.toString());
            ts.Debug.log(jsDocs.toString());
            return {
                valid: false,
                message: "",
                type: ts.DiagnosticCategory.Warning
            };
        };
        const session = ts.projectSystem.createSession(host);
        const projectService = session.getProjectService();
        const { configFileName } = projectService.openClientFile(aUser.path);

        assert.isDefined(configFileName, `should find config`);

        const project = projectService.configuredProjects.get(tsconfigFile.path)!;
        const response = project.getLanguageService().getSuggestionDiagnostics(aUser.path);
        assert.deepEqual(response[0].messageText, "This API has been ignored. exercise caution when using this API.");
        assert.deepEqual(response[1].messageText, "This API is used to develop system apps. exercise caution when using this API.");
    });
});
