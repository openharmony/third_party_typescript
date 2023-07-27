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
    A member accessor declaration declares an instance member accessor or a static member accessor.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class A {
  private _foo: number = 0;
  get foo(): number {
    return this._foo;
  }
  set foo(value: number) {
    this._foo = value;
  }
  private static a: number = 0;
  static get aa(): number {
    return this.a;
  }
  static set aa(value: number) {
    this.a = value;
  }
}
let x = new A();
Assert.equal(x.foo, 0);
x.foo = 10;
Assert.equal(x.foo, 10);
Assert.equal(A.aa, 0);
A.aa = 20;
Assert.equal(A.aa, 20);