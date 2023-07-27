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
   In a destructuring assignment expression, the type of the expression on the right must be assignable to the assignment target on the left.
   An expression of type S is considered assignable to an assignment target V if V is an array assignment pattern,
   for each assignment element E in V, S is a tuple-like type with a property named N of a type that is assignable to the target given in E,
   where N is the numeric index of E in the array assignment pattern.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let s: ['0', string, number] = ['0', 'str', 10]
let [x, y, z]: [string, string, number] = s
Assert.equal(x, '0')
Assert.equal(y, 'str')
Assert.equal(z, 10);