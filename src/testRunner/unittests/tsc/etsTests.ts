namespace ts {
  const fs: typeof import("fs") = require("fs");
  const path: typeof import("path") = require("path");
  const childProcess: typeof import("child_process") = require("child_process");

  const rootPath = path.resolve(__dirname);

  function tscEtsCompile() {
    const tsconfigPath = path.join(rootPath, "../../tests/dets/tsconfig.json");
    const tscpath = path.join(rootPath, "../../lib/tsc.js");

    const cmd = "node "+ tscpath + " -p " + tsconfigPath;

    childProcess.exec(cmd, {
      maxBuffer: 1 * 1024 * 1024,
      cwd: undefined
    }, (error, stdout, stderr) => {
        if (error) {
          console.log(cmd);
          console.log("==> error " + JSON.stringify(error));
          console.log("==> stdout " + String(stdout));
          console.log("==> stderr " + String(stderr));
          console.log("\r\n");
          return;
        }
    });
  }

  function getActualAndExpect(caseName: string) {
    const actualDeclarationPath = path.join(rootPath, "../../tests/dets/baselines/local", caseName);
    const expectedDeclarationPath = path.join(rootPath, "../../tests/dets/baselines/reference", caseName);

    const actualDeclaration = fs.readFileSync(actualDeclarationPath, "utf-8");
    const expectedDeclaration = fs.readFileSync(expectedDeclarationPath, "utf-8");
    return { actualDeclaration, expectedDeclaration };
  }
  describe("unittests:: tsc:: run ets tests::", () => {
      tscEtsCompile();

      it("customDecorator.ets", () => {
        const {actualDeclaration, expectedDeclaration} = getActualAndExpect("customDecorator.d.ets");
        expect(expectedDeclaration).to.be.equal(actualDeclaration);
      });

      it("decoratorWithParameters.ets", () => {
        const {actualDeclaration, expectedDeclaration} = getActualAndExpect("decoratorWithParameters.d.ets");
        expect(expectedDeclaration).to.be.equal(actualDeclaration);
      });

      it("dynamicallyBuildUIElements.ets", () => {
        const {actualDeclaration, expectedDeclaration} = getActualAndExpect("dynamicallyBuildUIElements.d.ets");
        expect(expectedDeclaration).to.be.equal(actualDeclaration);
      });

      it("functionAndClassWithDecorator.ets", () => {
        const {actualDeclaration, expectedDeclaration} = getActualAndExpect("functionAndClassWithDecorator.d.ets");
        expect(expectedDeclaration).to.be.equal(actualDeclaration);
      });

      it("functionWithDecorators.ets", () => {
        const {actualDeclaration, expectedDeclaration} = getActualAndExpect("functionWithDecorators.d.ets");
        expect(expectedDeclaration).to.be.equal(actualDeclaration);
      });

      it("limitationAndExtension.ets", () => {
        const {actualDeclaration, expectedDeclaration} = getActualAndExpect("limitationAndExtension.d.ets");
        expect(expectedDeclaration).to.be.equal(actualDeclaration);
      });

      it("renderControl.ets", () => {
        const {actualDeclaration, expectedDeclaration} = getActualAndExpect("renderControl.d.ets");
        expect(expectedDeclaration).to.be.equal(actualDeclaration);
      });

      it("statusManagementOfApplicationLevelVariables.ets", () => {
        const {actualDeclaration, expectedDeclaration} = getActualAndExpect("statusManagementOfApplicationLevelVariables.d.ets");
        expect(expectedDeclaration).to.be.equal(actualDeclaration);
      });

      it("statusManagementOfPageLevelVariables.ets", () => {
        const {actualDeclaration, expectedDeclaration} = getActualAndExpect("statusManagementOfPageLevelVariables.d.ets");
        expect(expectedDeclaration).to.be.equal(actualDeclaration);
      });

      it("targetEtsExample.ets", () => {
          const { actualDeclaration, expectedDeclaration } = getActualAndExpect("targetEtsExample.d.ets");
          expect(expectedDeclaration).to.be.equal(actualDeclaration);
      });
  });
}
