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
    in places where a type is not explicitly provided
    and TypeScript cannot infer one, the Any type is assumed.
 options: 
    lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let a;
a = 25.25;
Assert.isNumber(a);
a = "narc";
Assert.isString(a);
a = function add(a: any, b: any) {
  return a + b;
};
Assert.isFunction(a);
a = false;
Assert.isBoolean(a);
a = Symbol();
Assert.isSymbol(a);
a = { 1408: "Movie" };
Assert.equal(JSON.stringify(a), '{"1408":"Movie"}');
a = null;
let flag = false;
if (a === null) {
  flag = true;
}
Assert.isTrue(flag);
a = undefined;
Assert.isUndefined(a);