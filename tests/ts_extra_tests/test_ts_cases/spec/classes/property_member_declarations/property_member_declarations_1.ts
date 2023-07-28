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
    Member declarations with a static modifier are called static member declarations.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Compute {
  constructor(public x: number, public y: number) { }
  public range(p1: Compute, p2: Compute) {
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  static getx() {
    return this.x;
  }
  static po = new Compute(0, 0);
  static x: number = 10;
}
let p1: Compute = new Compute(2, 2);
let p2: Compute = new Compute(1, 1);
Assert.equal(p1.range(p1, p2), Math.sqrt(2));
Assert.equal(Compute.getx(), 10);
Assert.equal(p1.range(p1, Compute.po), Math.sqrt(8));
Assert.equal(Compute.x, 10);