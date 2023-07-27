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
      the || and conditional operators may produce values of union types, and array literals may produce array values that have union types as their element types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let x: A1 = 1408 || "NARC";
let y: string | number;
x = 1500;
y = x <= 1408 ? "NARC" : 1024;
Assert.equal(y, 1024);
x = 100;
y = x <= 1408 ? "NARC" : 1024;
Assert.equal(y, "NARC");
type A1 = string | number | object;
type B1 = number | boolean | string;
let z: A1 & B1;
z = 125;
Assert.isNumber(z);
z = "Fn";
Assert.isString(z);
let a: Array<number | boolean> | Array<boolean | string>;
a = [0, true, -1, false];
Assert.equal(JSON.stringify(a), '[0,true,-1,false]');
a = [true, "True", false, "False"];
Assert.equal(JSON.stringify(a), '[true,"True",false,"False"]');
let b: number[] | boolean[];
b = [2, 4, 6];
Assert.equal(JSON.stringify(b), '[2,4,6]');
b = [true, false];
Assert.equal(JSON.stringify(b), '[true,false]');
let c: (number | string)[] | (boolean | Object)[];
c = [1, 3, 5, "AND", "OR"];
Assert.equal(JSON.stringify(c), '[1,3,5,"AND","OR"]');
c = [true, false, { 0x00: "0x00" }, { 0xFA: "0xFA" }];
Assert.equal(JSON.stringify(c), '[true,false,{"0":"0x00"},{"250":"0xFA"}]');