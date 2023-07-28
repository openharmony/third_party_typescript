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
   The binary + operator requires both operands to be of the Number primitive type or an enum type,
   or at least one of the operands to be of type Any or the String primitive type.
   Operands of an enum type are treated as having the primitive type Number.
   If one operand is the null or undefined value, it is treated as having the type of the other operand.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

var a: number = 10
var b: number = 20
var x = a + b
Assert.equal(x, 30)
enum e1 {
  A,
  B,
  C
}
enum e2 {
  D,
  E,
  F
}
var c = e1.A
Assert.equal(c, 0)
var d = e2.D
Assert.equal(d, 0)
var y = c + d
Assert.equal(y, 0)
var e: any = true
Assert.isTrue(e)
var f: string = 's'
Assert.equal(f, 's')
var w = a + e
Assert.equal(w, 11)
var v = c + f
Assert.equal(v, '0s');