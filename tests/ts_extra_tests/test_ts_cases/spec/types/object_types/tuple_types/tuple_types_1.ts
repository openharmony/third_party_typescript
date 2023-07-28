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
    Tuple types represent JavaScript arrays with individually tracked element types.
    A tuple type combines a set of numerically named properties with the members of an array type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let cc: [number, string, boolean];
cc = [12, "abcd", true];
Assert.equal(cc[0], "12");
Assert.equal(cc[0].toString(), "12");
Assert.equal(cc[1], "abcd");
Assert.equal(cc[1].length, 4);
Assert.equal(cc[2], true);
let dd = cc[2] ? 0 : 1;
Assert.equal(dd, 0);