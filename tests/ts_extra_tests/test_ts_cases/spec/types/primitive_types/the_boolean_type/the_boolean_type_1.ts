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
    The Boolean primitive type corresponds to the similarly 
    named JavaScript primitive type and represents logical values that are either true or false.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

function test1(): number {
  return 0;
}
function test2(): number {
  return 1;
}
function test3(): number {
  return 1;
}
function test4(i: number): number {
  return i;
}
let a: boolean = true;
Assert.equal(a, true);
let b: boolean = false;
Assert.equal(b, false);
let c: number = a ? 0 : 1;
Assert.equal(c, 0);
c = b ? 0 : 1;
Assert.equal(c, 1);
if (a) {
  Assert.equal(test1(), 0);
} else {
  Assert.equal(test2(), 1);
}
while (a) {
  Assert.equal(test3(), 1);
  break;
}
for (let i = 0; a && i < 5; i++) {
  Assert.equal(test4(i), i);
};