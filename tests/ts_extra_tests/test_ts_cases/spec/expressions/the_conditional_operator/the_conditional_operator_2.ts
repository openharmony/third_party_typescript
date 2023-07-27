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
  If the conditional expression is contextually typed, expr1 and expr2 are contextually typed by the same type. 
  Otherwise, expr1 and expr2 are not contextually typed.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let sum = function (x: number, y: number) {
    return x + y;
}
let average = function (a: number, b: number) {
    return (a + b) / 2;
}
let flag = 0;
let rela1: number = flag < 0.5 ? sum(5, 7) : average(6, 9);
Assert.isNumber(rela1);
Assert.equal(rela1, 12);
flag = 1;
let rela2: number = flag < 0.5 ? sum(5, 7) : average(6, 9);
Assert.isNumber(rela2);
Assert.equal(rela2, 7.5);