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
   A member function declaration declares an instance member function or a static member function.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class MyClass {
  constructor(public x: number, public y: number) { }
  public distance(p: MyClass) {
    let dx = this.x - p.x;
    let dy = this.y - p.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  static add(p1: MyClass) {
    p1.x++;
    return p1.x
  }
}
let p1: MyClass = new MyClass(2, 2);
let p2: MyClass = new MyClass(1, 1);
Assert.equal(p1.distance(p2), Math.sqrt(2));
Assert.equal(MyClass.add(p1), 3);