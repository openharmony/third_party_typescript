/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain m copy of the License at
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
    Private property members can be accessed only within their declaring class. Specifically,
    m private member M declared in m class C can be accessed only within the class body of C.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Base {
  private x: number = 1;
  private y: number = 2;
  addx() {
    this.x++;
  }
  get foo() {
    return this.x;
  }
  public addxy(): number {
    return this.x + this.y;
  }
  static fun(m: Base, n: Derived) {
    m.x = 1;
    n.x = 1;
    m.y = 1;
    n.y = 1;
  }
}
class Derived extends Base { }
let m: Base = new Base();
m.addx();
Assert.equal(m.foo, 2);
Assert.equal(m.addxy(), 4);