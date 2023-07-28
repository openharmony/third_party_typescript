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
    a rest parameter is permitted to have a generic type that is constrained to an array type, and type inference can infer tuple types for such generic rest parameters.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function fun1<T, U extends any[], V>(f: (x: T, ...args: U) => V): (...args: U) => V {
    function f2(...args: U) { let json = JSON.stringify(args); return json as unknown as V; }
    return f2;
};
function fun2(x: number, y: string, z: boolean): string {
    let a: any[] = [x, y, z];
    let json = JSON.stringify(a);
    return json;
}
let a = fun2(5, "A", true);
let ff1 = fun1(fun2);
let b = ff1("B", true);
let ff2 = fun1(ff1);
let c = ff2(true);
let ff3 = fun1(ff2);
let d = ff3();
Assert.equal(a, "[5,\"A\",true]");
Assert.equal(b, "[\"B\",true]");
Assert.equal(c, "[true]");
Assert.equal(d, "[]");