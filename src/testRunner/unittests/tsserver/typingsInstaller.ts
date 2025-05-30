import * as ts from "../../_namespaces/ts";

import validatePackageName = ts.JsTyping.validatePackageName;
import NameValidationResult = ts.JsTyping.NameValidationResult;

interface InstallerParams {
    globalTypingsCacheLocation?: string;
    throttleLimit?: number;
    typesRegistry?: ts.ESMap<string, ts.MapLike<string>>;
}

class Installer extends ts.projectSystem.TestTypingsInstaller {
    constructor(host: ts.server.ServerHost, p?: InstallerParams, log?: ts.projectSystem.TI.Log) {
        super(
            (p && p.globalTypingsCacheLocation) || "/a/data",
            (p && p.throttleLimit) || 5,
            host,
            (p && p.typesRegistry),
            log);
    }

    installAll(expectedCount: number) {
        this.checkPendingCommands(expectedCount);
        this.executePendingCommands();
    }
}

function executeCommand(self: Installer, host: ts.projectSystem.TestServerHost, installedTypings: string[] | string, typingFiles: ts.projectSystem.File[], cb: ts.projectSystem.TI.RequestCompletedAction): void {
    self.addPostExecAction(installedTypings, success => {
        for (const file of typingFiles) {
            host.ensureFileOrFolder(file);
        }
        cb(success);
    });
}

function trackingLogger(): { log(message: string): void, finish(): string[] } {
    const logs: string[] = [];
    return {
        log(message) {
            logs.push(message);
        },
        finish() {
            return logs;
        }
    };
}

import typingsName = ts.projectSystem.TI.typingsName;

