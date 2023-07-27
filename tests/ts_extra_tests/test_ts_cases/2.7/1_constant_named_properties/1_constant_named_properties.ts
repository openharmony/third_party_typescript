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
description: TypeScript 2.7 adds support for declaring const-named properties on types including ECMAScript symbols.
module: ESNext
isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

const sym = Symbol();
interface I{
  [sym](func: Function): Function;
}
class C implements I{
  [sym](func: Function) {
    return func;
  }
}
let f = new C();
Assert.isFunction(f[sym]);


const num = 5;
const str = 'a';

let obj = {
  [num]: 5,
  [str]: "string"
}

let para1 = obj[num];
let para2 = obj[str];
Assert.isNumber(para1);
Assert.isString(para2);
