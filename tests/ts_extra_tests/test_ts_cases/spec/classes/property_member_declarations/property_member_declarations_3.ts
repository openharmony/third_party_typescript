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
    Every class automatically contains a static property member named 'prototype'
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Compute {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  static p = new Compute(0, 0);
}
class ColoredPoint extends Compute {
  constructor(x: number, y: number, public color: string) {
    super(x, y);
  }
}
Assert.equal(ColoredPoint.prototype.color, undefined);
Assert.equal(ColoredPoint.prototype.x, undefined);
Assert.equal(ColoredPoint.prototype.y, undefined);
Assert.equal(Compute.prototype.x, undefined);
Assert.equal(Compute.prototype.y, undefined);