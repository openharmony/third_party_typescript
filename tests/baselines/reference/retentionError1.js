//// [tests/cases/conformance/annotations/retentionError1.ets] ////

//// [@arkts.lang.d.ets]
export const enum RetentionPolicy {
    SOURCE='source',
    BYTECODE='bytecode'
}

export @interface Retention {
    policy: RetentionPolicy
}

//// [A.ets]
import { RetentionPolicy, Retention } from "./@arkts.lang"

@Retention({policy: RetentionPolicy.SOURCE})
class A {}

@Retention
@interface Anno1 {}

@Retention({policy: RetentionPolicy.SOURCE})
@interface Anno2 {
    value: number
}

let a = 1;

@Anno1({value: 1})
a = 2;

@Retention({policy: RetentionPolicy.BYTECODE})
@interface Anno3 {
    value: number
}

@Anno3({value: 2})
let b = 2;



//// [A.js]
"use strict";
exports.__esModule = true;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var a = 1;
a = 2;
var b = 2;
