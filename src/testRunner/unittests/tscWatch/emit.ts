import * as ts from "../../_namespaces/ts";

const scenario = "emit";
describe("unittests:: tsc-watch:: emit with outFile or out setting", () => {
    function verifyOutAndOutFileSetting(subScenario: string, out?: string, outFile?: string) {
        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: `emit with outFile or out setting/${subScenario}`,
            commandLineArgs: ["--w", "-p", "/a/tsconfig.json"],
            sys: () => ts.tscWatch.createWatchedSystem({
                "/a/a.ts": "let x = 1",
                "/a/b.ts": "let y = 1",
                "/a/tsconfig.json": JSON.stringify({ compilerOptions: { out, outFile } }),
                [ts.tscWatch.libFile.path]: ts.tscWatch.libFile.content,
            }),
            changes: [
                {
                    caption: "Make change in the file",
                    change: sys => sys.writeFile("/a/a.ts", "let x = 11"),
                    timeouts: ts.tscWatch.runQueuedTimeoutCallbacks
                },
                {
                    caption: "Make change in the file again",
                    change: sys => sys.writeFile("/a/a.ts", "let xy = 11"),
                    timeouts: ts.tscWatch.runQueuedTimeoutCallbacks
                }
            ]
        });
    }
    verifyOutAndOutFileSetting("config does not have out or outFile");
    verifyOutAndOutFileSetting("config has out", "/a/out.js");
    verifyOutAndOutFileSetting("config has outFile", /*out*/ undefined, "/a/out.js");

    function verifyFilesEmittedOnce(subScenario: string, useOutFile: boolean) {
        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: `emit with outFile or out setting/${subScenario}`,
            commandLineArgs: ["--w", "-p", "/a/b/project/tsconfig.json"],
            sys: () => {
                const file1: ts.tscWatch.File = {
                    path: "/a/b/output/AnotherDependency/file1.d.ts",
                    content: "declare namespace Common.SomeComponent.DynamicMenu { enum Z { Full = 0,  Min = 1, Average = 2, } }"
                };
                const file2: ts.tscWatch.File = {
                    path: "/a/b/dependencies/file2.d.ts",
                    content: "declare namespace Dependencies.SomeComponent { export class SomeClass { version: string; } }"
                };
                const file3: ts.tscWatch.File = {
                    path: "/a/b/project/src/main.ts",
                    content: "namespace Main { export function fooBar() {} }"
                };
                const file4: ts.tscWatch.File = {
                    path: "/a/b/project/src/main2.ts",
                    content: "namespace main.file4 { import DynamicMenu = Common.SomeComponent.DynamicMenu; export function foo(a: DynamicMenu.z) {  } }"
                };
                const configFile: ts.tscWatch.File = {
                    path: "/a/b/project/tsconfig.json",
                    content: JSON.stringify({
                        compilerOptions: useOutFile ?
                            { outFile: "../output/common.js", target: "es5" } :
                            { outDir: "../output", target: "es5" },
                        files: [file1.path, file2.path, file3.path, file4.path]
                    })
                };
                return ts.tscWatch.createWatchedSystem([file1, file2, file3, file4, ts.tscWatch.libFile, configFile]);
            },
            changes: ts.emptyArray
        });
    }
    verifyFilesEmittedOnce("with --outFile and multiple declaration files in the program", /*useOutFile*/ true);
    verifyFilesEmittedOnce("without --outFile and multiple declaration files in the program", /*useOutFile*/ false);
});

