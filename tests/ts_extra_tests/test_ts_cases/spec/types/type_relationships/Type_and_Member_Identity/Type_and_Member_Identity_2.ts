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
   Two types are considered identical when they are the same primitive type. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

type T = number;
type U = number;

type IsEqual<TT, UU> =
  (<T1>() => T1 extends TT ? 1 : 2) extends
  (<T2>() => T2 extends UU ? 1 : 2)
  ? true
  : false

let a: T = 5;
let b: U = 10;
Assert.equal(typeof a, typeof b);

let isEqual1: IsEqual<T, U> = true;
let isEqual2: IsEqual<T, number> = true;
Assert.equal(isEqual1, isEqual2);
Assert.isTrue(isEqual1);

let a1: T = 1024;
let b1: U = 999;
a1 = b1;
Assert.equal(a1, b1);
a1 = 37;
b1 = 111;
b1 = a1;
Assert.equal(b1, a1);