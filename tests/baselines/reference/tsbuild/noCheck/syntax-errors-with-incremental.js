Input::
//// [/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/src/a.ts]
const err: number = "error";
    const a = "hello

//// [/src/tsconfig.json]
{"compilerOptions":{"noCheck":true,"emitDeclarationOnly":true,"declaration":true}}



Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90m12:00:08 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:09 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/tsconfig.tsbuildinfo' does not exist

[[90m12:00:10 AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m2[0m:[93m21[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m2[0m     const a = "hello
[7m [0m [91m                    [0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/a.ts"]
Program options: {"noCheck":true,"emitDeclarationOnly":true,"declaration":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","signature":false,"affectsGlobalScope":true},{"version":"6198030691-const err: number = \"error\";\n    const a = \"hello","signature":false,"affectsGlobalScope":true}],"options":{"declaration":true,"emitDeclarationOnly":true,"noCheck":true},"referencedMap":[],"exportedModulesMap":[],"changeFileSet":[1,2]},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./a.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "6198030691-const err: number = \"error\";\n    const a = \"hello",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "noCheck": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "changeFileSet": [
      "../lib/lib.d.ts",
      "./a.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 852
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90m12:00:14 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:15 AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that some of the changes were not emitted

[[90m12:00:16 AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m2[0m:[93m21[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m2[0m     const a = "hello
[7m [0m [91m                    [0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/a.ts"]
Program options: {"noCheck":true,"emitDeclarationOnly":true,"declaration":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::




Change:: Fix `a` error
Input::
//// [/src/a.ts]
const err: number = "error";
    const a = "hello"



Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90m12:00:18 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:19 AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that some of the changes were not emitted

[[90m12:00:20 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: ["/src/a.ts"]
Program options: {"noCheck":true,"emitDeclarationOnly":true,"declaration":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts)


//// [/src/a.d.ts]
declare const err: number;
declare const a = "hello";


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"6966517221-const err: number = \"error\";\n    const a = \"hello\"","signature":"-5889627111-declare const err: number;\r\ndeclare const a = \"hello\";\r\n","affectsGlobalScope":true}],"options":{"declaration":true,"emitDeclarationOnly":true,"noCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./a.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "6966517221-const err: number = \"error\";\n    const a = \"hello\"",
        "signature": "-5889627111-declare const err: number;\r\ndeclare const a = \"hello\";\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "noCheck": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./a.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 920
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90m12:00:25 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:26 AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: Disable noCheck
Input::
//// [/src/tsconfig.json]
{"compilerOptions":{"emitDeclarationOnly":true,"declaration":true}}



Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90m12:00:28 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:29 AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/tsconfig.json'

[[90m12:00:30 AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const err: number = "error";
[7m [0m [91m      ~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/a.ts"]
Program options: {"emitDeclarationOnly":true,"declaration":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts

No shapes updated in the builder::




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v --incremental
[[90m12:00:31 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:32 AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/tsconfig.json'

[[90m12:00:33 AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const err: number = "error";
[7m [0m [91m      ~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: ["/src/a.ts"]
Program options: {"emitDeclarationOnly":true,"declaration":true,"incremental":true,"configFilePath":"/src/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts

No shapes updated in the builder::


