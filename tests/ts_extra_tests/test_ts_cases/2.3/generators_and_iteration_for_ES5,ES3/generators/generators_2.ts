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
    generators can also internally delegate calls to another iterable through yield *.
 options:
    lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let arr2 = ["A", "B", "C", "D", "E", "F"];
function* generators2() {
    yield* arr2;
    let s = arr2[arr2.length - 1].charCodeAt(0);
    for (let i = 0; i < 20; i++) {
        s++;
        yield String.fromCharCode(s);
    }
}
let gen2 = generators2();
let c = 65;
while (true) {
    let next = gen2.next();
    if (next.done == true) {
        break;
    }
    Assert.equal(next.value, String.fromCharCode(c++));
};
