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
    an ambient function declaration introduces a function in the containing declaration space.
    ambient functions may be overloaded by specifying multiple ambient function declarations with the same name, but it is an error to declare multiple overloads that are considered identical or differ only in their return types.
    ambient function declarations cannot specify a function bodies and do not permit default parameter values.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

declare type DF1 = () => void;
declare type DF2 = (a: string, b: string) => string;
declare type DF3 = (a: number, b?: number) => string;
const dFun1: DF1 = () => { Assert.isString("dFun1"); }
const dFun2: DF2 = (a: string, b: string) => { Assert.isString("dFun2"); return a + b; }
const dFun3: DF3 = (a: number, b?: number) => {
   let c: any;
   if (b != undefined) {
      c = a + b;
   } else {
      c = a;
   }
   c = c.toString();
   Assert.isString("dFun3");
   return "$" + c;
}
dFun1();
Assert.equal(dFun2("A", "B"), 'AB');
Assert.equal(dFun3(10, 20), "$30");

declare function dFun4(a: number, b: number): number;
const dFun4_0: typeof dFun4 = (a: number, b: number) => { return a + b; }
Assert.equal(dFun4_0(10, 20), 30);