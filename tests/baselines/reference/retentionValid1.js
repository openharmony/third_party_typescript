//// [tests/cases/conformance/annotations/retentionValid1.ets] ////

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
@interface Anno1 {
    value: number
}

@Anno1({value: 1})
let a = 1;

@Anno1({value: 2})
function foo() {}

@Anno1({value: 3})
class A {}

@Retention({policy: RetentionPolicy.BYTECODE})
@interface Anno2 {
    value: number
}

@Anno2({value: 4})
class B {}


//// [A.js]
"use strict";
exports.__esModule = true;
var a = 1;
@Anno1({ value: 2 })
function foo() { }
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
