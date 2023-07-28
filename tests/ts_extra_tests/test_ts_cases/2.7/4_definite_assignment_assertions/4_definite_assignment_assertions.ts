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
 description: The definite assignment assertion is a feature that allows a ! to be placed after instance property and variable declarations to relay to TypeScript that a variable is indeed assigned for all intents and purposes, even if TypeScript's analyses cannot detect so.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

function func(arg: number | undefined) {
  let sum = arg! + arg!;
  return sum;
}
let num = func(5);
Assert.isFalse(Number.isNaN(num));

let x: number;
let add = x! + x!;
Assert.isTrue(Number.isNaN(add));

let num1: number;
later1();
let sum1 = num1! + num1!;
function later1() {
  num1 = 5;
}
Assert.equal(sum1, 10);

let num2!: number;
later2();
let sum2 = num2 + num2;
function later2() {
  num2 = 5;
}
Assert.equal(sum2, 10);
