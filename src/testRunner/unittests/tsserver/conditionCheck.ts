namespace ts.projectSystem {
    describe("unittests:: tsserver:: condition check", () => {
        it("works condition check", () => {
            const aUser: File = {
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
            const bUser: File = {
                path: "/b.ts",
                content: `
export class y {
/**
 * @sysCap SystemCapability.ArkUI.Core
 */
static test(): void {

}
/**
 * @sysCap SystemCapability.ArkUI.Core
 */
static test2: number = 2;
}`
            };
            const cUser: File = {
                path: "/c.d.ts",
                content: `declare function canIUse(key: string): boolean;`
            };
            const tsconfigFile: File = {
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
            const host = createServerHost(projectFiles);
            host.getTagNameNeededCheckByFile = (containFilePath: string, sourceFilePath: string) => {
                Debug.log(containFilePath);
                Debug.log(sourceFilePath);
                return {
                    needCheck: true,
                    checkConfig: [{
                        tagName: "sysCap",
                        message: "The statement must be written use the function 'canIUse' under the if condition.",
                        needConditionCheck: true,
                        specifyCheckConditionFuncName: "canIUse",
                        type: DiagnosticCategory.Warning,
                        tagNameShouldExisted: false,
                    }]
                };
            };
            host.getExpressionCheckedResultsByFile = (filePath: string, jsDocs: JSDocTagInfo[]) => {
                Debug.log(filePath);
                Debug.log(jsDocs.toString());
                return {
                    valid: false,
                };
            };
            const session = createSession(host);
            const projectService = session.getProjectService();
            const { configFileName } = projectService.openClientFile(aUser.path);

            assert.isDefined(configFileName, `should find config`);

            const project = projectService.configuredProjects.get(tsconfigFile.path)!;
            const response = project.getLanguageService().getSuggestionDiagnostics(aUser.path);
            assert.deepEqual(response[0].messageText, "The statement must be written use the function 'canIUse' under the if condition.");
        });
    });
}
