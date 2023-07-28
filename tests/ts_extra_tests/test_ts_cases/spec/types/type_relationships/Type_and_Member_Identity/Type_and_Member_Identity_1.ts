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
   Two types are considered identical when they are both the Any type. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

type T = any;
type U = any;

type IsEqual<TT, UU> =
  (<T1>() => T1 extends TT ? 1 : 2) extends
  (<T2>() => T2 extends UU ? 1 : 2)
  ? true
  : false

let a1: T = 10;
let b1: U = 10;
Assert.equal(typeof a1, typeof b1);
let a2: T = 10;
let b2: U = 10;
Assert.equal(typeof a2, typeof b2);

let isEqual: IsEqual<T, U> = true;
Assert.isTrue(isEqual);

let a3: T = 'a3';
let b3: U = 1024;
a3 = b3;
Assert.equal(a3, b3);
a3 = 'A3';
b3 = false;
b3 = a3;
Assert.equal(b3, a3);