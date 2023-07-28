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
    this appendix contains a summary of the grammar found in the main document.
    typescript grammar is a superset of the grammar defined in the ECMAScript 2015 Language Specification (specifically, the ECMA-262 Standard, 6th Edition) and this appendix lists only productions that are new or modified from the ECMAScript grammar.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class EXP {
   cname: string;
   private _ver: number = -1;
   addName(ad: string) {
      this.cname = this.cname + " " + ad;
      return this.cname;
   }
   get ver() {
      return this._ver;
   }
   set ver(v: number) {
      this._ver = v;
   }
   constructor(cname: string) {
      this.cname = cname;
   }
}
let exp = new EXP("EXP");
exp.addName("Class");
Assert.equal(exp.cname, "EXP Class");

exp.ver = 1;
Assert.equal(exp.ver, 1);

function Ax2(a: number) {
   return a * 2;
}
Assert.equal(Ax2(2), 4);

let fun1: (a: number, b: number) => number = (a: number, b: number) => {
   return a + b;
}
Assert.equal(fun1(1, 2), 3);