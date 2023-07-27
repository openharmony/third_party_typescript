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
  S is a subtype of a type T, and T is a supertype of S, 
  if S has no excess properties with respect to T, and S is the Null type and T is not the Undefined type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface T {
    name: any
    age: any
}
interface S {
    name: null
    age: null
    hobbies: null
}
let t: T = {
    name: "T",
    age: 20
};

let s: S = {
    name: null,
    age: null,
    hobbies: null
};

t = s;
Assert.equal(t, s);