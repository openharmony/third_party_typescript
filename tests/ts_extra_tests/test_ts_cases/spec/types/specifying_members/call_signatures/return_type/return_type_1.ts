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
    a call signature's return type annotation specifies the type of the value computed and returned by a call operation. 
    A void return type annotation is used to indicate that a function has no return value.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../../suite/assert.js'

function returnNum(a: number, b: number): number {
  return a + b;
}
let aa = returnNum(1, 2);
Assert.equal(aa, 3);
function returnString(name: string): string {
  return name + " b!";
}
let bb = returnString("rush");
Assert.equal(bb, "rush b!");
function returnBoolean(a: number, b: number): Boolean {
  return a > b ? true : false;
}
let cc = returnBoolean(1, 2);
Assert.equal(cc, false);
function returnUndefine(a: undefined): undefined {
  return a;
}
let ad: undefined;
let dd = returnUndefine(ad);
Assert.equal(dd, undefined);
function returnVoid(a: number): void { }
let ee = returnVoid(1);
Assert.equal(ee, null);