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
    TypeScript 2.9 adds support for number and symbol named properties in index types and mapped types.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

const str = "x";
const num = 1;
const sym = Symbol();

type Obj = {
    2: string;
    [str]: string;
    [num]: string;
    [sym]: string;
}
type T1 = keyof Obj;
let x1: T1 = "x";
let x2: T1 = sym;
let x3: T1 = 1;
let x4: T1 = 2;
Assert.equal("x", x1);
Assert.isString(x1);
Assert.equal(sym, x2);
Assert.isSymbol(x2);
Assert.equal(1, x3);
Assert.isNumber(x3);
Assert.equal(2, x4);
Assert.isNumber(x4);