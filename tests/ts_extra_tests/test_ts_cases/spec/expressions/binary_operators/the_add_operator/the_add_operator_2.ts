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
   The binary + operator,
   If one or both operands are of the String primitive type, the result is of the String primitive type.
   Otherwise, the result is of type Any.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

var a: any = true
var b: any = 's'
var c: boolean = false
var d: string = 'str'
var e: number = 10
var f: any = 20
var w = a + b
Assert.isString(w);
Assert.equal(w, 'trues');
var v = a + f
Assert.isNumber(v);
Assert.equal(v, 21);
var x = a + c
Assert.isNumber(x);
Assert.equal(x, 1);
var y = a + d
Assert.isString(y);
Assert.equal(y, 'truestr');
var z = a + e
Assert.isNumber(z);
Assert.equal(z, 11);