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
    bigints produce a new string when using the typeof operator: the string "bigint". 
    Thus, TypeScript correctly narrows using typeof as you’d expect.
 options: 
    target: es2020
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function num_or_bigint(x: number | bigint) {
    if (typeof x === "bigint") {
        return x;
    }
    else {
        return x + 1;
    }
}
var a = num_or_bigint(10);
var b = num_or_bigint(10n);
Assert.equal(a, 11);
Assert.equal(b, 10n);