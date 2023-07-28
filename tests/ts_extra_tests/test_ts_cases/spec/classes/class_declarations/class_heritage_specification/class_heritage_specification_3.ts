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
    The this-type (section 3.6.3) of the declared class must be assignable (section 3.11.4) to the base type reference 
    and each of the type references listed in the implements clause.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Addx {
  constructor(public x: number) { }
  public add(): this {
    this.x++;
    return this;
  }
}
class ChildAddx extends Addx {
  constructor(public x: number) {
    super(x);
  }
  public move(): this {
    this.x++;
    return this;
  }
}
let childadd: ChildAddx = new ChildAddx(10);
Assert.equal(11, childadd.move().x);
let a: Addx = childadd.move();
Assert.equal(13, a.add().x);

interface InterAddx {
  x: number;
}
class Addx2 implements InterAddx {
  x = 1;
  setadd(): this {
    this.x++;
    return this;
  }
}
let b1 = new Addx2();
Assert.equal(2, b1.setadd().x);
let interb1: InterAddx = b1.setadd();
Assert.equal(3, interb1.x);

interface InterP {
  Area(x: number, y: number): number;
}
class Rectangle implements InterP {
  Area(x: number, y: number): number {
    return x * y;
  }
  setRec(): this {
    return this;
  }
}
let b2 = new Rectangle();
Assert.equal(200, b2.Area(10, 20));
let interb2: InterP = b2.setRec();
Assert.equal(200, interb2.Area(10, 20));