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
    The symbol keyword references the Symbol primitive type. 
    Symbol values are obtained using the global object 'Symbol' which has a number of methods and properties and can be invoked as a function. 
 options: 
    lib: es2019
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let sym: symbol = Symbol("NARC");
let sym2: symbol = Symbol("TypeScript");
Assert.equal(sym.description, "NARC");
let s1: string = sym2.toString();
let s2: symbol = sym.valueOf();
Assert.equal(s1, "Symbol(TypeScript)");
let flag1: boolean = false;
if (sym != sym2) {
  flag1 = true;
}
Assert.isTrue(flag1);
let flag2: boolean = false;
if (sym == s2) {
  flag2 = true;
}
Assert.isTrue(flag2);