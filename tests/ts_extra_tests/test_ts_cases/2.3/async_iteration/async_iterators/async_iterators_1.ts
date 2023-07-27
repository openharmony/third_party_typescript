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
    the Async Iteration introduces an AsyncIterator, which is similar to Iterator. The difference lies in the fact that the next, return, and throw methods of an AsyncIterator return a Promise for the iteration result, rather than the result itself. 
    this allows the caller to enlist in an asynchronous notification for the time at which the AsyncIterator has advanced to the point of yielding a value. 
 options:
    lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function createAsyncInterator(arr: any[]): AsyncIterator<any> {
    let index = 0;
    let len = arr.length;
    return {
        async next() {
            return new Promise((resolve, reject) => {
                if (index < len) {
                    resolve({ value: arr[index++], done: false });
                } else {
                    resolve({ value: undefined, done: true });
                }
            });
        },
    };
}

let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

async function exp(arr: any[]) {
    let asy = createAsyncInterator(arr);
    let i = 0;
    let fg;
    while (true) {
        if (fg == true) {
            break;
        }
        await asy.next().then((v) => {
            if (v.done == true) {
                fg = true;
            }
            Assert.equal(v.value, arr[i++]);
            return;
        });
    }
}
exp(arr);
