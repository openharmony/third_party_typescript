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
    A type argument list is required to specify exactly one type argument for each corresponding type parameter, 
    and each type argument for a constrained type parameter is required to satisfy the constraint of that type parameter.
 module: ESNext
 isCurrent: true
 ---*/


import {Assert} from '../../../../../suite/assert.js'

function getname<T, Y>(name: T, number: Y): T {
  return name;
}
interface Lengthwise {
  length: number;
}
interface Search<T, Y extends Lengthwise> {
  (name: T, number: Y): T;
}
let fn: Search<string, Lengthwise> = getname;
let aa: Lengthwise = { length: 11 };
let a = fn("wan", aa);
Assert.equal(a, "wan");
let fn2: Search<number, Lengthwise> = getname;
let bb: Lengthwise = { length: 33 };
let b = fn2(22, bb);
Assert.equal(b, 22);
let fn3: Search<boolean, Lengthwise> = getname;
let cc: Lengthwise = { length: 44 };
let c = fn3(true, cc);
Assert.equal(c, true);
