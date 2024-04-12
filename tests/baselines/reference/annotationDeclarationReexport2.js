//// [tests/cases/conformance/annotations/annotationDeclarationReexport2.ets] ////

//// [A.ets]
export @interface Anno {
    a: number = 10
}

//// [B.ets]
export * as AA from "./A";


//// [C.ets]
import {AA} from "./B";

@AA.Anno
class C{}

//// [A.js]
"use strict";
//// [B.js]
"use strict";
exports.__esModule = true;
exports.AA = void 0;
exports.AA = require("./A");
//// [C.js]
"use strict";
exports.__esModule = true;
var B_1 = require("./B");
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
