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
    es2015 introduced Iterator, which is an object that exposes three methods, next, return, and throw.
 options:
    lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function createInterator(arr: any[]): Iterator<any> {
    let index = 0;
    let len = arr.length;
    return {
        next() {
            return index < len
                ? { value: arr[index++], done: false }
                : { value: undefined, done: true }
        }
    }
}
var arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
var iterator = createInterator(arr);
let i = 0;
while (true) {
    let n = iterator.next();
    if (n.done == true) {
        break;
    }
    Assert.equal(n.value, arr[i++]);
};
