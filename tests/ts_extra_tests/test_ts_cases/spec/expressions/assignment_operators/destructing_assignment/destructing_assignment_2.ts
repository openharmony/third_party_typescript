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
   An expression of type S is considered assignable to an assignment target V if V is an object assignment pattern and,
   for each assignment property P in V, S is the type Any.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let obj: any = {
  a: "foo",
  b: 15,
  c: "bar"
}
let { a, b, c } = obj;
Assert.equal(a, 'foo')
Assert.equal(b, 15)
Assert.equal(c, 'bar');