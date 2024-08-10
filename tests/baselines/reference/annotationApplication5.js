//// [tests/cases/conformance/annotations/annotationApplication5.ets] ////

//// [A.ets]
export @interface Anno {
    a: number = 10
}

//// [B.ets]
import {Anno} from "./A";

@Anno({})
class C {}

//// [A.js]
"use strict";
//// [B.js]
"use strict";
var A_1 = require("./A");
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
