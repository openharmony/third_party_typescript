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
   TypeScript has always used a set of rules and guesses for when to reuse type aliases when printing out types.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

type T = number | string | boolean;
function func(value: T): T {
  return value;
}
let arr = [1, "hello", false];
Assert.equal(typeof func(arr[0]), "number");

class C{
  mem: T;
  constructor(mem: T) {
    this.mem = mem;
  }
}
let c = new C(10);
Assert.isNumber(c.mem);
c.mem = 'a';
Assert.isString(c.mem);
c.mem = true;
Assert.isBoolean(c.mem);