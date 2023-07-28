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
    In the body of an instance member function declaration, this is of the this-type (section 3.6.3) of the class.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Circle {
  radius: number = 1;
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
let c = new Circle();
Assert.equal(c.radius, 1);
Assert.equal(c.area(), Math.PI);
c.radius = 2;
Assert.equal(c.area(), Math.PI * 4);