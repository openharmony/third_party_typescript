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
    If a class omits a constructor declaration, an automatic constructor is provided.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class A {
  x: number = 1;
  y: string = "go";
}
let a = new A();
Assert.equal(a.x, 1);
Assert.equal(a.y, "go");
class B {
  x: number;
  y: string;
  constructor(x: number = 1, y: string = "go") {
    this.x = x;
    this.y = y;
  }
}
let b = new B();
Assert.equal(a.x, 1);
Assert.equal(a.y, "go");
Assert.equal(b.x, 1);
Assert.equal(b.y, "go");