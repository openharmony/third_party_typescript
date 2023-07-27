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
    The scope of a local let, const, class, interface, type alias, or enum declaration declared immediately within a statement block is the body of that statement block.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

{
   var v: number = 999;
   Assert.equal(v, 999);
   let l: number = 333;
   Assert.equal(l, 333);
   const con: "NARC" = 'NARC';
   Assert.equal(con, "NARC");
   class cla {
      c: number = 1024;
   }
   let cl = new cla();
   Assert.equal(cl.c, 1024);

   interface I {
      color: [number, number, number];
   }
   let i: I = { color: [255, 0, 0] };
   Assert.equal(i.color[0], 255);

   type CV = keyof I | keyof string & keyof number;
   let cv: CV = "color";
   Assert.equal(cv, "color");
}
{
   Assert.equal(v / 9, 111);
}