describe("unittests:: tsserver:: typingsInstaller:: local module", () => {
    it("should not be picked up", () => {
        const f1 = {
            path: "/a/app.js",
            content: "const c = require('./config');"
        };
        const f2 = {
            path: "/a/config.js",
            content: "export let x = 1"
        };
        const typesCache = "/cache";
        const typesConfig = {
            path: typesCache + "/node_modules/@types/config/index.d.ts",
            content: "export let y: number;"
        };
        const config = {
            path: "/a/jsconfig.json",
            content: JSON.stringify({
                compilerOptions: { moduleResolution: "commonjs" },
                typeAcquisition: { enable: true }
            })
        };
        const host = ts.projectSystem.createServerHost([f1, f2, config, typesConfig]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("config"), globalTypingsCacheLocation: typesCache });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, _cb: ts.projectSystem.TI.RequestCompletedAction) {
                assert(false, "should not be called");
            }
        })();
        const service = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        service.openClientFile(f1.path);
        service.checkNumberOfProjects({ configuredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(ts.projectSystem.configuredProjectAt(service, 0), [f1.path, f2.path, config.path]);
        installer.installAll(0);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: General functionality", () => {
    it("configured projects (typings installed) 1", () => {
        const file1 = {
            path: "/a/b/app.js",
            content: ""
        };
        const tsconfig = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({
                compilerOptions: {
                    allowJs: true
                },
                typeAcquisition: {
                    enable: true
                }
            })
        };
        const packageJson = {
            path: "/a/b/package.json",
            content: JSON.stringify({
                name: "test",
                dependencies: {
                    jquery: "^3.1.0"
                }
            })
        };

        const jquery = {
            path: "/a/data/node_modules/@types/jquery/index.d.ts",
            content: "declare const $: { x: number }"
        };
        const host = ts.projectSystem.createServerHost([file1, tsconfig, packageJson]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings = ["@types/jquery"];
                const typingFiles = [jquery];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectService = ts.projectSystem.createProjectService(host, {
            useSingleInferredProject: true,
            typingsInstaller: installer,
            logger: ts.projectSystem.createLoggerWithInMemoryLogs(host),
        });
        projectService.setHostConfiguration({ preferences: { includePackageJsonAutoImports: "off" } });
        projectService.openClientFile(file1.path);

        installer.installAll(/*expectedCount*/ 1);
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.baselineTsserverLogs("typingsInstaller", "configured projects", projectService);
    });

    it("inferred project (typings installed)", () => {
        const file1 = {
            path: "/a/b/app.js",
            content: ""
        };
        const packageJson = {
            path: "/a/b/package.json",
            content: JSON.stringify({
                name: "test",
                dependencies: {
                    jquery: "^3.1.0"
                }
            })
        };

        const jquery = {
            path: "/a/data/node_modules/@types/jquery/index.d.ts",
            content: "declare const $: { x: number }"
        };
        const host = ts.projectSystem.createServerHost([file1, packageJson]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings = ["@types/jquery"];
                const typingFiles = [jquery];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectService = ts.projectSystem.createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
        projectService.openClientFile(file1.path);

        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        const p = projectService.inferredProjects[0];
        ts.projectSystem.checkProjectActualFiles(p, [file1.path]);

        installer.installAll(/*expectedCount*/ 1);
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [file1.path, jquery.path]);
    });

    it("inferred project - type acquisition with disableFilenameBasedTypeAcquisition:true", () => {
        // Tests:
        // Exclude file with disableFilenameBasedTypeAcquisition:true
        const jqueryJs = {
            path: "/a/b/jquery.js",
            content: ""
        };

        const messages: string[] = [];
        const host = ts.projectSystem.createServerHost([jqueryJs]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery") }, { isEnabled: () => true, writeLine: msg => messages.push(msg) });
            }
            enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
                super.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction): void {
                const installedTypings: string[] = [];
                const typingFiles: ts.projectSystem.File[] = [];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.setCompilerOptionsForInferredProjects({
            allowJs: true,
            enable: true,
            disableFilenameBasedTypeAcquisition: true
        });
        projectService.openClientFile(jqueryJs.path);

        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        const p = projectService.inferredProjects[0];
        ts.projectSystem.checkProjectActualFiles(p, [jqueryJs.path]);

        installer.installAll(/*expectedCount*/ 0);
        host.checkTimeoutQueueLength(0);
        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        // files should not be removed from project if ATA is skipped
        ts.projectSystem.checkProjectActualFiles(p, [jqueryJs.path]);
        assert.isTrue(messages.indexOf("No new typings were requested as a result of typings discovery") > 0, "Should not request filename-based typings");
    });

    it("external project - no type acquisition, no .d.ts/js files", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([file1]);
        const installer = new (class extends Installer {
            constructor() {
                super(host);
            }
            enqueueInstallTypingsRequest() {
                assert(false, "auto discovery should not be enabled");
            }
        })();

        const projectFileName = "/a/app/test.csproj";
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openExternalProject({
            projectFileName,
            options: {},
            rootFiles: [ts.projectSystem.toExternalFile(file1.path)]
        });
        installer.checkPendingCommands(/*expectedCount*/ 0);
        // by default auto discovery will kick in if project contain only .js/.d.ts files
        // in this case project contain only ts files - no auto discovery
        projectService.checkNumberOfProjects({ externalProjects: 1 });
    });

    it("external project - deduplicate from local @types packages", () => {
        const appJs = {
            path: "/a/b/app.js",
            content: ""
        };
        const nodeDts = {
            path: "/node_modules/@types/node/index.d.ts",
            content: "declare var node;"
        };
        const host = ts.projectSystem.createServerHost([appJs, nodeDts]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("node") });
            }
            installWorker() {
                assert(false, "nothing should get installed");
            }
        })();

        const projectFileName = "/a/app/test.csproj";
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openExternalProject({
            projectFileName,
            options: {},
            rootFiles: [ts.projectSystem.toExternalFile(appJs.path)],
            typeAcquisition: { enable: true, include: ["node"] }
        });
        installer.checkPendingCommands(/*expectedCount*/ 0);
        projectService.checkNumberOfProjects({ externalProjects: 1 });
    });

    it("external project - no auto in typing acquisition, no .d.ts/js files", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([file1]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery") });
            }
            enqueueInstallTypingsRequest() {
                assert(false, "auto discovery should not be enabled");
            }
        })();

        const projectFileName = "/a/app/test.csproj";
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openExternalProject({
            projectFileName,
            options: {},
            rootFiles: [ts.projectSystem.toExternalFile(file1.path)],
            typeAcquisition: { include: ["jquery"] }
        });
        installer.checkPendingCommands(/*expectedCount*/ 0);
        // by default auto discovery will kick in if project contain only .js/.d.ts files
        // in this case project contain only ts files - no auto discovery even if type acquisition is set
        projectService.checkNumberOfProjects({ externalProjects: 1 });
    });

    it("external project - autoDiscovery = true, no .d.ts/js files", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: ""
        };
        const jquery = {
            path: "/a/data/node_modules/@types/jquery/index.d.ts",
            content: "declare const $: { x: number }"
        };
        const host = ts.projectSystem.createServerHost([file1]);
        let enqueueIsCalled = false;
        const installer: Installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery") });
            }
            enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
                enqueueIsCalled = true;
                super.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction): void {
                const installedTypings = ["@types/node"];
                const typingFiles = [jquery];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectFileName = "/a/app/test.csproj";
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openExternalProject({
            projectFileName,
            options: {},
            rootFiles: [ts.projectSystem.toExternalFile(file1.path)],
            typeAcquisition: { enable: true, include: ["jquery"] }
        });

        assert.isTrue(enqueueIsCalled, "expected enqueueIsCalled to be true");
        installer.installAll(/*expectedCount*/ 1);

        // auto is set in type acquisition - use it even if project contains only .ts files
        projectService.checkNumberOfProjects({ externalProjects: 1 });
    });

    it("external project - no type acquisition, with only js, jsx, d.ts files", () => {
        // Tests:
        // 1. react typings are installed for .jsx
        // 2. loose files names are matched against safe list for typings if
        //    this is a JS project (only js, jsx, d.ts files are present)
        const lodashJs = {
            path: "/a/b/lodash.js",
            content: ""
        };
        const file2Jsx = {
            path: "/a/b/file2.jsx",
            content: ""
        };
        const file3dts = {
            path: "/a/b/file3.d.ts",
            content: ""
        };
        const reactDts = {
            path: "/a/data/node_modules/@types/react/index.d.ts",
            content: "declare const react: { x: number }"
        };
        const lodashDts = {
            path: "/a/data/node_modules/@types/lodash/index.d.ts",
            content: "declare const lodash: { x: number }"
        };

        const host = ts.projectSystem.createServerHost([lodashJs, file2Jsx, file3dts, ts.projectSystem.customTypesMap]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("lodash", "react") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction): void {
                const installedTypings = ["@types/lodash", "@types/react"];
                const typingFiles = [lodashDts, reactDts];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectFileName = "/a/app/test.csproj";
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openExternalProject({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.NodeJs },
            rootFiles: [ts.projectSystem.toExternalFile(lodashJs.path), ts.projectSystem.toExternalFile(file2Jsx.path), ts.projectSystem.toExternalFile(file3dts.path)],
            typeAcquisition: { }
        });

        const p = projectService.externalProjects[0];
        projectService.checkNumberOfProjects({ externalProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [file2Jsx.path, file3dts.path]);

        installer.installAll(/*expectedCount*/ 1);

        ts.projectSystem.checkNumberOfProjects(projectService, { externalProjects: 1 });
        host.checkTimeoutQueueLengthAndRun(1);
        ts.projectSystem.checkNumberOfProjects(projectService, { externalProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [file2Jsx.path, file3dts.path, lodashDts.path, reactDts.path]);
    });

    it("external project - type acquisition with enable: false", () => {
        // Tests:
        // Exclude
        const jqueryJs = {
            path: "/a/b/jquery.js",
            content: ""
        };

        const host = ts.projectSystem.createServerHost([jqueryJs]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery") });
            }
            enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
                super.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction): void {
                const installedTypings: string[] = [];
                const typingFiles: ts.projectSystem.File[] = [];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectFileName = "/a/app/test.csproj";
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openExternalProject({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.NodeJs },
            rootFiles: [ts.projectSystem.toExternalFile(jqueryJs.path)],
            typeAcquisition: { enable: false }
        });

        const p = projectService.externalProjects[0];
        projectService.checkNumberOfProjects({ externalProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [jqueryJs.path]);

        installer.checkPendingCommands(/*expectedCount*/ 0);
    });

    it("external project - type acquisition with disableFilenameBasedTypeAcquisition:true", () => {
        // Tests:
        // Exclude file with disableFilenameBasedTypeAcquisition:true
        const jqueryJs = {
            path: "/a/b/jquery.js",
            content: ""
        };

        const messages: string[] = [];
        const host = ts.projectSystem.createServerHost([jqueryJs]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery") }, { isEnabled: () => true, writeLine: msg => messages.push(msg) });
            }
            enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
                super.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction): void {
                const installedTypings: string[] = [];
                const typingFiles: ts.projectSystem.File[] = [];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectFileName = "/a/app/test.csproj";
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openExternalProject({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.NodeJs },
            rootFiles: [ts.projectSystem.toExternalFile(jqueryJs.path)],
            typeAcquisition: { enable: true, disableFilenameBasedTypeAcquisition: true }
        });

        const p = projectService.externalProjects[0];
        projectService.checkNumberOfProjects({ externalProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [jqueryJs.path]);

        installer.installAll(/*expectedCount*/ 0);
        projectService.checkNumberOfProjects({ externalProjects: 1 });
        // files should not be removed from project if ATA is skipped
        ts.projectSystem.checkProjectActualFiles(p, [jqueryJs.path]);
        assert.isTrue(messages.indexOf("No new typings were requested as a result of typings discovery") > 0, "Should not request filename-based typings");
    });

    it("external project - no type acquisition, with js & ts files", () => {
        // Tests:
        // 1. No typings are included for JS projects when the project contains ts files
        const jqueryJs = {
            path: "/a/b/jquery.js",
            content: ""
        };
        const file2Ts = {
            path: "/a/b/file2.ts",
            content: ""
        };

        const host = ts.projectSystem.createServerHost([jqueryJs, file2Ts]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery") });
            }
            enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
                super.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction): void {
                const installedTypings: string[] = [];
                const typingFiles: ts.projectSystem.File[] = [];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectFileName = "/a/app/test.csproj";
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openExternalProject({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.NodeJs },
            rootFiles: [ts.projectSystem.toExternalFile(jqueryJs.path), ts.projectSystem.toExternalFile(file2Ts.path)],
            typeAcquisition: {}
        });

        const p = projectService.externalProjects[0];
        projectService.checkNumberOfProjects({ externalProjects: 1 });

        ts.projectSystem.checkProjectActualFiles(p, [jqueryJs.path, file2Ts.path]);

        installer.checkPendingCommands(/*expectedCount*/ 0);

        ts.projectSystem.checkNumberOfProjects(projectService, { externalProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [jqueryJs.path, file2Ts.path]);
    });

    it("external project - with type acquisition, with only js, d.ts files", () => {
        // Tests:
        // 1. Safelist matching, type acquisition includes/excludes and package.json typings are all acquired
        // 2. Types for safelist matches are not included when they also appear in the type acquisition exclude list
        // 3. Multiple includes and excludes are respected in type acquisition
        const lodashJs = {
            path: "/a/b/lodash.js",
            content: ""
        };
        const commanderJs = {
            path: "/a/b/commander.js",
            content: ""
        };
        const file3dts = {
            path: "/a/b/file3.d.ts",
            content: ""
        };
        const packageJson = {
            path: "/a/b/package.json",
            content: JSON.stringify({
                name: "test",
                dependencies: {
                    express: "^3.1.0"
                }
            })
        };

        const commander = {
            path: "/a/data/node_modules/@types/commander/index.d.ts",
            content: "declare const commander: { x: number }"
        };
        const express = {
            path: "/a/data/node_modules/@types/express/index.d.ts",
            content: "declare const express: { x: number }"
        };
        const jquery = {
            path: "/a/data/node_modules/@types/jquery/index.d.ts",
            content: "declare const jquery: { x: number }"
        };
        const moment = {
            path: "/a/data/node_modules/@types/moment/index.d.ts",
            content: "declare const moment: { x: number }"
        };

        const host = ts.projectSystem.createServerHost([lodashJs, commanderJs, file3dts, packageJson, ts.projectSystem.customTypesMap]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery", "commander", "moment", "express") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction): void {
                const installedTypings = ["@types/commander", "@types/express", "@types/jquery", "@types/moment"];
                const typingFiles = [commander, express, jquery, moment];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectFileName = "/a/app/test.csproj";
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openExternalProject({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.NodeJs },
            rootFiles: [ts.projectSystem.toExternalFile(lodashJs.path), ts.projectSystem.toExternalFile(commanderJs.path), ts.projectSystem.toExternalFile(file3dts.path)],
            typeAcquisition: { enable: true, include: ["jquery", "moment"], exclude: ["lodash"] }
        });

        const p = projectService.externalProjects[0];
        projectService.checkNumberOfProjects({ externalProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [file3dts.path]);

        installer.installAll(/*expectedCount*/ 1);

        ts.projectSystem.checkNumberOfProjects(projectService, { externalProjects: 1 });
        host.checkTimeoutQueueLengthAndRun(1);
        ts.projectSystem.checkNumberOfProjects(projectService, { externalProjects: 1 });
        // Commander: Existed as a JS file
        // JQuery: Specified in 'include'
        // Moment: Specified in 'include'
        // Express: Specified in package.json
        // lodash: Excluded (not present)
        ts.projectSystem.checkProjectActualFiles(p, [file3dts.path, commander.path, jquery.path, moment.path, express.path]);
    });

    it("Throttle - delayed typings to install", () => {
        const lodashJs = {
            path: "/a/b/lodash.js",
            content: ""
        };
        const commanderJs = {
            path: "/a/b/commander.js",
            content: ""
        };
        const file3 = {
            path: "/a/b/file3.d.ts",
            content: ""
        };
        const packageJson = {
            path: "/a/b/package.json",
            content: JSON.stringify({
                name: "test",
                dependencies: {
                    express: "^3.1.0"
                }
            })
        };

        const commander = {
            path: "/a/data/node_modules/@types/commander/index.d.ts",
            content: "declare const commander: { x: number }"
        };
        const express = {
            path: "/a/data/node_modules/@types/express/index.d.ts",
            content: "declare const express: { x: number }"
        };
        const jquery = {
            path: "/a/data/node_modules/@types/jquery/index.d.ts",
            content: "declare const jquery: { x: number }"
        };
        const moment = {
            path: "/a/data/node_modules/@types/moment/index.d.ts",
            content: "declare const moment: { x: number }"
        };
        const lodash = {
            path: "/a/data/node_modules/@types/lodash/index.d.ts",
            content: "declare const lodash: { x: number }"
        };

        const typingFiles = [commander, express, jquery, moment, lodash];
        const host = ts.projectSystem.createServerHost([lodashJs, commanderJs, file3, packageJson, ts.projectSystem.customTypesMap]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { throttleLimit: 3, typesRegistry: ts.projectSystem.createTypesRegistry("commander", "express", "jquery", "moment", "lodash") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction): void {
                const installedTypings = ["@types/commander", "@types/express", "@types/jquery", "@types/moment", "@types/lodash"];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectFileName = "/a/app/test.csproj";
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openExternalProject({
            projectFileName,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.NodeJs },
            rootFiles: [ts.projectSystem.toExternalFile(lodashJs.path), ts.projectSystem.toExternalFile(commanderJs.path), ts.projectSystem.toExternalFile(file3.path)],
            typeAcquisition: { include: ["jquery", "moment"] }
        });

        const p = projectService.externalProjects[0];
        projectService.checkNumberOfProjects({ externalProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [file3.path]);
        installer.checkPendingCommands(/*expectedCount*/ 1);
        installer.executePendingCommands();
        // expected all typings file to exist
        for (const f of typingFiles) {
            assert.isTrue(host.fileExists(f.path), `expected file ${f.path} to exist`);
        }
        host.checkTimeoutQueueLengthAndRun(1);
        ts.projectSystem.checkNumberOfProjects(projectService, { externalProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [file3.path, commander.path, express.path, jquery.path, moment.path, lodash.path]);
    });

    it("Throttle - delayed run install requests", () => {
        const lodashJs = {
            path: "/a/b/lodash.js",
            content: ""
        };
        const commanderJs = {
            path: "/a/b/commander.js",
            content: ""
        };
        const file3 = {
            path: "/a/b/file3.d.ts",
            content: ""
        };

        const commander = {
            path: "/a/data/node_modules/@types/commander/index.d.ts",
            content: "declare const commander: { x: number }",
            typings: typingsName("commander")
        };
        const jquery = {
            path: "/a/data/node_modules/@types/jquery/index.d.ts",
            content: "declare const jquery: { x: number }",
            typings: typingsName("jquery")
        };
        const lodash = {
            path: "/a/data/node_modules/@types/lodash/index.d.ts",
            content: "declare const lodash: { x: number }",
            typings: typingsName("lodash")
        };
        const cordova = {
            path: "/a/data/node_modules/@types/cordova/index.d.ts",
            content: "declare const cordova: { x: number }",
            typings: typingsName("cordova")
        };
        const grunt = {
            path: "/a/data/node_modules/@types/grunt/index.d.ts",
            content: "declare const grunt: { x: number }",
            typings: typingsName("grunt")
        };
        const gulp = {
            path: "/a/data/node_modules/@types/gulp/index.d.ts",
            content: "declare const gulp: { x: number }",
            typings: typingsName("gulp")
        };

        const host = ts.projectSystem.createServerHost([lodashJs, commanderJs, file3, ts.projectSystem.customTypesMap]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { throttleLimit: 1, typesRegistry: ts.projectSystem.createTypesRegistry("commander", "jquery", "lodash", "cordova", "gulp", "grunt") });
            }
            installWorker(_requestId: number, args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction): void {
                let typingFiles: (ts.projectSystem.File & { typings: string })[] = [];
                if (args.indexOf(typingsName("commander")) >= 0) {
                    typingFiles = [commander, jquery, lodash, cordova];
                }
                else {
                    typingFiles = [grunt, gulp];
                }
                executeCommand(this, host, typingFiles.map(f => f.typings), typingFiles, cb);
            }
        })();

        // Create project #1 with 4 typings
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        const projectFileName1 = "/a/app/test1.csproj";
        projectService.openExternalProject({
            projectFileName: projectFileName1,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.NodeJs },
            rootFiles: [ts.projectSystem.toExternalFile(lodashJs.path), ts.projectSystem.toExternalFile(commanderJs.path), ts.projectSystem.toExternalFile(file3.path)],
            typeAcquisition: { include: ["jquery", "cordova"] }
        });

        installer.checkPendingCommands(/*expectedCount*/ 1);
        assert.equal(installer.pendingRunRequests.length, 0, "expect no throttled requests");

        // Create project #2 with 2 typings
        const projectFileName2 = "/a/app/test2.csproj";
        projectService.openExternalProject({
            projectFileName: projectFileName2,
            options: { allowJS: true, moduleResolution: ts.ModuleResolutionKind.NodeJs },
            rootFiles: [ts.projectSystem.toExternalFile(file3.path)],
            typeAcquisition: { include: ["grunt", "gulp"] }
        });
        assert.equal(installer.pendingRunRequests.length, 1, "expect one throttled request");

        const p1 = projectService.externalProjects[0];
        const p2 = projectService.externalProjects[1];
        projectService.checkNumberOfProjects({ externalProjects: 2 });
        ts.projectSystem.checkProjectActualFiles(p1, [file3.path]);
        ts.projectSystem.checkProjectActualFiles(p2, [file3.path]);

        installer.executePendingCommands();

        // expected one install request from the second project
        installer.checkPendingCommands(/*expectedCount*/ 1);
        assert.equal(installer.pendingRunRequests.length, 0, "expected no throttled requests");

        installer.executePendingCommands();
        host.checkTimeoutQueueLengthAndRun(2); // for 2 projects
        ts.projectSystem.checkProjectActualFiles(p1, [file3.path, commander.path, jquery.path, lodash.path, cordova.path]);
        ts.projectSystem.checkProjectActualFiles(p2, [file3.path, grunt.path, gulp.path]);
    });

    it("configured scoped name projects discover from node_modules", () => {
        const app = {
            path: "/app.js",
            content: ""
        };
        const pkgJson = {
            path: "/package.json",
            content: JSON.stringify({
                dependencies: {
                    "@zkat/cacache": "1.0.0"
                }
            })
        };
        const jsconfig = {
            path: "/jsconfig.json",
            content: JSON.stringify({})
        };
        // Should only accept direct dependencies.
        const commander = {
            path: "/node_modules/commander/index.js",
            content: ""
        };
        const commanderPackage = {
            path: "/node_modules/commander/package.json",
            content: JSON.stringify({
                name: "commander",
            })
        };
        const cacache = {
            path: "/node_modules/@zkat/cacache/index.js",
            content: ""
        };
        const cacachePackage = {
            path: "/node_modules/@zkat/cacache/package.json",
            content: JSON.stringify({ name: "@zkat/cacache" })
        };
        const cacacheDTS = {
            path: "/tmp/node_modules/@types/zkat__cacache/index.d.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([app, jsconfig, pkgJson, commander, commanderPackage, cacache, cacachePackage]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: ts.projectSystem.createTypesRegistry("zkat__cacache", "nested", "commander") });
            }
            installWorker(_requestId: number, args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                assert.deepEqual(args, [`@types/zkat__cacache@ts${ts.versionMajorMinor}`]);
                const installedTypings = ["@types/zkat__cacache"];
                const typingFiles = [cacacheDTS];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectService = ts.projectSystem.createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
        projectService.openClientFile(app.path);

        ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });
        const p = ts.projectSystem.configuredProjectAt(projectService, 0);
        ts.projectSystem.checkProjectActualFiles(p, [app.path, jsconfig.path]);

        installer.installAll(/*expectedCount*/ 1);

        ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkProjectActualFiles(p, [app.path, cacacheDTS.path, jsconfig.path]);
    });

    function testConfiguredProjectNodeModules({ jsconfigContent, appJsContent, jQueryJsInProjectBeforeInstall, jQueryDtsInProjectAfterInstall }: {
        jsconfigContent?: object,
        appJsContent?: string,
        jQueryJsInProjectBeforeInstall?: boolean,
        jQueryDtsInProjectAfterInstall?: boolean,
    } = {}) {
    const app = {
        path: "/app.js",
            content: appJsContent || ""
        };
        const pkgJson = {
            path: "/package.json",
            content: JSON.stringify({
                dependencies: {
                    jquery: "1.0.0"
                }
            })
        };
        const jsconfig = {
            path: "/jsconfig.json",
            content: JSON.stringify(jsconfigContent || {})
        };
        // Should only accept direct dependencies.
        const commander = {
            path: "/node_modules/commander/index.js",
            content: ""
        };
        const commanderPackage = {
            path: "/node_modules/commander/package.json",
            content: JSON.stringify({
                name: "commander",
            })
        };
        const jquery = {
            path: "/node_modules/jquery/index.js",
            content: ""
        };
        const jqueryPackage = {
            path: "/node_modules/jquery/package.json",
            content: JSON.stringify({ name: "jquery" })
        };
        // Should not search deeply in node_modules.
        const nestedPackage = {
            path: "/node_modules/jquery/nested/package.json",
            content: JSON.stringify({ name: "nested" }),
        };
        const jqueryDTS = {
            path: "/tmp/node_modules/@types/jquery/index.d.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([app, jsconfig, pkgJson, commander, commanderPackage, jquery, jqueryPackage, nestedPackage]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: ts.projectSystem.createTypesRegistry("jquery", "nested", "commander") });
            }
            installWorker(_requestId: number, args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                assert.deepEqual(args, [`@types/jquery@ts${ts.versionMajorMinor}`]);
                const installedTypings = ["@types/jquery"];
                const typingFiles = [jqueryDTS];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectService = ts.projectSystem.createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
        projectService.openClientFile(app.path);

        ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });
        const p = ts.projectSystem.configuredProjectAt(projectService, 0);
        const filesBeforeInstall = jQueryJsInProjectBeforeInstall ? [app.path, jquery.path, jsconfig.path] : [app.path, jsconfig.path];
        ts.projectSystem.checkProjectActualFiles(p, filesBeforeInstall);

        installer.installAll(jQueryDtsInProjectAfterInstall ? 1 : 0);

        ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });
        host.checkTimeoutQueueLengthAndRun(jQueryDtsInProjectAfterInstall ? 2 : 0);
        ts.projectSystem.checkProjectActualFiles(p, jQueryDtsInProjectAfterInstall ? [app.path, jqueryDTS.path, jsconfig.path] : filesBeforeInstall);
    }

    it("configured projects discover from node_modules", () => {
        testConfiguredProjectNodeModules({
            jQueryJsInProjectBeforeInstall: false,
            jQueryDtsInProjectAfterInstall: true,
        });
    });

    it("configured projects discover from node_modules - empty types", () => {
        // Explicit types prevent automatic inclusion from package.json listing
        testConfiguredProjectNodeModules({
            jsconfigContent: { compilerOptions: { types: [] } },
            jQueryJsInProjectBeforeInstall: false,
            jQueryDtsInProjectAfterInstall: false,
        });
    });

    it("configured projects discover from node_modules - explicit types", () => {
        // A type reference directive will not resolve to the global typings cache
        testConfiguredProjectNodeModules({
            jsconfigContent: { compilerOptions: { types: ["jquery"] } },
            jQueryJsInProjectBeforeInstall: false,
            jQueryDtsInProjectAfterInstall: false
        });
    });

    it("configured projects discover from node_modules - empty types but has import", () => {
        // However, explicit types will not prevent unresolved imports from pulling in typings
        testConfiguredProjectNodeModules({
            jsconfigContent: { compilerOptions: { types: [] } },
            appJsContent: `import "jquery";`,
            jQueryJsInProjectBeforeInstall: true,
            jQueryDtsInProjectAfterInstall: true,
        });
    });

    it("configured projects discover from bower_components", () => {
        const app = {
            path: "/app.js",
            content: ""
        };
        const jsconfig = {
            path: "/jsconfig.json",
            content: JSON.stringify({})
        };
        const jquery = {
            path: "/bower_components/jquery/index.js",
            content: ""
        };
        const jqueryPackage = {
            path: "/bower_components/jquery/bower.json",
            content: JSON.stringify({ name: "jquery" })
        };
        const jqueryDTS = {
            path: "/tmp/node_modules/@types/jquery/index.d.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([app, jsconfig, jquery, jqueryPackage]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: ts.projectSystem.createTypesRegistry("jquery") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings = ["@types/jquery"];
                const typingFiles = [jqueryDTS];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectService = ts.projectSystem.createProjectService(host, {
            useSingleInferredProject: true,
            typingsInstaller: installer,
            logger: ts.projectSystem.createLoggerWithInMemoryLogs(host),
        });
        projectService.openClientFile(app.path);

        installer.installAll(/*expectedCount*/ 1);

        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.baselineTsserverLogs("typingsInstaller", "configured projects discover from bower_components", projectService);
    });

    it("configured projects discover from bower.json", () => {
        const app = {
            path: "/app.js",
            content: ""
        };
        const jsconfig = {
            path: "/jsconfig.json",
            content: JSON.stringify({})
        };
        const bowerJson = {
            path: "/bower.json",
            content: JSON.stringify({
                dependencies: {
                    jquery: "^3.1.0"
                }
            })
        };
        const jqueryDTS = {
            path: "/tmp/node_modules/@types/jquery/index.d.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([app, jsconfig, bowerJson]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: ts.projectSystem.createTypesRegistry("jquery") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings = ["@types/jquery"];
                const typingFiles = [jqueryDTS];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectService = ts.projectSystem.createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
        projectService.openClientFile(app.path);

        ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });
        const p = ts.projectSystem.configuredProjectAt(projectService, 0);
        ts.projectSystem.checkProjectActualFiles(p, [app.path, jsconfig.path]);

        installer.installAll(/*expectedCount*/ 1);

        ts.projectSystem.checkNumberOfProjects(projectService, { configuredProjects: 1 });
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkProjectActualFiles(p, [app.path, jqueryDTS.path, jsconfig.path]);
    });

    it("Malformed package.json should be watched", () => {
        const f = {
            path: "/a/b/app.js",
            content: "var x = 1"
        };
        const brokenPackageJson = {
            path: "/a/b/package.json",
            content: `{ "dependencies": { "co } }`
        };
        const fixedPackageJson = {
            path: brokenPackageJson.path,
            content: `{ "dependencies": { "commander": "0.0.2" } }`
        };
        const cachePath = "/a/cache/";
        const commander = {
            path: cachePath + "node_modules/@types/commander/index.d.ts",
            content: "export let x: number"
        };
        const host = ts.projectSystem.createServerHost([f, brokenPackageJson]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: ts.projectSystem.createTypesRegistry("commander") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings = ["@types/commander"];
                const typingFiles = [commander];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();
        const service = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        service.openClientFile(f.path);

        installer.checkPendingCommands(/*expectedCount*/ 0);
        host.writeFile(fixedPackageJson.path, fixedPackageJson.content);
        host.checkTimeoutQueueLength(0);
        // expected install request
        installer.installAll(/*expectedCount*/ 1);
        host.checkTimeoutQueueLengthAndRun(2);
        service.checkNumberOfProjects({ inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], [f.path, commander.path]);
    });

    it("should install typings for unresolved imports", () => {
        const file = {
            path: "/a/b/app.js",
            content: `
                import * as fs from "fs";
                import * as commander from "commander";
                import * as component from "@ember/component";`
        };
        const cachePath = "/a/cache";
        const node = {
            path: cachePath + "/node_modules/@types/node/index.d.ts",
            content: "export let x: number"
        };
        const commander = {
            path: cachePath + "/node_modules/@types/commander/index.d.ts",
            content: "export let y: string"
        };
        const emberComponentDirectory = "ember__component";
        const emberComponent = {
            path: `${cachePath}/node_modules/@types/${emberComponentDirectory}/index.d.ts`,
            content: "export let x: number"
        };
        const host = ts.projectSystem.createServerHost([file]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: ts.projectSystem.createTypesRegistry("node", "commander") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings = ["@types/node", "@types/commander", `@types/${emberComponentDirectory}`];
                const typingFiles = [node, commander, emberComponent];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();
        const service = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        service.openClientFile(file.path);

        service.checkNumberOfProjects({ inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], [file.path]);

        installer.installAll(/*expectedCount*/1);

        assert.isTrue(host.fileExists(node.path), "typings for 'node' should be created");
        assert.isTrue(host.fileExists(commander.path), "typings for 'commander' should be created");
        assert.isTrue(host.fileExists(emberComponent.path), "typings for 'commander' should be created");

        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkProjectActualFiles(service.inferredProjects[0], [file.path, node.path, commander.path, emberComponent.path]);
    });

    it("should redo resolution that resolved to '.js' file after typings are installed", () => {
        const file: ts.TestFSWithWatch.File = {
            path: `${ts.tscWatch.projects}/a/b/app.js`,
            content: `
                import * as commander from "commander";`
        };
        const cachePath = `${ts.tscWatch.projects}/a/cache`;
        const commanderJS: ts.TestFSWithWatch.File = {
            path: `${ts.tscWatch.projects}/node_modules/commander/index.js`,
            content: "module.exports = 0",
        };

        const typeNames: readonly string[] = ["commander"];
        const typePath = (name: string): string => `${cachePath}/node_modules/@types/${name}/index.d.ts`;
        const host = ts.projectSystem.createServerHost([file, commanderJS]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: ts.projectSystem.createTypesRegistry(...typeNames) });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings = typeNames.map(name => `@types/${name}`);
                const typingFiles = typeNames.map((name): ts.TestFSWithWatch.File => ({ path: typePath(name), content: "" }));
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();
        const service = ts.projectSystem.createProjectService(host, {
            typingsInstaller: installer,
            logger: ts.projectSystem.createLoggerWithInMemoryLogs(host),
        });
        service.openClientFile(file.path);

        installer.installAll(/*expectedCount*/1);
        for (const name of typeNames) {
            assert.isTrue(host.fileExists(typePath(name)), `typings for '${name}' should be created`);
        }
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.baselineTsserverLogs("typingsInstaller", "redo resolutions pointing to js on typing install", service);
    });

    it("should pick typing names from non-relative unresolved imports", () => {
        const f1 = {
            path: "/a/b/app.js",
            content: `
                import * as a from "foo/a/a";
                import * as b from "foo/a/b";
                import * as c from "foo/a/c";
                import * as d from "@bar/router/";
                import * as e from "@bar/common/shared";
                import * as e from "@bar/common/apps";
                import * as f from "./lib"
                `
        };

        const host = ts.projectSystem.createServerHost([f1]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: "/tmp", typesRegistry: ts.projectSystem.createTypesRegistry("foo") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                executeCommand(this, host, ["foo"], [], cb);
            }
        })();
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openClientFile(f1.path);
        projectService.checkNumberOfProjects({ inferredProjects: 1 });

        const proj = projectService.inferredProjects[0];
        proj.updateGraph();

        assert.deepEqual(
            proj.cachedUnresolvedImportsPerFile.get(f1.path as ts.Path),
            ["foo", "foo", "foo", "@bar/router", "@bar/common", "@bar/common"]
        );

        installer.installAll(/*expectedCount*/ 1);
    });

    it("cached unresolved typings are not recomputed if program structure did not change", () => {
        const host = ts.projectSystem.createServerHost([]);
        const session = ts.projectSystem.createSession(host);
        const f = {
            path: "/a/app.js",
            content: `
                import * as fs from "fs";
                import * as cmd from "commander
                `
        };
        const openRequest: ts.server.protocol.OpenRequest = {
            seq: 1,
            type: "request",
            command: ts.server.protocol.CommandTypes.Open,
            arguments: {
                file: f.path,
                fileContent: f.content
            }
        };
        session.executeCommand(openRequest);
        const projectService = session.getProjectService();
        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        const proj = projectService.inferredProjects[0];
        const version1 = proj.lastCachedUnresolvedImportsList;

        // make a change that should not affect the structure of the program
        const changeRequest: ts.server.protocol.ChangeRequest = {
            seq: 2,
            type: "request",
            command: ts.server.protocol.CommandTypes.Change,
            arguments: {
                file: f.path,
                insertString: "\nlet x = 1;",
                line: 2,
                offset: 0,
                endLine: 2,
                endOffset: 0
            }
        };
        session.executeCommand(changeRequest);
        host.checkTimeoutQueueLength(0);
        proj.updateGraph();
        const version2 = proj.lastCachedUnresolvedImportsList;
        assert.strictEqual(version1, version2, "set of unresolved imports should change");
    });

    it("expired cache entry (inferred project, should install typings)", () => {
        const file1 = {
            path: "/a/b/app.js",
            content: ""
        };
        const packageJson = {
            path: "/a/b/package.json",
            content: JSON.stringify({
                name: "test",
                dependencies: {
                    jquery: "^3.1.0"
                }
            })
        };
        const jquery = {
            path: "/a/data/node_modules/@types/jquery/index.d.ts",
            content: "declare const $: { x: number }"
        };
        const cacheConfig = {
            path: "/a/data/package.json",
            content: JSON.stringify({
                dependencies: {
                    "types-registry": "^0.1.317"
                },
                devDependencies: {
                    "@types/jquery": "^1.0.0"
                }
            })
        };
        const cacheLockConfig = {
            path: "/a/data/package-lock.json",
            content: JSON.stringify({
                dependencies: {
                    "@types/jquery": {
                        version: "1.0.0"
                    }
                }
            })
        };
        const host = ts.projectSystem.createServerHost([file1, packageJson, jquery, cacheConfig, cacheLockConfig]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings = ["@types/jquery"];
                const typingFiles = [jquery];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectService = ts.projectSystem.createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
        projectService.openClientFile(file1.path);

        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        const p = projectService.inferredProjects[0];
        ts.projectSystem.checkProjectActualFiles(p, [file1.path]);

        installer.installAll(/*expectedCount*/ 1);
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [file1.path, jquery.path]);
    });

    it("non-expired cache entry (inferred project, should not install typings)", () => {
        const file1 = {
            path: "/a/b/app.js",
            content: ""
        };
        const packageJson = {
            path: "/a/b/package.json",
            content: JSON.stringify({
                name: "test",
                dependencies: {
                    jquery: "^3.1.0"
                }
            })
        };
        const timestamps = {
            path: "/a/data/timestamps.json",
            content: JSON.stringify({
                entries: {
                    "@types/jquery": Date.now()
                }
            })
        };
        const cacheConfig = {
            path: "/a/data/package.json",
            content: JSON.stringify({
                dependencies: {
                    "types-registry": "^0.1.317"
                },
                devDependencies: {
                    "@types/jquery": "^1.3.0"
                }
            })
        };
        const cacheLockConfig = {
            path: "/a/data/package-lock.json",
            content: JSON.stringify({
                dependencies: {
                    "@types/jquery": {
                        version: "1.3.0"
                    }
                }
            })
        };
        const jquery = {
            path: "/a/data/node_modules/@types/jquery/index.d.ts",
            content: "declare const $: { x: number }"
        };
        const host = ts.projectSystem.createServerHost([file1, packageJson, timestamps, cacheConfig, cacheLockConfig, jquery]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { typesRegistry: ts.projectSystem.createTypesRegistry("jquery") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings: string[] = [];
                const typingFiles: ts.projectSystem.File[] = [];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
        })();

        const projectService = ts.projectSystem.createProjectService(host, { useSingleInferredProject: true, typingsInstaller: installer });
        projectService.openClientFile(file1.path);

        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        const p = projectService.inferredProjects[0];
        ts.projectSystem.checkProjectActualFiles(p, [file1.path]);

        installer.installAll(/*expectedCount*/ 0);

        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(p, [file1.path]);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: Validate package name:", () => {
    it("name cannot be too long", () => {
        let packageName = "a";
        for (let i = 0; i < 8; i++) {
            packageName += packageName;
        }
        assert.equal(validatePackageName(packageName), NameValidationResult.NameTooLong);
    });
    it("package name cannot start with dot", () => {
        assert.equal(validatePackageName(".foo"), NameValidationResult.NameStartsWithDot);
    });
    it("package name cannot start with underscore", () => {
        assert.equal(validatePackageName("_foo"), NameValidationResult.NameStartsWithUnderscore);
    });
    it("package non URI safe characters are not supported", () => {
        assert.equal(validatePackageName("  scope  "), NameValidationResult.NameContainsNonURISafeCharacters);
        assert.equal(validatePackageName("; say ‘Hello from TypeScript!’ #"), NameValidationResult.NameContainsNonURISafeCharacters);
        assert.equal(validatePackageName("a/b/c"), NameValidationResult.NameContainsNonURISafeCharacters);
    });
    it("scoped package name is supported", () => {
        assert.equal(validatePackageName("@scope/bar"), NameValidationResult.Ok);
    });
    it("scoped name in scoped package name cannot start with dot", () => {
        assert.deepEqual(validatePackageName("@.scope/bar"), { name: ".scope", isScopeName: true, result: NameValidationResult.NameStartsWithDot });
        assert.deepEqual(validatePackageName("@.scope/.bar"), { name: ".scope", isScopeName: true, result: NameValidationResult.NameStartsWithDot });
    });
    it("scope name in scoped package name cannot start with underscore", () => {
        assert.deepEqual(validatePackageName("@_scope/bar"), { name: "_scope", isScopeName: true, result: NameValidationResult.NameStartsWithUnderscore });
        assert.deepEqual(validatePackageName("@_scope/_bar"), { name: "_scope", isScopeName: true, result: NameValidationResult.NameStartsWithUnderscore });
    });
    it("scope name in scoped package name with non URI safe characters are not supported", () => {
        assert.deepEqual(validatePackageName("@  scope  /bar"), { name: "  scope  ", isScopeName: true, result: NameValidationResult.NameContainsNonURISafeCharacters });
        assert.deepEqual(validatePackageName("@; say ‘Hello from TypeScript!’ #/bar"), { name: "; say ‘Hello from TypeScript!’ #", isScopeName: true, result: NameValidationResult.NameContainsNonURISafeCharacters });
        assert.deepEqual(validatePackageName("@  scope  /  bar  "), { name: "  scope  ", isScopeName: true, result: NameValidationResult.NameContainsNonURISafeCharacters });
    });
    it("package name in scoped package name cannot start with dot", () => {
        assert.deepEqual(validatePackageName("@scope/.bar"), { name: ".bar", isScopeName: false, result: NameValidationResult.NameStartsWithDot });
    });
    it("package name in scoped package name cannot start with underscore", () => {
        assert.deepEqual(validatePackageName("@scope/_bar"), { name: "_bar", isScopeName: false, result: NameValidationResult.NameStartsWithUnderscore });
    });
    it("package name in scoped package name with non URI safe characters are not supported", () => {
        assert.deepEqual(validatePackageName("@scope/  bar  "), { name: "  bar  ", isScopeName: false, result: NameValidationResult.NameContainsNonURISafeCharacters });
        assert.deepEqual(validatePackageName("@scope/; say ‘Hello from TypeScript!’ #"), { name: "; say ‘Hello from TypeScript!’ #", isScopeName: false, result: NameValidationResult.NameContainsNonURISafeCharacters });
    });
});

