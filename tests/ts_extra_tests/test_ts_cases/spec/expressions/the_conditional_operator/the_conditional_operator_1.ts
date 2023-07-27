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
  In a conditional expression of the form 'test ? expr1 : expr2', the test expression may be of any type.
  The type of the result is the union type of the types of expr1 and expr2.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

var x: number = 10
var y: string = '5'
var z = Math.random() < 0.5 ? x + y : y && x
if (typeof z === 'number') {
    z++
    Assert.equal(z, 11);
}
else {
    Assert.equal(z, '105');
};