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
    The class body consists of zero or more constructor or member declarations. 
    Statements are not allowed in the body of a class—they must be placed in the constructor or in members.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Compute {
  num1: number;
  num2: number;
  constructor(num1: number, num2: number) {
    this.num1 = num1;
    this.num2 = num2;
  }
  public hypot() {
    return Math.sqrt(this.num1 * this.num1 + this.num2 * this.num2);
  }
  static initial = new Compute(0, 0);
}
let p: Compute = new Compute(10, 20);
Assert.equal(10, p.num1);
Assert.equal(20, p.num2);
Assert.equal(0, Compute.initial.num1);
Assert.equal(0, Compute.initial.num2);
let p2: Compute = new Compute(4, 3)
Assert.equal(5, p2.hypot())

class Circle {
  radius: number = 1;
}
let c = new Circle();
Assert.equal(c.radius, 1);
type TypeSummation = {
  width?: number;
  height?: number;
};
class summation {
  public width: number;
  public height: number;
  constructor(width: number, height: number);
  constructor(ParamObje_: TypeSummation);
  constructor(ParamObje_Obj_: any, height_ = 0) {
    if (typeof ParamObje_Obj_ === "object") {
      const { width, height } = ParamObje_Obj_;
      this.width = width;
      this.height = height;
    } else {
      this.width = ParamObje_Obj_;
      this.height = height_;
    }
  }
  sunArea(): number {
    return this.width * this.height;
  }
}
let sun = new summation(4, 5);
Assert.equal(sun.sunArea(), 20);
let obj: TypeSummation = { width: 10, height: 2 };
let sun2 = new summation(obj);
Assert.equal(sun2.sunArea(), 20);

class IndexNum {
  [key: string]: number | string[];
  constructor(keyList: string[] = [], valueList: string[][] | number[] = []) {
    let len = 0;
    if ((keyList !== undefined) && (valueList !== undefined)) {
      if (keyList.length <= valueList.length) {
        len = keyList.length;
      } else {
        len = valueList.length;
      }
      for (let i: number = 0; i < len; i++) {
        this[keyList[i]] = valueList[i];
      }
    }
  }
};
let index = new IndexNum(['A', 'B', 'C'], [0, 1, 2]);
Assert.equal(index['A'], 0);
index['B'] = 5;
Assert.equal(index['B'], 5);
Assert.equal(index.C, 2);
index['D'] = ['D', 'E'];
index.E = 9;
Assert.equal(JSON.stringify(index.D), '["D","E"]');
Assert.equal(index['E'], 9);