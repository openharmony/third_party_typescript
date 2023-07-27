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
    Instance members are members of the class type and its associated this-type. Within constructors, 
    instance member functions, and instance member accessors, 
    the type of this is the this-type of the class.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Counter {
  private count: number = 0;
  constructor(count_: number) {
    this.count = count_;
  }
  public add(): this {
    this.count++;
    return this;
  }
  public subtract(): this {
    this.count--;
    return this;
  }
  public get Result(): number {
    return this.count;
  }
}
let counter = new Counter(1);
counter.add();
Assert.equal(counter.add(), counter);
Assert.equal(counter.Result, 3);
counter.subtract();
Assert.equal(counter.subtract(), counter);
Assert.equal(counter.Result, 1);
class Compute {
  constructor(public num1: number, public num2: number) { }
  public hypot() {
    return Math.sqrt(this.num1 * this.num1 + this.num2 * this.num2);
  }
  static initial = new Compute(0, 0);
}
class ChildP extends Compute {
  constructor(public x: number, public y: number, public z: number) {
    super(x, y);
    this.z = z;
  }
  public move(): this {
    this.x += 1;
    this.y += 1;
    this.z += 1;
    return this
  }
}
let childp: ChildP = new ChildP(1, 2, 3);
childp.move();
Assert.equal(childp.x, 2);
Assert.equal(childp.y, 3);
Assert.equal(childp.z, 4);
Assert.equal(childp.move(), childp);
let count: ChildP = new ChildP(4,3,1);
Assert.equal(count.hypot(),5);