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
    typescript 4.9 makes the in operator a little bit more powerful when narrowing types that don’t list the property at all.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type T1 = { num: number };
type T2 = { str: string };
function func(arg: T1 | T2) {
    if ("num" in arg && "str" in arg) {
        return "T1 | T2";
    } else if ("num" in arg) {
        return "T1";
    } else if ("str" in arg) {
        return "T2";
    }
}
let x: T1 = { num: 10 };
let y: T2 = { str: 'a' };
let z: T1 | T2 = { num: 10, str: 'a' };
Assert.equal(func(x), "T1");
Assert.equal(func(y), "T2");
Assert.equal(func(z), "T1 | T2");

interface I{
    mem: any;
}
function check(arg: I) {
    let mem = arg.mem;
    if (mem && typeof mem === "object") {
        if ("num" in mem && typeof mem.num === 'number') {
            return mem.num;
        }
    }
    return null;
}
let a: I = { mem: 10 };
let b: I = { mem: { num: 10 } };
Assert.isTrue(check(a) === null);
Assert.isNumber(check(b));