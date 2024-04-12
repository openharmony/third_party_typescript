//// [tests/cases/conformance/annotations/annotationApplication9.ets] ////

//// [A.ets]
export @interface Anno {
    a: number = 10
}

//// [B.ets]
import * as AA from "./A";

@AA.Anno({a: 20})
class C {}

//// [A.js]
"use strict";
//// [B.js]
"use strict";
exports.__esModule = true;
var AA = require("./A");
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
