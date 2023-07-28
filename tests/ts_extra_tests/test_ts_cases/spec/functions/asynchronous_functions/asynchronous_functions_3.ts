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
   Async Iterators Functions
 options:
   lib:es2018
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
export function newArray(len: number, step: number = 1) {
    if (len <= 0) { return [] };
    let arr: any[] = [];
    let x: number = 0;
    for (let i: number = 0; i < len; i++) {
        arr[i] = x + step;
    }
    return arr;
}
let arr = newArray(15);
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