import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: condition check", () => {
    it("works condition check", () => {
        const aUser: ts.projectSystem.File = {
            path: "/a.ts",
            content: `import { y } from "./b";
    if(canIUse("SystemCapability.ArkUI.Core")) {
        y.test()
        y.test2
    }
    y.test()
    y.test2
}`
        };
        const bUser: ts.projectSystem.File = {
            path: "/b.ts",
            content: `
/**
 * @sysCap SystemCapability.ArkUI.Core1
 */
interface InfoType {

}

export class y {
/**
 * @sysCap SystemCapability.ArkUI.Core
 */
static test(): void {

}
/**
 * @sysCap SystemCapability.ArkUI.Core
 */
static test2: InfoType; 
}`
        };
        const cUser: ts.projectSystem.File = {
            path: "/c.d.ts",
            content: `declare function canIUse(key: string): boolean;`
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

        const projectFiles = [aUser, bUser, cUser, tsconfigFile];
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
                    tagName: ["sysCap"],
                    message: "The statement must be written use the function 'canIUse' under the if condition.",
                    needConditionCheck: true,
                    specifyCheckConditionFuncName: "canIUse",
                    type: ts.DiagnosticCategory.Warning,
                    tagNameShouldExisted: false,
                }]
            };
        };
        host.getJsDocNodeConditionCheckedResult = (jsDocFileCheckedInfo: ts.FileCheckModuleInfo, jsDocs: ts.JsDocTagInfo[]) => {
            ts.Debug.log(jsDocFileCheckedInfo.fileNeedCheck.toString());
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
        assert.deepEqual(response[0].messageText, "The statement must be written use the function 'canIUse' under the if condition.");
    });
});