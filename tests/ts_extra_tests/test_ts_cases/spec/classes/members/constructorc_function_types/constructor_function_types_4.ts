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
   If the class contains a constructor declaration with overloads, a set of construct signatures 
   with the parameter lists of the overloads, all having the same type parameters as the class (if any) 
   and returning an instantiation of the class type with those type parameters passed as type arguments.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

type TypeSummation = {
  width?: number;
  height?: number;
};
class summation {
  public width;
  public height;
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
const sun = new summation(4, 5);
Assert.equal(sun.sunArea(), 20);
const obj: TypeSummation = { width: 10, height: 20 };
Assert.equal(new summation(obj).sunArea(), 200);