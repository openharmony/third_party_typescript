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
    When a call signature with no return type annotation occurs in a context that has a function body 
    (specifically, a function implementation, a member function implementation, or a member accessor declaration), 
    the return type is inferred from the function body.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../../suite/assert.js'

let add = function (x: number, y: number) {
  return x + y;
};
type Tadd = ReturnType<typeof add>;
let x: Tadd = 1;
Assert.equal(typeof x, "number");
let sum = function (x: string, y: string) {
  return x + y;
};
type Tsum = ReturnType<typeof sum>;
let y: Tsum = "hello";
Assert.equal(typeof y, "string");
let booltp = function (x: boolean) {
  return true;
};
let z = booltp(false);
Assert.equal(z, true);