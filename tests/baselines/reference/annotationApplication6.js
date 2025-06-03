//// [tests/cases/conformance/annotations/annotationApplication6.ets] ////

//// [A.ets]
export @interface Anno {
    a: number = 10
}

//// [B.ets]
import {Anno} from "./A";

@Anno({a: 20})
class C {}

//// [A.js]
"use strict";
//// [B.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
