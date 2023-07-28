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
    Initializers in static member variable declarations are executed once when the containing script or module is loaded.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class MyClass {
  constructor(public x: number, public y: number) { }
  public addc() {
    MyClass.c++;
  }
  static po = new MyClass(0, 0);
  static c: number = 10;
}
let a: MyClass = new MyClass(1, 1);
Assert.equal(MyClass.c, 10);
a.addc();
Assert.equal(MyClass.c, 11);
let b: MyClass = new MyClass(1, 1);
b.addc();
Assert.equal(MyClass.c, 12);