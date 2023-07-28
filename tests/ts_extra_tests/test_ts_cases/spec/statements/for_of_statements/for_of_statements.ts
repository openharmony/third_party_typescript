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
 description: test for (v of expr) statement
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

let count = 0;
for (let word of ["one", "two", "three"]) {
    count++;
}
Assert.equal(3, count);

count = 0;
let s = [0, 1, 2, 3, 4];
for (let value of s) {
    count++;
}
Assert.equal(5, count);

count = 0;
let blogName: string = "openHarmony";
for (let character of blogName) {
    count++;
}
Assert.equal(11, count);