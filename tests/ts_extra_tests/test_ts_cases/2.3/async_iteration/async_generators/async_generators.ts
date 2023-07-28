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
    the Async Iteration proposal introduces "Async Generators", which are async functions that also can be used to yield partial computation results. Async Generators can also delegate calls via yield* to either an iterable or async iterable.
    as with Generators, Async Generators can only be function declarations, function expressions, or methods of classes or object literals. Arrow functions cannot be Async Generators. Async Generators require a valid, global Promise implementation (either native or an ES2015-compatible polyfill), in addition to a valid Symbol.asyncIterator reference.
 options:
    lib: es2018
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

async function* fun() {
    let i = 0;
    let c = 0;
    yield* [0, 0, 0, 0];
    while (true) {
        if (i % 3 == 0) {
            yield c -= 1;
        } else {
            yield c += 1;
        }
        i++;
        if (i > 30) {
            break;
        }
    }
}
function newArray() {
    let arr: number[] = [0, 0, 0, 0];
    let i = 0;
    let c = 0;
    while (true) {
        if (i % 3 == 0) {
            c -= 1;
            arr[i + 4] = c;
        } else {
            c += 1;
            arr[i + 4] = c;
        }
        i++;
        if (i > 30) {
            break;
        }
    }
    return arr;
}
let arr = fun();
async function showAsyncGenerator(arr: AsyncGenerator) {
    let i = 0;
    for await (let x of arr) {
        Assert.equal(x as number, arr2[i++]);
    }
}
let arr2 = newArray();
showAsyncGenerator(arr);