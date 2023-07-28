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
  The ! operator permits its operand to be of any type and produces a result of the Boolean primitive type.
  Two unary ! operators in sequence can conveniently be used to convert a value of any type to the Boolean primitive type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

var num1: number = 20
var num2: number = 90
var res = !((num1 > 50) && (num2 > 80))
Assert.isTrue(res)
function func(): any {
}
var b = !!func()
Assert.isFalse(b);