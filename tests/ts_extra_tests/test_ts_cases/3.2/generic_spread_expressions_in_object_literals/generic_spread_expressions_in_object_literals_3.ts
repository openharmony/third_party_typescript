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
    Non-generic spread expressions continue to be processed as before: Call and construct signatures are stripped, 
    only non-method properties are preserved, and for properties with the same name, the type of the rightmost property is used.
    This contrasts with intersection types which concatenate call and construct signatures, 
    preserve all properties, and intersect the types of properties with the same name.
    Thus, spreads of the same types may produce different results when they are created through instantiation of generic types
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

function func<T, U>(arg1: T, arg2: U) {
    return { ...arg1, ...arg2 };
}

let x: { mem1: string; mem2: { num: number } } = { mem1: "a", mem2: { num: 10 } };
let y: { mem1: string; mem2: object } = { mem1: "b", mem2: { str: 'a' } };

let s1 = { ...x, ...y };
Assert.isObject(s1);
let s2 = func(x, y);
Assert.isObject(s2);
let b1 = s1.mem2;
Assert.isObject(b1);
let b2 = s2.mem2;
b2 = { num: 20 };
Assert.isObject(b2);
