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
    Super calls (section 4.9.1) are used to call the constructor of the base class.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class P {
  public num1: number;
  public num2: number;
  constructor(num1: number, num2: number) {
    this.num1 = num1;
    this.num2 = num2;
  }
}
class HueP extends P {
  constructor(num1: number, num2: number, public hue: string) {
    super(num1, num2);
  }
}
let p1 = new HueP(1, 2, "red");
Assert.equal(p1.num1, 1);
Assert.equal(p1.num2, 2);
Assert.equal(p1.hue, "red");