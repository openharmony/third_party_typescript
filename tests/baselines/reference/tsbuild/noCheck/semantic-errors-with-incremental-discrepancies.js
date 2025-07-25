3:: Disable noCheck
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "6966517221-const err: number = \"error\";\n    const a = \"hello\"",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      [
        "./a.ts",
        [
          {
            "file": "./a.ts",
            "start": 6,
            "length": 3,
            "code": 2322,
            "category": 1,
            "messageText": "Type 'string' is not assignable to type 'number'."
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "6966517221-const err: number = \"error\";\n    const a = \"hello\"",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "noCheck": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./a.ts"
    ]
  },
  "version": "FakeTSVersion"
}
4:: no-change-run
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "6966517221-const err: number = \"error\";\n    const a = \"hello\"",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      [
        "./a.ts",
        [
          {
            "file": "./a.ts",
            "start": 6,
            "length": 3,
            "code": 2322,
            "category": 1,
            "messageText": "Type 'string' is not assignable to type 'number'."
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "6966517221-const err: number = \"error\";\n    const a = \"hello\"",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "noCheck": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./a.ts"
    ]
  },
  "version": "FakeTSVersion"
}