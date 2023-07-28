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
   Async Generator Functions
 options:
   lib:es2018
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

async function* ag() {
    let i = 0;
    let c = 0;
    yield* [0, 0, 0, 0];
    while (true) {
        yield c++;
        i++;
        if (i > 20) {
            break;
        }
    }
}
function newArray() {
    let arr: number[] = [0, 0, 0, 0];
    let i = 0;
    let c = 0;
    while (true) {
        arr[i + 4] = c;
        c++;
        i++;
        if (i > 20) {
            break;
        }
    }
    return arr;
}
let arr = ag();
async function showAsyncGenerator(arr: AsyncGenerator) {
    let i = 0;
    for await (let x of arr) {
        Assert.equal(x as number, arr2[i++]);
    }
}
let arr2 = newArray();
showAsyncGenerator(arr);