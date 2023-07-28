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
    BigInts are part of an upcoming proposal in ECMAScript that allow us to model theoretically arbitrarily large integers. 
    Brings type-checking for BigInts, as well as support for emitting BigInt literals when targeting esnext.
    BigInt support in TypeScript introduces a new primitive type called the 'bigint' (all lowercase). 
    You can get a bigint by calling the BigInt() function or by writing out a BigInt literal by adding an n to the end of any integer numeric litera.
 options: 
    target: es2020
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

let b1: bigint = 10n;
let b2: bigint = BigInt(10n);
Assert.equal(b1, b2);

function func(bnum: bigint) {
    for (let i = 0; i < 10; i++){
        bnum++;
    }
    return bnum;
}
Assert.equal(func(10n), 20n);

class C{
    bigN: bigint
    constructor(bigN: bigint) {
        this.bigN = bigN;
    }
}
let c = new C(10n);
Assert.equal(c.bigN, 10n);