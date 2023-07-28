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
    The scope of a parameter name declared in a call or construct signature is the remainder of the signature declaration. 
    If the signature is part of a function-like declaration with a body (including a function declaration, constructor declaration, member function declaration, member accessor declaration, function expression, or arrow function), 
    the scope includes the body of that function-like declaration.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

class CC {
   a: number; b: number;
   constructor(a: number, b: number) {
      let c1: number = a + b;
      let c2: number = a * b;
      Assert.isNumber(c1);
      Assert.isNumber(c2);
      this.a = c1 + c2;
      this.b = c2 - c1;
   }
}
let cc = new CC(3, 5);
Assert.equal(cc.a, 23);
Assert.equal(cc.b, 7);