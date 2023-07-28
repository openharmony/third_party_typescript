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
    es2015 also introduced "Generators", which are functions that can be used to yield partial computation results via the Iterator interface and the yield keyword. 
 options:
    lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function* generators() {
    var i = 0;
    while (true) {
        yield i += 3;
        if (i > 33) {
            break;
        }
    }
}
let gen = generators();
let c = 0;
while (true) {
    let next = gen.next();
    if (next.done == true) {
        break;
    }
    Assert.equal(next.value, c += 3);
}
