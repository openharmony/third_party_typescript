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
    Allows destructuring a rest binding from a generic variable. 
    This is achieved by using the predefined Pick and Exclude helper types from lib.d.ts, 
    and using the generic type in question as well as the names of the other bindings in the destructuring pattern.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

function func1<T>(arg: T) {
    let { ...restPara } = arg;
    return restPara;
}
const obj1 = { x: 10, y: 'a' };
const o1 = func1(obj1);
Assert.isObject(o1);
Assert.equal(JSON.stringify(o1), '{"x":10,"y":"a"}');

function func2<T extends { str: string }>(obj: T) {
    let { str, ...rest } = obj;
    return rest;
}

const obj2 = { x: 10, y: 20, str: "string" };
const o2 = func2(obj2);
Assert.isObject(o2);
Assert.equal(JSON.stringify(o2), '{"x":10,"y":20}');
