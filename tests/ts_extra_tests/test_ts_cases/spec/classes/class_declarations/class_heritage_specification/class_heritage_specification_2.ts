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
    the implements clause specifies a set of interfaces for which to validate the class provides an implementation.
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
let p: Compute = new Compute(4, 3);
Assert.equal(4, p.num1);
Assert.equal(3, p.num2);
Assert.equal(5,p.hypot())

interface InterP1 {
  x: number;
  y: number;
}
class P2 implements InterP1 {
  x = 1;
  y = 1;
  setarea(x: number, y: number) {
    return x * y;
  }
}
let Ip = new P2();
Assert.equal(1, Ip.x);
Assert.equal(1, Ip.y);
Assert.equal(2,Ip.setarea(1,2))

interface InterP2 {
  Area(x: number, y: number): number;
}
class Rectangle implements InterP2 {
  Area(x: number, y: number): number {
    return x * y;
  }
}
let rec = new Rectangle();
Assert.equal(200, rec.Area(10, 20));