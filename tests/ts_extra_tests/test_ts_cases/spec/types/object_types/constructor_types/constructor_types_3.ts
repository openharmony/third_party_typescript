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
    An object type containing one or more construct signatures is said to be a constructor type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface I1 {
  a: string;
  b: boolean;
}
interface I2 {
  new(a: string, b: boolean): I1;
}
class MyClass implements I1 {
  readonly a: string;
  readonly b: boolean;
  constructor(a: string, b: boolean) {
    this.a = a;
    this.b = b;
  }
}
function fun(
  funConstructor: I2,
  a: string,
  b: boolean
): I1 {
  return new funConstructor(a, b);
}
let x1: I1 = new MyClass("x1", true);
Assert.equal(x1.a, "x1");
Assert.equal(x1.b, true);
let x2: I1 = fun(MyClass, "x2", true);
Assert.equal(x2.a, "x2");
Assert.equal(x2.b, true);