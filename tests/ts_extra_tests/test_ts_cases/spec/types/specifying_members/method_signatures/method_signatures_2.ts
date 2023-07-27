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
    A literal type may overload a method by declaring multiple method signatures 
    with the same name but differing parameter lists.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class A {
  add(x: number, y: number): number;
  add(x: number, y: number, z: number): number;
  add(x: any, y: any, z?: any): any {
    if (
      typeof x == "number" &&
      typeof y == "number" &&
      typeof z == "undefined"
    ) {
      return x + y;
    }
    if (
      typeof x === "number" &&
      typeof y === "number" &&
      typeof z === "number"
    ) {
      return x + y + z;
    }
  }
}
let a1 = new A();
Assert.equal(a1.add(1, 2), 3);
let a2 = new A();
Assert.equal(a2.add(1, 2, 3), 6);
