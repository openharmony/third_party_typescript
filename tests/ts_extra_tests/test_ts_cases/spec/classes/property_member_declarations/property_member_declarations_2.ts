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
    it is possible to have instance and static property members with the same name.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js"

class myClass {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public add(): number {
    return this.x + this.y;
  }
  static x: number = 3;
  static add(): number {
    this.x++;
    return this.x;
  }
}
let myTest = new myClass(1, 2);
Assert.equal(myTest.x, 1);
Assert.equal(myTest.y, 2);
Assert.equal(myTest.add(), 3);
Assert.equal(myClass.x, 3);
Assert.equal(myClass.add(), 4);