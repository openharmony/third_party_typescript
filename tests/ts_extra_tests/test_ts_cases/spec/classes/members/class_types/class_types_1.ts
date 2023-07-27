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
    Within the constructor and instance member functions of a class, the type of this is the this-type  of that class type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Ra {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public addx(): this {
    this.x++;
    return this
  }
  public addy(): this {
    this.y++;
    return this;
  }
  public add() {
    return this.x + this.y;
  }
}
class Rb extends Ra {
  public z: number;
  constructor(x: number, y: number, z: number) {
    super(x, y);
    this.z = z;
  }
  public addz(): this {
    this.z++;
    return this;
  }
}
let a: Ra = new Ra(1, 1);
let b: Rb = new Rb(1, 1, 1);
Assert.equal(a.addx().x, 2);
Assert.equal(a.addx().y, 1);
Assert.equal(a.addx().add(), 5);
Assert.equal(a.addy().x, 4);
Assert.equal(a.addy().y, 3);
Assert.equal(a.add(), 7);
Assert.equal(b.addx().x, 2);
Assert.equal(b.addx().y, 1);
Assert.equal(b.addy().x, 3);
Assert.equal(b.addy().y, 3);
Assert.equal(b.addz().z, 2);