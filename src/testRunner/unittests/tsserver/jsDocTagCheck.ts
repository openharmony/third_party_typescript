namespace ts.projectSystem {
    describe("unittests:: tsserver:: jsDoc tag check", () => {
        it("works jsDoc tag check", () => {
            const aUser: File = {
                path: "/a.ts",
                content: `import { y } from "./b";
    y.test()
    y.test2()
`
            };
            const bUser: File = {
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

            const projectFiles = [aUser, bUser, tsconfigFile];
            const host = createServerHost(projectFiles);
            host.getTagNameNeededCheckByFile = (containFilePath: string, sourceFilePath: string) => {
                Debug.log(containFilePath);
                Debug.log(sourceFilePath);
                return {
                    needCheck: true,
                    checkConfig: [{
                        tagName: "ignore",
                        message: "This API has been ignored. exercise caution when using this API.",
                        needConditionCheck: false,
                        type: DiagnosticCategory.Warning,
                        specifyCheckConditionFuncName: "",
                        tagNameShouldExisted: false,
                    },{
                        tagName: "systemApi",
                        message: "This API is used to develop system apps. exercise caution when using this API.",
                        needConditionCheck: false,
                        type: DiagnosticCategory.Warning,
                        specifyCheckConditionFuncName: "",
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
            assert.deepEqual(response[0].messageText, "This API has been ignored. exercise caution when using this API.");
            assert.deepEqual(response[1].messageText, "This API is used to develop system apps. exercise caution when using this API.");
        });
    });
}