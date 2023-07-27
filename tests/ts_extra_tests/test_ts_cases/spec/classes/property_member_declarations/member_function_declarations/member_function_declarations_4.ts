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
    A member function can access overridden base class members using a super property access (section 4.9.2).
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class MyClass {
  constructor(public x: number, public y: number) { }
  public add() {
    return this.x + this.y;
  }
}
class MyClass2 extends MyClass {
  constructor(x: number, y: number, public z: number) {
    super(x, y);
  }
  public add() {
    return super.add() + this.z;
  }
}
let p = new MyClass(1, 2);
Assert.equal(p.x, 1);
Assert.equal(p.y, 2);
Assert.equal(p.add(), 3);
let cp = new MyClass2(1, 2, 3);
Assert.equal(cp.z, 3);
Assert.equal(cp.add(), 6);