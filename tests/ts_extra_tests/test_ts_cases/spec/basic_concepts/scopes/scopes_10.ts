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
    The scope of a local let, const, class, interface, type alias, or enum declaration declared immediately within the body of a function-like declaration is the body of that function-like declaration.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

function sfun() {
   let s = 1024;
   Assert.equal(s, 1024);
   const n = 'NARC'
   Assert.equal(n, 'NARC');
   class C {
      c: number;
      constructor(c: number) {
         this.c = c;
      }
   }
   let cc = new C(5);
   Assert.equal(cc.c, 5);

   type S = keyof C | keyof number & keyof string;
   let ss: S = "valueOf";
   Assert.equal(ss, "valueOf");
}
sfun();