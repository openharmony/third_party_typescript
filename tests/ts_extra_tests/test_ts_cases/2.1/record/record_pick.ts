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
   Record pick
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

function test<A extends string | number, B, C>(o: Record<A, B>, testObj: (s: B) => C): Record<A, C> {

    for (let oElement in o) {
        // @ts-ignore
        o[oElement] = testObj(o[oElement]);
    }
    // @ts-ignore
    return o;
}

let testO = { ok: "1", demo: "2" };
let ret = test(testO, str => str.length);
Assert.isNumber(ret.ok)

let person:{name?:string, age?:string} = {};
function test1<T, K extends keyof T>(o: T, ...ks: K[]): Pick<T, K>{
    for (let oElement of ks) {
        // @ts-ignore
        o[oElement] = oElement;
    }
    return o;
}
test1(person, "name", "age");
Assert.equal(person.name, 'name');
Assert.equal(person.age, 'age');
