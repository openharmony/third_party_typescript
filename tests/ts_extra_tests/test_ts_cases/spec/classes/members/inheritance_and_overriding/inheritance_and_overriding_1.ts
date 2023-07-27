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
    A derived class inherits all members from its base class it doesn't override. 
    Inheritance means that a derived class implicitly contains all non-overridden members of the base class.
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
  get gside() {
    return this.side;
  }
}
let circle: Circle = new Circle();
let a: string = circle.color;
Assert.equal(a, "black");
circle.switchColor();
let b: string = circle.color;
Assert.equal(b, "white");
Assert.equal(10, circle.gside);