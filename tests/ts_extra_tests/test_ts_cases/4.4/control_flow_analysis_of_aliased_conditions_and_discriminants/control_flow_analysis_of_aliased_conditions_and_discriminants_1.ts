/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**---
 description: >
   When TypeScript sees that we are testing a constant value, it will do a little bit of extra work to see if it contains a type guard.
   If that type guard operates on a const, a readonly property, or an un-modified parameter,
   then TypeScript is able to narrow that value appropriately.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function fun01(a: unknown) {
    if (typeof a === "string") {
        Assert.equal(a[0], "c");
    }
    if (typeof a === "number") {
        Assert.equal(a, 11);
    }
    if (typeof a === "boolean") {
        Assert.equal(a, true);
    }
    if (typeof a === "undefined") {
        Assert.isUndefined(a);
    }
    if (typeof a === "function") {
        Assert.isFunction(a);
    }
    if (typeof a === "object") {
        Assert.isObject(a);
    }
    if (typeof a === "symbol") {
        Assert.isSymbol(a);
    }
}
fun01("c");
fun01(11);
fun01(true);
let x: undefined;
fun01(x);
let f = (a: number) => { a = 0; return a; };
fun01(f);
let obj: object = {
    x: 1
}
fun01(obj);
let sym: symbol = Symbol('a');
fun01(sym);
interface I {
    readonly name: "caihua";
}
function fun02() {
    let tt: I = { name: "caihua" };
    let res = tt.name === "caihua";
    if (res) {
        Assert.isNumber(tt.name.length);
        Assert.equal(tt.name[0], "c");
    }
}
fun02();
function fun03(a: number, b = "function" as const) {
    let cc = typeof b === "function";
    if (cc) {
        Assert.isNumber(b.length);
        Assert.equal(b[0], "f");
        Assert.equal(cc, true);
    } else {
        Assert.equal(cc, false);
    }
}
fun03(12);