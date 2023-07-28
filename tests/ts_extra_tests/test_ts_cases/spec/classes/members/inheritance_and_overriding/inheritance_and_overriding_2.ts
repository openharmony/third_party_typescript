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
    Only public and protected property members can be overridden.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Shape {
  public color: string = "black";
  protected side: number = 10;
  constructor() { };
  public switchColor() {
    this.color = this.color === "black" ? "white" : "black";
  }
}
class Circle extends Shape {
  public color: string = "red";
  protected side: number = 11;
  get gside() {
    return this.side;
  }
  public switchColor() {
    this.color = this.color === "red" ? "white" : "black";
  }
}
let shape: Shape = new Shape();
Assert.equal(shape.color, "black");
shape.switchColor();
Assert.equal(shape.color, "white");
let circle: Circle = new Circle();
Assert.equal(circle.color, "red");
circle.switchColor();
Assert.equal(circle.color, "white");
Assert.equal(11, circle.gside);