describe("unittests:: tsserver:: typingsInstaller:: Invalid package names", () => {
    it("should not be installed", () => {
        const f1 = {
            path: "/a/b/app.js",
            content: "let x = 1"
        };
        const packageJson = {
            path: "/a/b/package.json",
            content: JSON.stringify({
                dependencies: {
                    "; say ‘Hello from TypeScript!’ #": "0.0.x"
                }
            })
        };
        const messages: string[] = [];
        const host = ts.projectSystem.createServerHost([f1, packageJson]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: "/tmp" }, { isEnabled: () => true, writeLine: msg => messages.push(msg) });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, _cb: ts.projectSystem.TI.RequestCompletedAction) {
                assert(false, "runCommand should not be invoked");
            }
        })();
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openClientFile(f1.path);

        installer.checkPendingCommands(/*expectedCount*/ 0);
        assert.isTrue(messages.indexOf("'; say ‘Hello from TypeScript!’ #':: Package name '; say ‘Hello from TypeScript!’ #' contains non URI safe characters") > 0, "should find package with invalid name");
    });
});

describe("unittests:: tsserver:: typingsInstaller:: discover typings", () => {
    const emptySafeList = ts.emptyMap;

    it("should use mappings from safe list", () => {
        const app = {
            path: "/a/b/app.js",
            content: ""
        };
        const jquery = {
            path: "/a/b/jquery.js",
            content: ""
        };
        const chroma = {
            path: "/a/b/chroma.min.js",
            content: ""
        };

        const safeList = new ts.Map(ts.getEntries({ jquery: "jquery", chroma: "chroma-js" }));

        const host = ts.projectSystem.createServerHost([app, jquery, chroma]);
        const logger = trackingLogger();
        const result = ts.JsTyping.discoverTypings(host, logger.log, [app.path, jquery.path, chroma.path], ts.getDirectoryPath(app.path as ts.Path), safeList, ts.emptyMap, { enable: true }, ts.emptyArray, ts.emptyMap, ts.emptyOptions);
        const finish = logger.finish();
        assert.deepEqual(finish, [
            'Inferred typings from file names: ["jquery","chroma-js"]',
            "Inferred typings from unresolved imports: []",
            'Result: {"cachedTypingPaths":[],"newTypingNames":["jquery","chroma-js"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/b/oh_modules"]}',
        ], finish.join("\r\n"));
        assert.deepEqual(result.newTypingNames, ["jquery", "chroma-js"]);
    });

    it("should return node for core modules", () => {
        const f = {
            path: "/a/b/app.js",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([f]);
        const cache = new ts.Map<string, ts.JsTyping.CachedTyping>();

        for (const name of ts.JsTyping.nodeCoreModuleList) {
            const logger = trackingLogger();
            const result = ts.JsTyping.discoverTypings(host, logger.log, [f.path], ts.getDirectoryPath(f.path as ts.Path), emptySafeList, cache, { enable: true }, [name, "somename"], ts.emptyMap, ts.emptyOptions);
            assert.deepEqual(logger.finish(), [
                'Inferred typings from unresolved imports: ["node","somename"]',
                'Result: {"cachedTypingPaths":[],"newTypingNames":["node","somename"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/b/oh_modules"]}',
            ]);
            assert.deepEqual(result.newTypingNames.sort(), ["node", "somename"]);
        }
    });

    it("should use cached locations", () => {
        const f = {
            path: "/a/b/app.js",
            content: ""
        };
        const node = {
            path: "/a/b/node.d.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([f, node]);
        const cache = new ts.Map(ts.getEntries<ts.JsTyping.CachedTyping>({ node: { typingLocation: node.path, version: new ts.Version("1.3.0") } }));
        const registry = ts.projectSystem.createTypesRegistry("node");
        const logger = trackingLogger();
        const result = ts.JsTyping.discoverTypings(host, logger.log, [f.path], ts.getDirectoryPath(f.path as ts.Path), emptySafeList, cache, { enable: true }, ["fs", "bar"], registry, ts.emptyOptions);
        assert.deepEqual(logger.finish(), [
            'Inferred typings from unresolved imports: ["node","bar"]',
            'Result: {"cachedTypingPaths":["/a/b/node.d.ts"],"newTypingNames":["bar"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/b/oh_modules"]}',
        ]);
        assert.deepEqual(result.cachedTypingPaths, [node.path]);
        assert.deepEqual(result.newTypingNames, ["bar"]);
    });

    it("should gracefully handle packages that have been removed from the types-registry", () => {
        const f = {
            path: "/a/b/app.js",
            content: ""
        };
        const node = {
            path: "/a/b/node.d.ts",
            content: ""
        };
        const host = ts.projectSystem.createServerHost([f, node]);
        const cache = new ts.Map(ts.getEntries<ts.JsTyping.CachedTyping>({ node: { typingLocation: node.path, version: new ts.Version("1.3.0") } }));
        const logger = trackingLogger();
        const result = ts.JsTyping.discoverTypings(host, logger.log, [f.path], ts.getDirectoryPath(f.path as ts.Path), emptySafeList, cache, { enable: true }, ["fs", "bar"], ts.emptyMap, ts.emptyOptions);
        assert.deepEqual(logger.finish(), [
            'Inferred typings from unresolved imports: ["node","bar"]',
            'Result: {"cachedTypingPaths":[],"newTypingNames":["node","bar"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules","/a/b/oh_modules"]}',
        ]);
        assert.deepEqual(result.cachedTypingPaths, []);
        assert.deepEqual(result.newTypingNames, ["node", "bar"]);
    });

    it("should search only 2 levels deep", () => {
        const app = {
            path: "/app.js",
            content: "",
        };
        const a = {
            path: "/node_modules/a/package.json",
            content: JSON.stringify({ name: "a" }),
        };
        const b = {
            path: "/node_modules/a/b/package.json",
            content: JSON.stringify({ name: "b" }),
        };
        const host = ts.projectSystem.createServerHost([app, a, b]);
        const cache = new ts.Map<string, ts.JsTyping.CachedTyping>();
        const logger = trackingLogger();
        const result = ts.JsTyping.discoverTypings(host, logger.log, [app.path], ts.getDirectoryPath(app.path as ts.Path), emptySafeList, cache, { enable: true }, /*unresolvedImports*/ [], ts.emptyMap, ts.emptyOptions);
        assert.deepEqual(logger.finish(), [
            'Searching for typing names in /node_modules; all files: ["/node_modules/a/package.json"]',
            '    Found package names: ["a"]',
            "Inferred typings from unresolved imports: []",
            'Result: {"cachedTypingPaths":[],"newTypingNames":["a"],"filesToWatch":["/bower_components","/node_modules","/oh_modules"]}',
        ]);
        assert.deepEqual(result, {
            cachedTypingPaths: [],
            newTypingNames: ["a"], // But not "b"
            filesToWatch: ["/bower_components", "/node_modules", "/oh_modules"],
        });
    });

    it("should support scoped packages", () => {
        const app = {
            path: "/app.js",
            content: "",
        };
        const a = {
            path: "/node_modules/@a/b/package.json",
            content: JSON.stringify({ name: "@a/b" }),
        };
        const host = ts.projectSystem.createServerHost([app, a]);
        const cache = new ts.Map<string, ts.JsTyping.CachedTyping>();
        const logger = trackingLogger();
        const result = ts.JsTyping.discoverTypings(host, logger.log, [app.path], ts.getDirectoryPath(app.path as ts.Path), emptySafeList, cache, { enable: true }, /*unresolvedImports*/ [], ts.emptyMap, ts.emptyOptions);
        assert.deepEqual(logger.finish(), [
            'Searching for typing names in /node_modules; all files: ["/node_modules/@a/b/package.json"]',
            '    Found package names: ["@a/b"]',
            "Inferred typings from unresolved imports: []",
            'Result: {"cachedTypingPaths":[],"newTypingNames":["@a/b"],"filesToWatch":["/bower_components","/node_modules","/oh_modules"]}',
        ]);
        assert.deepEqual(result, {
            cachedTypingPaths: [],
            newTypingNames: ["@a/b"],
            filesToWatch: ["/bower_components", "/node_modules", "/oh_modules"],
        });
    });
    it("should install expired typings", () => {
        const app = {
            path: "/a/app.js",
            content: ""
        };
        const cachePath = "/a/cache/";
        const commander = {
            path: cachePath + "node_modules/@types/commander/index.d.ts",
            content: "export let x: number"
        };
        const node = {
            path: cachePath + "node_modules/@types/node/index.d.ts",
            content: "export let y: number"
        };
        const host = ts.projectSystem.createServerHost([app]);
        const cache = new ts.Map(ts.getEntries<ts.JsTyping.CachedTyping>({
            node: { typingLocation: node.path, version: new ts.Version("1.3.0") },
            commander: { typingLocation: commander.path, version: new ts.Version("1.0.0") }
        }));
        const registry = ts.projectSystem.createTypesRegistry("node", "commander");
        const logger = trackingLogger();
        const result = ts.JsTyping.discoverTypings(host, logger.log, [app.path], ts.getDirectoryPath(app.path as ts.Path), emptySafeList, cache, { enable: true }, ["http", "commander"], registry, ts.emptyOptions);
        assert.deepEqual(logger.finish(), [
            'Inferred typings from unresolved imports: ["node","commander"]',
            'Result: {"cachedTypingPaths":["/a/cache/node_modules/@types/node/index.d.ts"],"newTypingNames":["commander"],"filesToWatch":["/a/bower_components","/a/node_modules","/a/oh_modules"]}',
        ]);
        assert.deepEqual(result.cachedTypingPaths, [node.path]);
        assert.deepEqual(result.newTypingNames, ["commander"]);
    });

    it("should install expired typings with prerelease version of tsserver", () => {
        const app = {
            path: "/a/app.js",
            content: ""
        };
        const cachePath = "/a/cache/";
        const node = {
            path: cachePath + "node_modules/@types/node/index.d.ts",
            content: "export let y: number"
        };
        const host = ts.projectSystem.createServerHost([app]);
        const cache = new ts.Map(ts.getEntries<ts.JsTyping.CachedTyping>({
            node: { typingLocation: node.path, version: new ts.Version("1.0.0") }
        }));
        const registry = ts.projectSystem.createTypesRegistry("node");
        registry.delete(`ts${ts.versionMajorMinor}`);
        const logger = trackingLogger();
        const result = ts.JsTyping.discoverTypings(host, logger.log, [app.path], ts.getDirectoryPath(app.path as ts.Path), emptySafeList, cache, { enable: true }, ["http"], registry, ts.emptyOptions);
        assert.deepEqual(logger.finish(), [
            'Inferred typings from unresolved imports: ["node"]',
            'Result: {"cachedTypingPaths":[],"newTypingNames":["node"],"filesToWatch":["/a/bower_components","/a/node_modules","/a/oh_modules"]}',
        ]);
        assert.deepEqual(result.cachedTypingPaths, []);
        assert.deepEqual(result.newTypingNames, ["node"]);
    });


    it("prerelease typings are properly handled", () => {
        const app = {
            path: "/a/app.js",
            content: ""
        };
        const cachePath = "/a/cache/";
        const commander = {
            path: cachePath + "node_modules/@types/commander/index.d.ts",
            content: "export let x: number"
        };
        const node = {
            path: cachePath + "node_modules/@types/node/index.d.ts",
            content: "export let y: number"
        };
        const host = ts.projectSystem.createServerHost([app]);
        const cache = new ts.Map(ts.getEntries<ts.JsTyping.CachedTyping>({
            node: { typingLocation: node.path, version: new ts.Version("1.3.0-next.0") },
            commander: { typingLocation: commander.path, version: new ts.Version("1.3.0-next.0") }
        }));
        const registry = ts.projectSystem.createTypesRegistry("node", "commander");
        registry.get("node")![`ts${ts.versionMajorMinor}`] = "1.3.0-next.1";
        const logger = trackingLogger();
        const result = ts.JsTyping.discoverTypings(host, logger.log, [app.path], ts.getDirectoryPath(app.path as ts.Path), emptySafeList, cache, { enable: true }, ["http", "commander"], registry, ts.emptyOptions);
        assert.deepEqual(logger.finish(), [
            'Inferred typings from unresolved imports: ["node","commander"]',
            'Result: {"cachedTypingPaths":[],"newTypingNames":["node","commander"],"filesToWatch":["/a/bower_components","/a/node_modules","/a/oh_modules"]}',
        ]);
        assert.deepEqual(result.cachedTypingPaths, []);
        assert.deepEqual(result.newTypingNames, ["node", "commander"]);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: telemetry events", () => {
    it("should be received", () => {
        const f1 = {
            path: "/a/app.js",
            content: ""
        };
        const packageFile = {
            path: "/a/package.json",
            content: JSON.stringify({ dependencies: { commander: "1.0.0" } })
        };
        const cachePath = "/a/cache/";
        const commander = {
            path: cachePath + "node_modules/@types/commander/index.d.ts",
            content: "export let x: number"
        };
        const host = ts.projectSystem.createServerHost([f1, packageFile]);
        let seenTelemetryEvent = false;
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: ts.projectSystem.createTypesRegistry("commander") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings = ["@types/commander"];
                const typingFiles = [commander];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
            sendResponse(response: ts.server.SetTypings | ts.server.InvalidateCachedTypings | ts.server.BeginInstallTypes | ts.server.EndInstallTypes) {
                if (response.kind === ts.server.EventBeginInstallTypes) {
                    return;
                }
                if (response.kind === ts.server.EventEndInstallTypes) {
                    assert.deepEqual(response.packagesToInstall, [typingsName("commander")]);
                    seenTelemetryEvent = true;
                    return;
                }
                super.sendResponse(response);
            }
        })();
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openClientFile(f1.path);

        installer.installAll(/*expectedCount*/ 1);

        assert.isTrue(seenTelemetryEvent);
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(projectService.inferredProjects[0], [f1.path, commander.path]);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: progress notifications", () => {
    it("should be sent for success", () => {
        const f1 = {
            path: "/a/app.js",
            content: ""
        };
        const packageFile = {
            path: "/a/package.json",
            content: JSON.stringify({ dependencies: { commander: "1.0.0" } })
        };
        const packageLockFile = {
            path: "/a/cache/package-lock.json",
            content: JSON.stringify({
                dependencies: {
                    "@types/commander": {
                        version: "1.0.0"
                    }
                }
            })
        };
        const cachePath = "/a/cache/";
        const commander = {
            path: cachePath + "node_modules/@types/commander/index.d.ts",
            content: "export let x: number"
        };
        const host = ts.projectSystem.createServerHost([f1, packageFile, packageLockFile]);
        let beginEvent!: ts.server.BeginInstallTypes;
        let endEvent!: ts.server.EndInstallTypes;
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: ts.projectSystem.createTypesRegistry("commander") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                const installedTypings = ["@types/commander"];
                const typingFiles = [commander];
                executeCommand(this, host, installedTypings, typingFiles, cb);
            }
            sendResponse(response: ts.server.SetTypings | ts.server.InvalidateCachedTypings | ts.server.BeginInstallTypes | ts.server.EndInstallTypes) {
                if (response.kind === ts.server.EventBeginInstallTypes) {
                    beginEvent = response;
                    return;
                }
                if (response.kind === ts.server.EventEndInstallTypes) {
                    endEvent = response;
                    return;
                }
                super.sendResponse(response);
            }
        })();
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openClientFile(f1.path);

        installer.installAll(/*expectedCount*/ 1);

        assert.isTrue(!!beginEvent);
        assert.isTrue(!!endEvent);
        assert.isTrue(beginEvent.eventId === endEvent.eventId);
        assert.isTrue(endEvent.installSuccess);
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(projectService.inferredProjects[0], [f1.path, commander.path]);
    });

    it("should be sent for error", () => {
        const f1 = {
            path: "/a/app.js",
            content: ""
        };
        const packageFile = {
            path: "/a/package.json",
            content: JSON.stringify({ dependencies: { commander: "1.0.0" } })
        };
        const cachePath = "/a/cache/";
        const host = ts.projectSystem.createServerHost([f1, packageFile]);
        let beginEvent: ts.server.BeginInstallTypes | undefined;
        let endEvent: ts.server.EndInstallTypes | undefined;
        const installer: Installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation: cachePath, typesRegistry: ts.projectSystem.createTypesRegistry("commander") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                executeCommand(this, host, "", [], cb);
            }
            sendResponse(response: ts.server.SetTypings | ts.server.InvalidateCachedTypings | ts.server.BeginInstallTypes | ts.server.EndInstallTypes) {
                if (response.kind === ts.server.EventBeginInstallTypes) {
                    beginEvent = response;
                    return;
                }
                if (response.kind === ts.server.EventEndInstallTypes) {
                    endEvent = response;
                    return;
                }
                super.sendResponse(response);
            }
        })();
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openClientFile(f1.path);

        installer.installAll(/*expectedCount*/ 1);

        assert.isTrue(!!beginEvent);
        assert.isTrue(!!endEvent);
        assert.isTrue(beginEvent!.eventId === endEvent!.eventId);
        assert.isFalse(endEvent!.installSuccess);
        ts.projectSystem.checkNumberOfProjects(projectService, { inferredProjects: 1 });
        ts.projectSystem.checkProjectActualFiles(projectService.inferredProjects[0], [f1.path]);
    });
});

