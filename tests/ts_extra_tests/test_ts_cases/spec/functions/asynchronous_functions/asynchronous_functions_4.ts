/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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
   Async Iterators Functions
 options:
   lib:es2018
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'
import { newArray } from './asynchronous_functions_3_m.js';

async function asc(arr: any[]) {
    let i = 0;
    for await (let x of arr) {
        Assert.equal(x, arr[i]);
        i++
    }
}
let arr = newArray(15, 5);
asc(arr);