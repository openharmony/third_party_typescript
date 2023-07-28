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
    A property of a function type for each static member function declaration in the class body.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class A1 {
  public numa: number;
  constructor(a: number) {
    this.numa = a;
  }
  static c = 10;
  static f(): void {
    this.c++;
  }
}
class B1 extends A1 {
  public numb: number;
  constructor(a: number, b: number) {
    super(a);
    this.numb = b;
  }
  static f() {
    this.c++;
    return this.c
  }
}
Assert.equal(A1.c, 10);
A1.f();
Assert.equal(A1.c, 11);
Assert.equal(B1.c, 11);
Assert.equal(B1.f(), 12);