describe("unittests:: tsserver:: typingsInstaller:: npm installation command", () => {
    const npmPath = "npm", tsVersion = "2.9.0-dev.20180410";
    const packageNames = ["@types/graphql@ts2.8", "@types/highlight.js@ts2.8", "@types/jest@ts2.8", "@types/mini-css-extract-plugin@ts2.8", "@types/mongoose@ts2.8", "@types/pg@ts2.8", "@types/webpack-bundle-analyzer@ts2.8", "@types/enhanced-resolve@ts2.8", "@types/eslint-plugin-prettier@ts2.8", "@types/friendly-errors-webpack-plugin@ts2.8", "@types/hammerjs@ts2.8", "@types/history@ts2.8", "@types/image-size@ts2.8", "@types/js-cookie@ts2.8", "@types/koa-compress@ts2.8", "@types/less@ts2.8", "@types/material-ui@ts2.8", "@types/mysql@ts2.8", "@types/nodemailer@ts2.8", "@types/prettier@ts2.8", "@types/query-string@ts2.8", "@types/react-places-autocomplete@ts2.8", "@types/react-router@ts2.8", "@types/react-router-config@ts2.8", "@types/react-select@ts2.8", "@types/react-transition-group@ts2.8", "@types/redux-form@ts2.8", "@types/abbrev@ts2.8", "@types/accepts@ts2.8", "@types/acorn@ts2.8", "@types/ansi-regex@ts2.8", "@types/ansi-styles@ts2.8", "@types/anymatch@ts2.8", "@types/apollo-codegen@ts2.8", "@types/are-we-there-yet@ts2.8", "@types/argparse@ts2.8", "@types/arr-union@ts2.8", "@types/array-find-index@ts2.8", "@types/array-uniq@ts2.8", "@types/array-unique@ts2.8", "@types/arrify@ts2.8", "@types/assert-plus@ts2.8", "@types/async@ts2.8", "@types/autoprefixer@ts2.8", "@types/aws4@ts2.8", "@types/babel-code-frame@ts2.8", "@types/babel-generator@ts2.8", "@types/babel-plugin-syntax-jsx@ts2.8", "@types/babel-template@ts2.8", "@types/babel-traverse@ts2.8", "@types/babel-types@ts2.8", "@types/babylon@ts2.8", "@types/base64-js@ts2.8", "@types/basic-auth@ts2.8", "@types/big.js@ts2.8", "@types/bl@ts2.8", "@types/bluebird@ts2.8", "@types/body-parser@ts2.8", "@types/bonjour@ts2.8", "@types/boom@ts2.8", "@types/brace-expansion@ts2.8", "@types/braces@ts2.8", "@types/brorand@ts2.8", "@types/browser-resolve@ts2.8", "@types/bson@ts2.8", "@types/buffer-equal@ts2.8", "@types/builtin-modules@ts2.8", "@types/bytes@ts2.8", "@types/callsites@ts2.8", "@types/camelcase@ts2.8", "@types/camelcase-keys@ts2.8", "@types/caseless@ts2.8", "@types/change-emitter@ts2.8", "@types/check-types@ts2.8", "@types/cheerio@ts2.8", "@types/chokidar@ts2.8", "@types/chownr@ts2.8", "@types/circular-json@ts2.8", "@types/classnames@ts2.8", "@types/clean-css@ts2.8", "@types/clone@ts2.8", "@types/co-body@ts2.8", "@types/color@ts2.8", "@types/color-convert@ts2.8", "@types/color-name@ts2.8", "@types/color-string@ts2.8", "@types/colors@ts2.8", "@types/combined-stream@ts2.8", "@types/common-tags@ts2.8", "@types/component-emitter@ts2.8", "@types/compressible@ts2.8", "@types/compression@ts2.8", "@types/concat-stream@ts2.8", "@types/connect-history-api-fallback@ts2.8", "@types/content-disposition@ts2.8", "@types/content-type@ts2.8", "@types/convert-source-map@ts2.8", "@types/cookie@ts2.8", "@types/cookie-signature@ts2.8", "@types/cookies@ts2.8", "@types/core-js@ts2.8", "@types/cosmiconfig@ts2.8", "@types/create-react-class@ts2.8", "@types/cross-spawn@ts2.8", "@types/cryptiles@ts2.8", "@types/css-modules-require-hook@ts2.8", "@types/dargs@ts2.8", "@types/dateformat@ts2.8", "@types/debug@ts2.8", "@types/decamelize@ts2.8", "@types/decompress@ts2.8", "@types/decompress-response@ts2.8", "@types/deep-equal@ts2.8", "@types/deep-extend@ts2.8", "@types/deepmerge@ts2.8", "@types/defined@ts2.8", "@types/del@ts2.8", "@types/depd@ts2.8", "@types/destroy@ts2.8", "@types/detect-indent@ts2.8", "@types/detect-newline@ts2.8", "@types/diff@ts2.8", "@types/doctrine@ts2.8", "@types/download@ts2.8", "@types/draft-js@ts2.8", "@types/duplexer2@ts2.8", "@types/duplexer3@ts2.8", "@types/duplexify@ts2.8", "@types/ejs@ts2.8", "@types/end-of-stream@ts2.8", "@types/entities@ts2.8", "@types/escape-html@ts2.8", "@types/escape-string-regexp@ts2.8", "@types/escodegen@ts2.8", "@types/eslint-scope@ts2.8", "@types/eslint-visitor-keys@ts2.8", "@types/esprima@ts2.8", "@types/estraverse@ts2.8", "@types/etag@ts2.8", "@types/events@ts2.8", "@types/execa@ts2.8", "@types/exenv@ts2.8", "@types/exit@ts2.8", "@types/exit-hook@ts2.8", "@types/expect@ts2.8", "@types/express@ts2.8", "@types/express-graphql@ts2.8", "@types/extend@ts2.8", "@types/extract-zip@ts2.8", "@types/fancy-log@ts2.8", "@types/fast-diff@ts2.8", "@types/fast-levenshtein@ts2.8", "@types/figures@ts2.8", "@types/file-type@ts2.8", "@types/filenamify@ts2.8", "@types/filesize@ts2.8", "@types/finalhandler@ts2.8", "@types/find-root@ts2.8", "@types/find-up@ts2.8", "@types/findup-sync@ts2.8", "@types/forever-agent@ts2.8", "@types/form-data@ts2.8", "@types/forwarded@ts2.8", "@types/fresh@ts2.8", "@types/from2@ts2.8", "@types/fs-extra@ts2.8", "@types/get-caller-file@ts2.8", "@types/get-stdin@ts2.8", "@types/get-stream@ts2.8", "@types/get-value@ts2.8", "@types/glob-base@ts2.8", "@types/glob-parent@ts2.8", "@types/glob-stream@ts2.8", "@types/globby@ts2.8", "@types/globule@ts2.8", "@types/got@ts2.8", "@types/graceful-fs@ts2.8", "@types/gulp-rename@ts2.8", "@types/gulp-sourcemaps@ts2.8", "@types/gulp-util@ts2.8", "@types/gzip-size@ts2.8", "@types/handlebars@ts2.8", "@types/has-ansi@ts2.8", "@types/hasha@ts2.8", "@types/he@ts2.8", "@types/hoek@ts2.8", "@types/html-entities@ts2.8", "@types/html-minifier@ts2.8", "@types/htmlparser2@ts2.8", "@types/http-assert@ts2.8", "@types/http-errors@ts2.8", "@types/http-proxy@ts2.8", "@types/http-proxy-middleware@ts2.8", "@types/indent-string@ts2.8", "@types/inflected@ts2.8", "@types/inherits@ts2.8", "@types/ini@ts2.8", "@types/inline-style-prefixer@ts2.8", "@types/inquirer@ts2.8", "@types/internal-ip@ts2.8", "@types/into-stream@ts2.8", "@types/invariant@ts2.8", "@types/ip@ts2.8", "@types/ip-regex@ts2.8", "@types/is-absolute-url@ts2.8", "@types/is-binary-path@ts2.8", "@types/is-finite@ts2.8", "@types/is-glob@ts2.8", "@types/is-my-json-valid@ts2.8", "@types/is-number@ts2.8", "@types/is-object@ts2.8", "@types/is-path-cwd@ts2.8", "@types/is-path-in-cwd@ts2.8", "@types/is-promise@ts2.8", "@types/is-scoped@ts2.8", "@types/is-stream@ts2.8", "@types/is-svg@ts2.8", "@types/is-url@ts2.8", "@types/is-windows@ts2.8", "@types/istanbul-lib-coverage@ts2.8", "@types/istanbul-lib-hook@ts2.8", "@types/istanbul-lib-instrument@ts2.8", "@types/istanbul-lib-report@ts2.8", "@types/istanbul-lib-source-maps@ts2.8", "@types/istanbul-reports@ts2.8", "@types/jest-diff@ts2.8", "@types/jest-docblock@ts2.8", "@types/jest-get-type@ts2.8", "@types/jest-matcher-utils@ts2.8", "@types/jest-validate@ts2.8", "@types/jpeg-js@ts2.8", "@types/js-base64@ts2.8", "@types/js-string-escape@ts2.8", "@types/js-yaml@ts2.8", "@types/jsbn@ts2.8", "@types/jsdom@ts2.8", "@types/jsesc@ts2.8", "@types/json-parse-better-errors@ts2.8", "@types/json-schema@ts2.8", "@types/json-stable-stringify@ts2.8", "@types/json-stringify-safe@ts2.8", "@types/json5@ts2.8", "@types/jsonfile@ts2.8", "@types/jsontoxml@ts2.8", "@types/jss@ts2.8", "@types/keygrip@ts2.8", "@types/keymirror@ts2.8", "@types/keyv@ts2.8", "@types/klaw@ts2.8", "@types/koa-send@ts2.8", "@types/leven@ts2.8", "@types/listr@ts2.8", "@types/load-json-file@ts2.8", "@types/loader-runner@ts2.8", "@types/loader-utils@ts2.8", "@types/locate-path@ts2.8", "@types/lodash-es@ts2.8", "@types/lodash.assign@ts2.8", "@types/lodash.camelcase@ts2.8", "@types/lodash.clonedeep@ts2.8", "@types/lodash.debounce@ts2.8", "@types/lodash.escape@ts2.8", "@types/lodash.flowright@ts2.8", "@types/lodash.get@ts2.8", "@types/lodash.isarguments@ts2.8", "@types/lodash.isarray@ts2.8", "@types/lodash.isequal@ts2.8", "@types/lodash.isobject@ts2.8", "@types/lodash.isstring@ts2.8", "@types/lodash.keys@ts2.8", "@types/lodash.memoize@ts2.8", "@types/lodash.merge@ts2.8", "@types/lodash.mergewith@ts2.8", "@types/lodash.pick@ts2.8", "@types/lodash.sortby@ts2.8", "@types/lodash.tail@ts2.8", "@types/lodash.template@ts2.8", "@types/lodash.throttle@ts2.8", "@types/lodash.unescape@ts2.8", "@types/lodash.uniq@ts2.8", "@types/log-symbols@ts2.8", "@types/log-update@ts2.8", "@types/loglevel@ts2.8", "@types/loud-rejection@ts2.8", "@types/lru-cache@ts2.8", "@types/make-dir@ts2.8", "@types/map-obj@ts2.8", "@types/media-typer@ts2.8", "@types/mem@ts2.8", "@types/mem-fs@ts2.8", "@types/memory-fs@ts2.8", "@types/meow@ts2.8", "@types/merge-descriptors@ts2.8", "@types/merge-stream@ts2.8", "@types/methods@ts2.8", "@types/micromatch@ts2.8", "@types/mime@ts2.8", "@types/mime-db@ts2.8", "@types/mime-types@ts2.8", "@types/minimatch@ts2.8", "@types/minimist@ts2.8", "@types/minipass@ts2.8", "@types/mkdirp@ts2.8", "@types/mongodb@ts2.8", "@types/morgan@ts2.8", "@types/move-concurrently@ts2.8", "@types/ms@ts2.8", "@types/msgpack-lite@ts2.8", "@types/multimatch@ts2.8", "@types/mz@ts2.8", "@types/negotiator@ts2.8", "@types/node-dir@ts2.8", "@types/node-fetch@ts2.8", "@types/node-forge@ts2.8", "@types/node-int64@ts2.8", "@types/node-ipc@ts2.8", "@types/node-notifier@ts2.8", "@types/nomnom@ts2.8", "@types/nopt@ts2.8", "@types/normalize-package-data@ts2.8", "@types/normalize-url@ts2.8", "@types/number-is-nan@ts2.8", "@types/object-assign@ts2.8", "@types/on-finished@ts2.8", "@types/on-headers@ts2.8", "@types/once@ts2.8", "@types/onetime@ts2.8", "@types/opener@ts2.8", "@types/opn@ts2.8", "@types/optimist@ts2.8", "@types/ora@ts2.8", "@types/os-homedir@ts2.8", "@types/os-locale@ts2.8", "@types/os-tmpdir@ts2.8", "@types/p-cancelable@ts2.8", "@types/p-each-series@ts2.8", "@types/p-event@ts2.8", "@types/p-lazy@ts2.8", "@types/p-limit@ts2.8", "@types/p-locate@ts2.8", "@types/p-map@ts2.8", "@types/p-map-series@ts2.8", "@types/p-reduce@ts2.8", "@types/p-timeout@ts2.8", "@types/p-try@ts2.8", "@types/pako@ts2.8", "@types/parse-glob@ts2.8", "@types/parse-json@ts2.8", "@types/parseurl@ts2.8", "@types/path-exists@ts2.8", "@types/path-is-absolute@ts2.8", "@types/path-parse@ts2.8", "@types/pg-pool@ts2.8", "@types/pg-types@ts2.8", "@types/pify@ts2.8", "@types/pixelmatch@ts2.8", "@types/pkg-dir@ts2.8", "@types/pluralize@ts2.8", "@types/pngjs@ts2.8", "@types/prelude-ls@ts2.8", "@types/pretty-bytes@ts2.8", "@types/pretty-format@ts2.8", "@types/progress@ts2.8", "@types/promise-retry@ts2.8", "@types/proxy-addr@ts2.8", "@types/pump@ts2.8", "@types/q@ts2.8", "@types/qs@ts2.8", "@types/range-parser@ts2.8", "@types/rc@ts2.8", "@types/rc-select@ts2.8", "@types/rc-slider@ts2.8", "@types/rc-tooltip@ts2.8", "@types/rc-tree@ts2.8", "@types/react-event-listener@ts2.8", "@types/react-side-effect@ts2.8", "@types/react-slick@ts2.8", "@types/read-chunk@ts2.8", "@types/read-pkg@ts2.8", "@types/read-pkg-up@ts2.8", "@types/recompose@ts2.8", "@types/recursive-readdir@ts2.8", "@types/relateurl@ts2.8", "@types/replace-ext@ts2.8", "@types/request@ts2.8", "@types/request-promise-native@ts2.8", "@types/require-directory@ts2.8", "@types/require-from-string@ts2.8", "@types/require-relative@ts2.8", "@types/resolve@ts2.8", "@types/resolve-from@ts2.8", "@types/retry@ts2.8", "@types/rx@ts2.8", "@types/rx-lite@ts2.8", "@types/rx-lite-aggregates@ts2.8", "@types/safe-regex@ts2.8", "@types/sane@ts2.8", "@types/sass-graph@ts2.8", "@types/sax@ts2.8", "@types/scriptjs@ts2.8", "@types/semver@ts2.8", "@types/send@ts2.8", "@types/serialize-javascript@ts2.8", "@types/serve-index@ts2.8", "@types/serve-static@ts2.8", "@types/set-value@ts2.8", "@types/shallowequal@ts2.8", "@types/shelljs@ts2.8", "@types/sockjs@ts2.8", "@types/sockjs-client@ts2.8", "@types/source-list-map@ts2.8", "@types/source-map-support@ts2.8", "@types/spdx-correct@ts2.8", "@types/spdy@ts2.8", "@types/split@ts2.8", "@types/sprintf@ts2.8", "@types/sprintf-js@ts2.8", "@types/sqlstring@ts2.8", "@types/sshpk@ts2.8", "@types/stack-utils@ts2.8", "@types/stat-mode@ts2.8", "@types/statuses@ts2.8", "@types/strict-uri-encode@ts2.8", "@types/string-template@ts2.8", "@types/strip-ansi@ts2.8", "@types/strip-bom@ts2.8", "@types/strip-json-comments@ts2.8", "@types/supports-color@ts2.8", "@types/svg2png@ts2.8", "@types/svgo@ts2.8", "@types/table@ts2.8", "@types/tapable@ts2.8", "@types/tar@ts2.8", "@types/temp@ts2.8", "@types/tempfile@ts2.8", "@types/through@ts2.8", "@types/through2@ts2.8", "@types/tinycolor2@ts2.8", "@types/tmp@ts2.8", "@types/to-absolute-glob@ts2.8", "@types/tough-cookie@ts2.8", "@types/trim@ts2.8", "@types/tryer@ts2.8", "@types/type-check@ts2.8", "@types/type-is@ts2.8", "@types/ua-parser-js@ts2.8", "@types/uglify-js@ts2.8", "@types/uglifyjs-webpack-plugin@ts2.8", "@types/underscore@ts2.8", "@types/uniq@ts2.8", "@types/uniqid@ts2.8", "@types/untildify@ts2.8", "@types/urijs@ts2.8", "@types/url-join@ts2.8", "@types/url-parse@ts2.8", "@types/url-regex@ts2.8", "@types/user-home@ts2.8", "@types/util-deprecate@ts2.8", "@types/util.promisify@ts2.8", "@types/utils-merge@ts2.8", "@types/uuid@ts2.8", "@types/vali-date@ts2.8", "@types/vary@ts2.8", "@types/verror@ts2.8", "@types/vinyl@ts2.8", "@types/vinyl-fs@ts2.8", "@types/warning@ts2.8", "@types/watch@ts2.8", "@types/watchpack@ts2.8", "@types/webpack-dev-middleware@ts2.8", "@types/webpack-sources@ts2.8", "@types/which@ts2.8", "@types/window-size@ts2.8", "@types/wrap-ansi@ts2.8", "@types/write-file-atomic@ts2.8", "@types/ws@ts2.8", "@types/xml2js@ts2.8", "@types/xmlbuilder@ts2.8", "@types/xtend@ts2.8", "@types/yallist@ts2.8", "@types/yargs@ts2.8", "@types/yauzl@ts2.8", "@types/yeoman-generator@ts2.8", "@types/zen-observable@ts2.8", "@types/react-content-loader@ts2.8"];
    const expectedCommands = [
        ts.projectSystem.TI.getNpmCommandForInstallation(npmPath, tsVersion, packageNames, packageNames.length).command,
        ts.projectSystem.TI.getNpmCommandForInstallation(npmPath, tsVersion, packageNames, packageNames.length - Math.ceil(packageNames.length / 2)).command
    ];
    it("works when the command is too long to install all packages at once", () => {
        const commands: string[] = [];
        const hasError = ts.projectSystem.TI.installNpmPackages(npmPath, tsVersion, packageNames, command => {
            commands.push(command);
            return false;
        });
        assert.isFalse(hasError);
        assert.deepEqual(commands, expectedCommands, "commands");
    });

    it("installs remaining packages when one of the partial command fails", () => {
        const commands: string[] = [];
        const hasError = ts.projectSystem.TI.installNpmPackages(npmPath, tsVersion, packageNames, command => {
            commands.push(command);
            return commands.length === 1;
        });
        assert.isTrue(hasError);
        assert.deepEqual(commands, expectedCommands, "commands");
    });
});

