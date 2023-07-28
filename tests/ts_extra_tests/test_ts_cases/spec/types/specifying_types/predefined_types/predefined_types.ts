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
    The any, number, boolean, string, symbol and void keywords reference 
    the Any type and the Number, Boolean, String, Symbol, and Void primitive types respectively.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let x1: number = 5;
Assert.equal(x1.toString(), "5");

let x2: boolean = true;
Assert.equal(x2.toString(), "true");

let x3: string = 's';
Assert.equal(x3.toString(), "s");

let x4: symbol = Symbol();
Assert.equal(x4.toString(), "Symbol()");

let x5: any;
x5 = 1;
x5 = "aa"
x5 = true;
Assert.equal(x5, true);

let x6: void = undefined;
Assert.equal(x6, undefined);