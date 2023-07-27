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
    typescript 3.0 introduces a new top type unknown. unknown is the type-safe counterpart of any. 
    anything is assignable to unknown, but unknown isn't assignable to anything but itself and any without a type assertion or a control flow based narrowing. 
    likewise, no operations are permitted on an unknown without first asserting or narrowing to a more specific type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type T1 = unknown & undefined;
let t1: T1 = undefined;
Assert.isUndefined(t1);
type T2 = unknown & string;
let t2: T2 = 'a';
Assert.isString(t2);
type T3 = unknown | undefined;
let t3: T3 = undefined;
Assert.isUndefined(t3);
type T4 = unknown | null | undefined;
let t4: T4 = null;
t4 = undefined;
Assert.isUndefined(t4);
type T5 = unknown | string;
let t5: T5 = 'a';
Assert.isString(t5);
type T6<T> = T & {};
let t6: T6<object> = { arg: 'arg' };
Assert.isObject(t6);
type T7<T> = T | {};
let t7: T7<number> = 10;
t7 = {};
Assert.isObject(t7);
type T8<T> = T & unknown;
let t8: T8<number> = 10;
Assert.isNumber(t8);
type T9<T> = T | unknown;
let t9: T9<number> = 10;
Assert.isNumber(t9);
type T10<T> = unknown extends T ? true : false;
let t10: T10<string> = false;
Assert.isFalse(t10);
type T11<T> = T extends unknown ? true : false;
let t11: T11<string> = true;
Assert.isTrue(t11);
type T12<T> = never extends T ? true : false;
let t12: T12<number> = true;
Assert.isTrue(t12);
type T13<T> = T extends never ? true : false;
let t13: T13<string> = false;
Assert.isFalse(t13);
function func1(x: unknown): unknown {
    x = 10;
    return x;
}
Assert.equal(func1(0), 10);
function func2(x: unknown) {
    return typeof x;
}
Assert.equal(func2("N"), "string");
function func3(x: unknown) {
    if (x instanceof Error) {
        return 0;
    }
    return false;
}
let e: Error = Error();
Assert.isNumber(func3(e));
type T14<T> = { [P in keyof T]: number };
type T15 = T14<any>;
type T16 = T14<unknown>;
let t15: T15 = {};
Assert.isObject(t15);
let t16: T16 = {};
Assert.isObject(t16);
function func4<T>(pAny: any, pundefined: undefined, pT: T) {
    let x: unknown;
    x = 123;
    Assert.isNumber(x);
    x = "hello";
    Assert.isString(x);
    x = [1, 2, 3];
    x = new Error();
    x = x;
    x = pAny;
    x = pundefined;
    x = pT;
}
func4(1024, undefined, "A");
function fun5(x: unknown) {
    let v: unknown = x;
    return v;
}
Assert.equal(fun5(1024), 1024);
function fun6() {
    let a: unknown;
    let b = a;
    b = 2;
    return b;
}
Assert.equal(fun6(), 2);