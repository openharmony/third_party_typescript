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
    The scope of a type parameter name declared in a class or interface declaration is that entire declaration, 
    including constraints, extends clause, implements clause, and declaration body, but not including static member declarations.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

class C {
   str: string = 'NAME';
   num: number = 333;
   static flag: boolean = false;
   fun() {
      return [this.str, this.num, C.flag];
   }
}
let c = new C();
Assert.equal(c.str, "NAME");
Assert.equal(c.num, 333);
Assert.equal(C.flag, false);
interface I {
   s: string;
   n: number;
}
let i: I = { s: 'STR', n: 999 };
Assert.equal(i.s, "STR");
Assert.equal(i.n, 999);