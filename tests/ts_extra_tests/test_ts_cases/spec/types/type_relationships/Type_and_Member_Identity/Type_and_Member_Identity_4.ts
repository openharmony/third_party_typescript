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
   Two types are considered identical when they are union types with identical sets of constituent types. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

type T = number | string | boolean;
type U = number | string | boolean;

type IsEqual<TT, UU> =
  (<T1>() => T1 extends TT ? 1 : 2) extends
  (<T2>() => T2 extends UU ? 1 : 2)
  ? true
  : false

let a1: T = 10;
let a2: U = 5;
Assert.equal(typeof a1, typeof a2);
let b1: T = '10';
let b2: U = '5';
Assert.equal(typeof b1, typeof b2);
let c1: T = true;
let c2: U = false;
Assert.equal(typeof c1, typeof c2);

let isEqual: IsEqual<T, U> = true;
Assert.isTrue(isEqual);

let d1: T = true;
let d2: U = 555;
d1 = d2;
Assert.equal(d1, d2);
d1 = 'd1';
d2 = false;
d2 = d1;
Assert.equal(d2, d1);
