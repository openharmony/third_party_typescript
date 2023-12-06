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


// Description: Explicitly declares multiple classes

class Oblong {
  constructor(height: number, width: number) {
    this.height = height
    this.width = width
  }
  height: number
  width: number
}

class Circle {
  constructor(radius: number) {
    this.radius = radius
  }
  radius: number
}

class Semicircle {
  constructor(radius: number) {
    this.radius = radius
  }
  radius: number
}

let oblong = new Oblong(0.0, 0.0)
let circle = new Circle(1.0)
let semicircle = new Semicircle(2.0)