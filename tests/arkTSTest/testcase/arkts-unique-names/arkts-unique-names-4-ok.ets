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


/* 
description：The names of the two namespaces are not the same
type: Positive example
*/
namespace Geometry {
  export class Circle {
    private radius: number;
    constructor(radus: number) {
      this.radius = radus;
    }
    calculateArea(): number {
      return Math.PI * this.radius * this.radius;
    }
  }
}

namespace Utilities {
  export class Rectangle {
    private width: number;
    private height: number;
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }

    calculateArea(): number {
      return this.width * this.height;
    }
  }
}

const circle = new Geometry.Circle(5);
const rectangle = new Utilities.Rectangle(4, 6);