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
  The +, -, and ~ operators permit their operand to be of any type and produce a result of the Number primitive type.
  The unary + operator can conveniently be used to convert a value of any type to the Number primitive type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

var a: any = 'a'
a = a + 1
a = a - 1
a = ~a
Assert.isNumber(a);
Assert.equal(a, -1);
function func() { }
var n = +func();
Assert.isTrue(Number.isNaN(n));