describe("unittests:: tsc-watch:: emit for configured projects", () => {
    const file1Consumer1Path = "/a/b/file1Consumer1.ts";
    const file1Consumer2Path = "/a/b/file1Consumer2.ts";
    const moduleFile1Path = "/a/b/moduleFile1.ts";
    const moduleFile2Path = "/a/b/moduleFile2.ts";
    const globalFilePath = "/a/b/globalFile3.ts";
    const configFilePath = "/a/b/tsconfig.json";
    interface VerifyTscWatchEmit {
        subScenario: string;
        /** custom config file options */
        configObj?: any;
        /** Additional files and folders to add */
        getAdditionalFileOrFolder?: () => ts.tscWatch.File[];
        /** initial list of files to emit if not the default list */
        firstReloadFileList?: string[];
        changes: ts.tscWatch.TscWatchCompileChange[]
    }
    function verifyTscWatchEmit({
        subScenario,
        configObj,
        getAdditionalFileOrFolder,
        firstReloadFileList,
        changes
    }: VerifyTscWatchEmit) {
        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: `emit for configured projects/${subScenario}`,
            commandLineArgs: ["--w", "-p", configFilePath],
            sys: () => {
                const moduleFile1: ts.tscWatch.File = {
                    path: moduleFile1Path,
                    content: "export function Foo() { };",
                };

                const file1Consumer1: ts.tscWatch.File = {
                    path: file1Consumer1Path,
                    content: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                };

                const file1Consumer2: ts.tscWatch.File = {
                    path: file1Consumer2Path,
                    content: `import {Foo} from "./moduleFile1"; let z = 10;`,
                };

                const moduleFile2: ts.tscWatch.File = {
                    path: moduleFile2Path,
                    content: `export var Foo4 = 10;`,
                };

                const globalFile3: ts.tscWatch.File = {
                    path: globalFilePath,
                    content: `interface GlobalFoo { age: number }`
                };
                const configFile: ts.tscWatch.File = {
                    path: configFilePath,
                    content: JSON.stringify(configObj || {})
                };
                const additionalFiles = getAdditionalFileOrFolder?.() || ts.emptyArray;
                const files = [moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, ts.tscWatch.libFile, ...additionalFiles];
                return ts.tscWatch.createWatchedSystem(firstReloadFileList ?
                    ts.map(firstReloadFileList, fileName => ts.find(files, file => file.path === fileName)!) :
                    files
                );
            },
            changes
        });
    }

    function modifyModuleFile1Shape(sys: ts.tscWatch.WatchedSystem) {
        sys.writeFile(moduleFile1Path, `export var T: number;export function Foo() { };`);
    }
    const changeModuleFile1Shape: ts.tscWatch.TscWatchCompileChange = {
        caption: "Change the content of moduleFile1 to `export var T: number;export function Foo() { };`",
        change: modifyModuleFile1Shape,
        timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
    };

    verifyTscWatchEmit({
        subScenario: "should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed",
        changes: [
            changeModuleFile1Shape,
            {
                caption: "Change the content of moduleFile1 to `export var T: number;export function Foo() { console.log('hi'); };`",
                change: sys => sys.writeFile(moduleFile1Path, `export var T: number;export function Foo() { console.log('hi'); };`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should be up-to-date with the reference map changes",
        changes: [
            {
                caption: "Change file1Consumer1 content to `export let y = Foo();`",
                change: sys => sys.writeFile(file1Consumer1Path, `export let y = Foo();`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            changeModuleFile1Shape,
            {
                caption: "Add the import statements back to file1Consumer1",
                change: sys => sys.writeFile(file1Consumer1Path, `import {Foo} from "./moduleFile1";let y = Foo();`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Change the content of moduleFile1 to `export var T: number;export var T2: string;export function Foo() { };`",
                change: sys => sys.writeFile(moduleFile1Path, `export let y = Foo();`),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Multiple file edits in one go",
                // Change file1Consumer1 content to `export let y = Foo();`
                // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                change: sys => {
                    sys.writeFile(file1Consumer1Path, `import {Foo} from "./moduleFile1";let y = Foo();`);
                    modifyModuleFile1Shape(sys);
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should be up-to-date with deleted files",
        changes: [
            {
                caption: "change moduleFile1 shape and delete file1Consumer2",
                change: sys => {
                    modifyModuleFile1Shape(sys);
                    sys.deleteFile(file1Consumer2Path);
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should be up-to-date with newly created files",
        changes: [
            {
                caption: "change moduleFile1 shape and create file1Consumer3",
                change: sys => {
                    sys.writeFile("/a/b/file1Consumer3.ts", `import {Foo} from "./moduleFile1"; let y = Foo();`);
                    modifyModuleFile1Shape(sys);
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should detect changes in non-root files",
        configObj: { files: [file1Consumer1Path] },
        changes: [
            changeModuleFile1Shape,
            {
                caption: "change file1 internal, and verify only file1 is affected",
                change: sys => sys.appendFile(moduleFile1Path, "var T1: number;"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should return all files if a global file changed shape",
        changes: [
            {
                caption: "change shape of global file",
                change: sys => sys.appendFile(globalFilePath, "var T2: string;"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should always return the file itself if '--isolatedModules' is specified",
        configObj: { compilerOptions: { isolatedModules: true } },
        changes: [
            changeModuleFile1Shape
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should always return the file itself if '--out' or '--outFile' is specified",
        configObj: { compilerOptions: { module: "system", outFile: "/a/b/out.js" } },
        changes: [
            changeModuleFile1Shape
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should return cascaded affected file list",
        getAdditionalFileOrFolder: () => [{
            path: "/a/b/file1Consumer1Consumer1.ts",
            content: `import {y} from "./file1Consumer1";`
        }],
        changes: [
            {
                caption: "change file1Consumer1",
                change: sys => sys.appendFile(file1Consumer1Path, "export var T: number;"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            changeModuleFile1Shape,
            {
                caption: "change file1Consumer1 and moduleFile1",
                change: sys => {
                    sys.appendFile(file1Consumer1Path, "export var T2: number;");
                    sys.writeFile(moduleFile1Path, `export var T2: number;export function Foo() { };`);
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should work fine for files with circular references",
        getAdditionalFileOrFolder: () => [
            {
                path: "/a/b/file1.ts",
                content: `/// <reference path="./file2.ts" />
export var t1 = 10;`
            },
            {
                path: "/a/b/file2.ts",
                content: `/// <reference path="./file1.ts" />
export var t2 = 10;`
            }
        ],
        firstReloadFileList: [ts.tscWatch.libFile.path, "/a/b/file1.ts", "/a/b/file2.ts", configFilePath],
        changes: [
            {
                caption: "change file1",
                change: sys => sys.appendFile("/a/b/file1.ts", "export var t3 = 10;"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should detect removed code file",
        getAdditionalFileOrFolder: () => [{
            path: "/a/b/referenceFile1.ts",
            content: `/// <reference path="./moduleFile1.ts" />
export var x = Foo();`
        }],
        firstReloadFileList: [ts.tscWatch.libFile.path, "/a/b/referenceFile1.ts", moduleFile1Path, configFilePath],
        changes: [
            {
                caption: "delete moduleFile1",
                change: sys => sys.deleteFile(moduleFile1Path),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });

    verifyTscWatchEmit({
        subScenario: "should detect non existing code file",
        getAdditionalFileOrFolder: () => [{
            path: "/a/b/referenceFile1.ts",
            content: `/// <reference path="./moduleFile2.ts" />
export var x = Foo();`
        }],
        firstReloadFileList: [ts.tscWatch.libFile.path, "/a/b/referenceFile1.ts", configFilePath],
        changes: [
            {
                caption: "edit refereceFile1",
                change: sys => sys.appendFile("/a/b/referenceFile1.ts", "export var yy = Foo();"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "create moduleFile2",
                change: sys => sys.writeFile(moduleFile2Path, "export var Foo4 = 10;"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });
});

describe("unittests:: tsc-watch:: emit file content", () => {
    function verifyNewLine(subScenario: string, newLine: string) {
        ts.tscWatch.verifyTscWatch({
            scenario,
            subScenario: `emit file content/${subScenario}`,
            commandLineArgs: ["--w", "/a/app.ts"],
            sys: () => ts.tscWatch.createWatchedSystem(
                [
                    {
                        path: "/a/app.ts",
                        content: ["var x = 1;", "var y = 2;"].join(newLine)
                    },
                    ts.tscWatch.libFile
                ],
                { newLine }
            ),
            changes: [
                {
                    caption: "Append a line",
                    change: sys => sys.appendFile("/a/app.ts", newLine + "var z = 3;"),
                    timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
                }
            ],
        });
    }
    verifyNewLine("handles new lines lineFeed", "\n");
    verifyNewLine("handles new lines carriageReturn lineFeed", "\r\n");

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "emit file content/should emit specified file",
        commandLineArgs: ["-w", "-p", "/a/b/tsconfig.json"],
        sys: () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export function Foo() { return 10; }`
            };

            const file2 = {
                path: "/a/b/f2.ts",
                content: `import {Foo} from "./f1"; export let y = Foo();`
            };

            const file3 = {
                path: "/a/b/f3.ts",
                content: `import {y} from "./f2"; let x = y;`
            };

            const configFile = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            return ts.tscWatch.createWatchedSystem([file1, file2, file3, configFile, ts.tscWatch.libFile]);
        },
        changes: [
            {
                caption: "Append content to f1",
                change: sys => sys.appendFile("/a/b/f1.ts", "export function foo2() { return 2; }"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            },
            {
                caption: "Again Append content to f1",
                change: sys => sys.appendFile("/a/b/f1.ts", "export function fooN() { return 2; }"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ],
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "emit file content/elides const enums correctly in incremental compilation",
        commandLineArgs: ["-w", "/user/someone/projects/myproject/file3.ts"],
        sys: () => {
            const currentDirectory = "/user/someone/projects/myproject";
            const file1: ts.tscWatch.File = {
                path: `${currentDirectory}/file1.ts`,
                content: "export const enum E1 { V = 1 }"
            };
            const file2: ts.tscWatch.File = {
                path: `${currentDirectory}/file2.ts`,
                content: `import { E1 } from "./file1"; export const enum E2 { V = E1.V }`
            };
            const file3: ts.tscWatch.File = {
                path: `${currentDirectory}/file3.ts`,
                content: `import { E2 } from "./file2"; const v: E2 = E2.V;`
            };
            return ts.tscWatch.createWatchedSystem([file1, file2, file3, ts.tscWatch.libFile]);
        },
        changes: [
            {
                caption: "Append content to file3",
                change: sys => sys.appendFile("/user/someone/projects/myproject/file3.ts", "function foo2() { return 2; }"),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ],
    });

    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "emit file content/file is deleted and created as part of change",
        commandLineArgs: ["-w"],
        sys: () => {
            const projectLocation = "/home/username/project";
            const file: ts.tscWatch.File = {
                path: `${projectLocation}/app/file.ts`,
                content: "var a = 10;"
            };
            const configFile: ts.tscWatch.File = {
                path: `${projectLocation}/tsconfig.json`,
                content: JSON.stringify({
                    include: [
                        "app/**/*.ts"
                    ]
                })
            };
            const files = [file, configFile, ts.tscWatch.libFile];
            return ts.tscWatch.createWatchedSystem(files, { currentDirectory: projectLocation, useCaseSensitiveFileNames: true });
        },
        changes: [
            {
                caption: "file is deleted and then created to modify content",
                change: sys => sys.appendFile("/home/username/project/app/file.ts", "\nvar b = 10;", { invokeFileDeleteCreateAsPartInsteadOfChange: true }),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun,
            }
        ]
    });
});

describe("unittests:: tsc-watch:: emit with when module emit is specified as node", () => {
    ts.tscWatch.verifyTscWatch({
        scenario,
        subScenario: "when module emit is specified as node/when instead of filechanged recursive directory watcher is invoked",
        commandLineArgs: ["--w", "--p", "/a/rootFolder/project/tsconfig.json"],
        sys: () => {
            const configFile: ts.tscWatch.File = {
                path: "/a/rootFolder/project/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        module: "none",
                        allowJs: true,
                        outDir: "Static/scripts/"
                    },
                    include: [
                        "Scripts/**/*"
                    ],
                })
            };
            const file1: ts.tscWatch.File = {
                path: "/a/rootFolder/project/Scripts/TypeScript.ts",
                content: "var z = 10;"
            };
            const file2: ts.tscWatch.File = {
                path: "/a/rootFolder/project/Scripts/Javascript.js",
                content: "var zz = 10;"
            };
            return ts.tscWatch.createWatchedSystem([configFile, file1, file2, ts.tscWatch.libFile]);
        },
        changes: [
            {
                caption: "Modify typescript file",
                change: sys => sys.modifyFile(
                    "/a/rootFolder/project/Scripts/TypeScript.ts",
                    "var zz30 = 100;",
                    { invokeDirectoryWatcherInsteadOfFileChanged: true },
                ),
                timeouts: ts.tscWatch.runQueuedTimeoutCallbacks,
            }
        ],
    });
});
