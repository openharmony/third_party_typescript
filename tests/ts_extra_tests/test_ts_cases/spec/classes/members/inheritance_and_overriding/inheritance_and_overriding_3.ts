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
    Base class static property members can be overridden by derived class static property members 
    of any kind as long as the types are compatible.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Shape {
  static color: string = "black";
  static switchColor() {
    this.color = this.color === "black" ? "white" : "black";
  }
}
class Circle extends Shape {
  static color: string = "red";
  static switchColor() {
    this.color = this.color === "red" ? "green" : "red";
  }
}
let a = Circle.color;
Assert.equal(a, "red");
Circle.switchColor();
let b = Circle.color;
Assert.equal(b, "green");