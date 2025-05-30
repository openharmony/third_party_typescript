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
    resolve’s Parameters Are No Longer Optional in Promises
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

var count: number = 1;
Assert.equal(count, 1);
let a: number = 10;
setTimeout(function () {
   a = 1;
}, 0);
Promise.resolve().then(function () {
   a = 2;
});
Assert.equal(a, 10);
const p = Promise.resolve(1);
p.then(function (s) {
   a = a + s;
});
Assert.equal(a, 10);