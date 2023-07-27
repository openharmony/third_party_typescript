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
    If the array literal contains no spread elements and is contextually typed by a tuple-like type (section 3.3.3),
    the resulting type is a tuple type constructed from the types of the element expressions
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let myTuple: [string, number] = ["hello", 42];
Assert.isString(myTuple[0]);
Assert.isNumber(myTuple[1]);
function foo(pair: [string, number]) {
   return pair
}
Assert.equal(JSON.stringify(foo(["hello", 42])), '["hello",42]'); 