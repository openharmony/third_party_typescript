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
   A parenthesized expression has the same type and classification as the contained expression itself. 
   Specifically, if the contained expression is classified as a reference, so is the parenthesized expression.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let addparent = function (n1: number, n2: number): number {
  return n1 + n2;
};
let addnoparent = (n1: number, n2: number): number => n1 + n2;
let isCorrect = addparent(11, 22) === addnoparent(11, 22);
Assert.isTrue(isCorrect);
let foo: string = "hello";
let bar: string = foo;
Assert.isString(foo);
Assert.isString(bar);
const obj = { value: "world" };
function printValue(value: string) {
  Assert.equal(value, "world");
  Assert.isString(value);
}
printValue(obj.value);

let str1 = (37 * 12) + ((37 * 9) + '');
Assert.equal(str1, "444333");
Assert.isString(str1);

let t: boolean = true;
let f: boolean = false;
let bool: boolean = t || ((f || t) && (false && t));
Assert.isTrue(bool);

