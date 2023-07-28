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
    A property member in a derived class is said to override a property member in a base class 
    when the derived class property member has the same name and kind (instance or static) as the base class property member.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Shape {
  public color: string = "black";
  protected name: string = "shape";
  public switchColor() {
    this.color = this.color === "black" ? "white" : "black";
  }
  protected f(a: Shape, b: Circle) {
    a.color = "blue";
    b.color = "blue";
  }
  static size: number = 10;
}
class Circle extends Shape {
  public color: string = "red";
  protected name: string = "circle";
  public switchColor() {
    this.color = this.color === "red" ? "green" : "red";
  }
  static size: number = 12;
  protected f(a: Shape, b: Circle) {
    a.color = "pink";
    b.color = "pink";
  }
}
let shape: Shape = new Shape();
Assert.equal(shape.color, "black");
shape.switchColor();
Assert.equal(shape.color, "white");
Assert.equal(Shape.size, 10);
let circle = new Circle();
Assert.equal(circle.color, "red");
circle.switchColor();
Assert.equal(circle.color, "green");
Assert.equal(Circle.size, 12);