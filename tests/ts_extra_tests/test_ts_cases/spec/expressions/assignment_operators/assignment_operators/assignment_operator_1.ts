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
   An assignment of the form 'v = expr' requires v to be classified as a reference or as an assignment pattern.
   The expr expression is contextually typed by the type of v, and the type of expr must be assignable to the type of v,
   or otherwise a compile-time error occurs. The result is a value with the type of expr.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

var sum: Function = function (x: number, y: number) {
  return x + y
}
let result = sum(5, 10);
Assert.equal(result, 15);