describe("unittests:: tsserver:: typingsInstaller:: recomputing resolutions of unresolved imports", () => {
    const globalTypingsCacheLocation = "/tmp";
    const appPath = "/a/b/app.js" as ts.Path;
    const foooPath = "/a/b/node_modules/fooo/index.d.ts";
    function verifyResolvedModuleOfFooo(project: ts.server.Project) {
        ts.server.updateProjectIfDirty(project);
        const foooResolution = project.getLanguageService().getProgram()!.getSourceFileByPath(appPath)!.resolvedModules!.get("fooo", /*mode*/ undefined)!;
        assert.equal(foooResolution.resolvedFileName, foooPath);
        return foooResolution;
    }

    function verifyUnresolvedImportResolutions(appContents: string, typingNames: string[], typingFiles: ts.projectSystem.File[]) {
        const app: ts.projectSystem.File = {
            path: appPath,
            content: `${appContents}import * as x from "fooo";`
        };
        const fooo: ts.projectSystem.File = {
            path: foooPath,
            content: `export var x: string;`
        };

        const host = ts.projectSystem.createServerHost([app, fooo]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation, typesRegistry: ts.projectSystem.createTypesRegistry("foo") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                executeCommand(this, host, typingNames, typingFiles, cb);
            }
        })();
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openClientFile(app.path);
        projectService.checkNumberOfProjects({ inferredProjects: 1 });

        const proj = projectService.inferredProjects[0];
        ts.projectSystem.checkProjectActualFiles(proj, [app.path, fooo.path]);
        const foooResolution1 = verifyResolvedModuleOfFooo(proj);

        installer.installAll(/*expectedCount*/ 1);
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkProjectActualFiles(proj, typingFiles.map(f => f.path).concat(app.path, fooo.path));
        const foooResolution2 = verifyResolvedModuleOfFooo(proj);
        assert.strictEqual(foooResolution1, foooResolution2);
        projectService.applyChangesInOpenFiles(/*openFiles*/ undefined, ts.arrayIterator([{
            fileName: app.path,
            changes: ts.arrayIterator([{
                span: { start: 0, length: 0 },
                newText: `import * as bar from "bar";`
            }])
        }]));
        host.runQueuedTimeoutCallbacks(); // Update the graph
        // Update the typing
        host.checkTimeoutQueueLength(0);
        assert.isFalse(proj.resolutionCache.isFileWithInvalidatedNonRelativeUnresolvedImports(app.path as ts.Path));
    }

    it("correctly invalidate the resolutions with typing names", () => {
        verifyUnresolvedImportResolutions('import * as a from "foo";', ["foo"], [{
            path: `${globalTypingsCacheLocation}/node_modules/foo/index.d.ts`,
            content: "export function a(): void;"
        }]);
    });

    it("correctly invalidate the resolutions with typing names that are trimmed", () => {
        const fooIndex: ts.projectSystem.File = {
            path: `${globalTypingsCacheLocation}/node_modules/foo/index.d.ts`,
            content: "export function aa(): void;"
        };
        const fooAA: ts.projectSystem.File = {
            path: `${globalTypingsCacheLocation}/node_modules/foo/a/a.d.ts`,
            content: "export function a (): void;"
        };
        const fooAB: ts.projectSystem.File = {
            path: `${globalTypingsCacheLocation}/node_modules/foo/a/b.d.ts`,
            content: "export function b (): void;"
        };
        const fooAC: ts.projectSystem.File = {
            path: `${globalTypingsCacheLocation}/node_modules/foo/a/c.d.ts`,
            content: "export function c (): void;"
        };
        verifyUnresolvedImportResolutions(`
                    import * as a from "foo/a/a";
                    import * as b from "foo/a/b";
                    import * as c from "foo/a/c";
            `, ["foo"], [fooIndex, fooAA, fooAB, fooAC]);
    });

    it("should handle node core modules", () => {
        const file: ts.TestFSWithWatch.File = {
            path: "/a/b/app.js",
            content: `// @ts-check

const net = require("net");
const stream = require("stream");`
        };
        const nodeTyping: ts.TestFSWithWatch.File = {
            path: `${globalTypingsCacheLocation}/node_modules/node/index.d.ts`,
            content: `
declare module "net" {
    export type n = number;
}
declare module "stream" {
    export type s = string;
}`,
        };

        const host = ts.projectSystem.createServerHost([file, ts.projectSystem.libFile]);
        const installer = new (class extends Installer {
            constructor() {
                super(host, { globalTypingsCacheLocation, typesRegistry: ts.projectSystem.createTypesRegistry("node") });
            }
            installWorker(_requestId: number, _args: string[], _cwd: string, cb: ts.projectSystem.TI.RequestCompletedAction) {
                executeCommand(this, host, ["node"], [nodeTyping], cb);
            }
        })();
        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller: installer });
        projectService.openClientFile(file.path);
        projectService.checkNumberOfProjects({ inferredProjects: 1 });

        const proj = projectService.inferredProjects[0];
        ts.projectSystem.checkProjectActualFiles(proj, [file.path, ts.projectSystem.libFile.path]);
        installer.installAll(/*expectedCount*/ 1);
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkProjectActualFiles(proj, [file.path, ts.projectSystem.libFile.path, nodeTyping.path]);
        projectService.applyChangesInOpenFiles(
            /*openFiles*/ undefined,
            ts.arrayIterator([{
                fileName: file.path,
                changes: ts.arrayIterator([{
                    span: {
                        start: file.content.indexOf(`"stream"`) + 2,
                        length: 0
                    },
                    newText: " "
                }])
            }]),
            /*closedFiles*/ undefined
        );
        // Below timeout Updates the typings to empty array because of "s tream" as unsresolved import
        // and schedules the update graph because of this.
        host.checkTimeoutQueueLengthAndRun(2);
        ts.projectSystem.checkProjectActualFiles(proj, [file.path, ts.projectSystem.libFile.path, nodeTyping.path]);

        // Here, since typings dont change, there is no timeout scheduled
        host.checkTimeoutQueueLength(0);
        ts.projectSystem.checkProjectActualFiles(proj, [file.path, ts.projectSystem.libFile.path, nodeTyping.path]);
        projectService.applyChangesInOpenFiles(/*openFiles*/ undefined, ts.arrayIterator([{
            fileName: file.path,
            changes: ts.arrayIterator([{
                span: { start: file.content.indexOf("const"), length: 0 },
                newText: `const bar = require("bar");`
            }])
        }]));
        proj.updateGraph(); // Update the graph
        ts.projectSystem.checkProjectActualFiles(proj, [file.path, ts.projectSystem.libFile.path, nodeTyping.path]);
        // Update the typing
        host.checkTimeoutQueueLength(0);
        assert.isFalse(proj.resolutionCache.isFileWithInvalidatedNonRelativeUnresolvedImports(file.path as ts.Path));
    });
});

