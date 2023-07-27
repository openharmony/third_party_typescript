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
   index signatures now permit union types,as long as they’re a union of infinite-domain primitive types
   specifically:string,number,symbol,template string patterns
   An index signature whose argument is a union of these types will de-sugar into several different index signatures.
 options:
   lib:es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface I1 {
  [key: number]: any;
}
interface I2 {

  [key: number]: any;
}
interface I3 extends I2 {
  [key: number]: any;
}
const one: 1 = 1;
let a: I1 = {};
let b: I3 = {};
b[one] = 1;
a = b;
Assert.equal(a[one], 1);