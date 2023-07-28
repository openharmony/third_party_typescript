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
    Protected property members can be accessed only within their declaring class and classes derived from their declaring class, 
    and a protected instance property member must be accessed through an instance of the enclosing class or a subclass thereof.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Base {
  protected x: number = 1;
  protected y: number = 4;
  protected addxy() {
    return this.x + this.y;
  }
  public addx() {
    this.x++;
  }
  public get foo() {
    return this.x;
  }
  static fun(m: Base, b: Derived) {
    m.x = 1;
    b.x = 1;
    m.y = 1;
    b.y = 1;
  }
}
class Derived extends Base {
  public get add(): number {
    return this.addxy()
  }
  public get foo() {
    return this.x;
  }
  static fun(b: Derived) {
    b.x = 1;
    b.y = 1;
  }
}
let m: Base = new Base();
m.addx();
Assert.equal(m.foo, 2);
let b: Derived = new Derived();
b.addx();
Assert.equal(b.foo, 2);
Assert.equal(b.add, 6);