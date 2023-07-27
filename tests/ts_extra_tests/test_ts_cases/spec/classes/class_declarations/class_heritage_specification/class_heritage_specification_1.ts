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
    A class that includes an extends clause is called a derived class, and the class specified in the extends clause is called the base class of the derived class.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Compute {
  constructor(public num1: number, public num2: number) { }
  public hypot() {
    return Math.sqrt(this.num1 * this.num1 + this.num2 * this.num2);
  }
  static initial = new Compute(0, 0);
}
class ChildP extends Compute {
  constructor(public x: number, public y: number) {
    super(x, y);
  }
  public move() {
    this.x += 1;
    this.y += 1;
  }
}
let pChild: ChildP = new ChildP(10, 20);
Assert.equal(10, pChild.x);
Assert.equal(20, pChild.y);
pChild.move();
Assert.equal(11, pChild.x);
Assert.equal(21, pChild.y);
Assert.equal(0, ChildP.initial.num1);

let count:ChildP = new ChildP(4,3);
Assert.equal(4, count.x);
Assert.equal(3, count.y);
Assert.equal(5,count.hypot());