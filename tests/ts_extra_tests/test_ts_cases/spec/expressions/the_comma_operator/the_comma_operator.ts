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
  The comma operator permits the operands to be of any type and produces a result that is of the same type as the second operand.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let x: number = 20;
let y: boolean = true;
let z: string = 'a';
function add(arg1: number, arg2: number) {
    return arg1 + arg2;
}
let com1 = (x++, y);
let com2 = (x++, z = z + 'b');
let com3 = (x++, add(3, 5));
Assert.isBoolean(com1);
Assert.equal(com1, true);
Assert.isString(com2);
Assert.equal(com2, 'ab');
Assert.isNumber(com3);
Assert.equal(com3, 8);