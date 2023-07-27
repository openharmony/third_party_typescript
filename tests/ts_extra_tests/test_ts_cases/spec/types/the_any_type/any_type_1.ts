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
    The Any type is a supertype of all types, 
    and is assignable to and from all types.
 options: 
    lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let x: any;
x = 12;
Assert.equal(x, 12);
x = "abc";
Assert.equal(x, "abc");
x = true;
Assert.equal(x, true);
x = [1, 2, 3];
Assert.equal(x[0], 1);
x = ["aa", "bb"];
Assert.equal(x[0], "aa");
x = (a: number, b: number) => { return a + b };
Assert.isFunction(x);
x = Symbol("aa");
Assert.isSymbol(x);
x = { a: 1, b: 1 };
Assert.isObject(x);