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
    A property for each static member variable declaration in the class body.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class A1 {
  public numa: number;
  constructor(a: number) {
    this.numa = a;
  }
  static c: number = 20;
}
class B1 extends A1 {
  public numb: number;
  constructor(a: number, b: number) {
    super(a);
    this.numb = b;
  }
}
let a: A1 = new A1(10);
Assert.equal(a.numa, 10);
Assert.equal(A1.c, 20);
let b: B1 = new B1(10, 20);
Assert.equal(b.numa, 10);
Assert.equal(b.numb, 20);
Assert.equal(B1.c, 20);