describe("unittests:: tsserver:: typingsInstaller:: tsserver:: with inferred Project", () => {
    it("when projectRootPath is provided", () => {
        const projects = "/users/username/projects";
        const projectRootPath = `${projects}/san2`;
        const file: ts.projectSystem.File = {
            path: `${projectRootPath}/x.js`,
            content: "const aaaaaaav = 1;"
        };

        const currentDirectory = `${projects}/anotherProject`;
        const packageJsonInCurrentDirectory: ts.projectSystem.File = {
            path: `${currentDirectory}/package.json`,
            content: JSON.stringify({
                devDependencies: {
                    pkgcurrentdirectory: ""
                },
            })
        };
        const packageJsonOfPkgcurrentdirectory: ts.projectSystem.File = {
            path: `${currentDirectory}/node_modules/pkgcurrentdirectory/package.json`,
            content: JSON.stringify({
                name: "pkgcurrentdirectory",
                main: "index.js",
                typings: "index.d.ts"
            })
        };
        const indexOfPkgcurrentdirectory: ts.projectSystem.File = {
            path: `${currentDirectory}/node_modules/pkgcurrentdirectory/index.d.ts`,
            content: "export function foo() { }"
        };

        const typingsCache = `/users/username/Library/Caches/typescript/2.7`;
        const typingsCachePackageJson: ts.projectSystem.File = {
            path: `${typingsCache}/package.json`,
            content: JSON.stringify({
                devDependencies: {
                },
            })
        };
        const typingsCachePackageLockJson: ts.projectSystem.File = {
            path: `${typingsCache}/package-lock.json`,
            content: JSON.stringify({
                dependencies: {
                },
            })
        };

        const files = [file, packageJsonInCurrentDirectory, packageJsonOfPkgcurrentdirectory, indexOfPkgcurrentdirectory, typingsCachePackageJson, typingsCachePackageLockJson];
        const host = ts.projectSystem.createServerHost(files, { currentDirectory });

        const typesRegistry = ts.projectSystem.createTypesRegistry("pkgcurrentdirectory");
        const typingsInstaller = new ts.projectSystem.TestTypingsInstaller(typingsCache, /*throttleLimit*/ 5, host, typesRegistry);

        const projectService = ts.projectSystem.createProjectService(host, { typingsInstaller });

        projectService.setCompilerOptionsForInferredProjects({
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2016,
            jsx: ts.JsxEmit.Preserve,
            experimentalDecorators: true,
            allowJs: true,
            allowSyntheticDefaultImports: true,
            allowNonTsExtensions: true
        });

        projectService.openClientFile(file.path, file.content, ts.ScriptKind.JS, projectRootPath);

        const project = projectService.inferredProjects[0];
        assert.isDefined(project);

        // Ensure that we use result from types cache when getting ls
        assert.isDefined(project.getLanguageService());

        // Verify that the pkgcurrentdirectory from the current directory isnt picked up
        ts.projectSystem.checkProjectActualFiles(project, [file.path]);
    });
});
