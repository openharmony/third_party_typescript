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
    The class type has a property for each constructor parameter declared with a public, private, or protected modifier.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Ra {
  public x: number = 10;
  private y: number = 10;
  protected z: number = 10;
  constructor() { };
  public f() {
    this.x++;
    return this;
  }
  public gety(): number {
    return this.y;
  }
  public getz(): number {
    return this.z;
  }
  protected fun(): boolean {
    return false;
  }
  public getfun() {
    return this.fun();
  }
}
class Rb extends Ra {
  protected z: number = 20;
  protected fun(): boolean {
    return true;
  }
}
let a: Ra = new Ra();
Assert.equal(a.x, 10);
Assert.equal(a.gety(), 10);
Assert.equal(a.getz(), 10);
Assert.equal(a.getfun(), false);
Assert.equal(a.f().x, 11);
let b: Rb = new Rb();
Assert.equal(b.x, 10);