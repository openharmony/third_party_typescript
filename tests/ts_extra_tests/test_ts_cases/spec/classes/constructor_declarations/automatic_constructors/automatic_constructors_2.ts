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
    In a derived class, the automatic constructor has the same parameter list (and possibly overloads) as the base class constructor.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Point1 {
  x: string = 'x';
  y: string = 'y';
  toString() {
    return this.x + "," + this.y;
  }
}
class ColorPoint extends Point1 {
  color: string;
  constructor(color: string) {
    super();
    this.color = color;
  }
  toString() {
    return this.color + ":" + super.toString();
  }
}
let co = new ColorPoint("blue");
Assert.equal(co.color, 'blue');
Assert.equal(co.toString(), 'blue:x,y');
class ColorPoint2 extends Point1 {
  pname: string = 'Point';
}
let co2 = new ColorPoint2();
Assert.equal(co2.pname, 'Point');
Assert.equal(co.toString(), 'blue:x,y');