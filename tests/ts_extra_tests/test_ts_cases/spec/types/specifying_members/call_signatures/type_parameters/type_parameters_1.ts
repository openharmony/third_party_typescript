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
    Type parameters in call signatures provide a mechanism for expressing the relationships of parameter and return types in call operations.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../../suite/assert.js'

function identity<T>(x: T): T {
  return x;
}
let x: number = 1;
Assert.equal(x, identity(x));
let x2: "hello" = "hello";
Assert.equal(identity(x2), "hello");
function identity2<T, U>(x: T, y: U): T {
  return x;
}
Assert.equal(x, identity2(x, 1));
Assert.equal(x2, identity2(x2, 1));
function identity3<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let y = { h_a: 1, h_b: 2, h_c: 3, h_d: 4 };
identity3(y, "h_a");
function identity4<T>(arg: T[]): T[] {
  return arg;
}
let arg: number[] = [1, 2, 3];
Assert.equal(arg, identity4(arg));
let arg2: ["a", "b", "c"] = ["a", "b", "c"]
Assert.equal(arg2, identity4(arg2));