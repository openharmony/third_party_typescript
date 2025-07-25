//// [tests/cases/compiler/isolatedDeclarationsRequiresDeclaration.ts] ////

//// [file1.ts]
export var x = 1;
//// [file2.ts]
export var y = 1;

//// [file1.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 1;
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
exports.y = 1;
