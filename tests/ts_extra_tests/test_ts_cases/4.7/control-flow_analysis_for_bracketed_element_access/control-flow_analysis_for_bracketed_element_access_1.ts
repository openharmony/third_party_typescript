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
   TypeScript 4.7 now narrows the types of element accesses when the indexed key is literal types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

type myType = "a" | 3 | "b";
if (Math.random() > 0.8) {
    var arg1: myType = "a";
} else if (Math.random() < 0.3) {
    var arg1: myType = "b";
} else {
    var arg1: myType = 3;
}

const arg2 = Math.random() > 0.5 ? 15 : 'rand';

const o = {
    [arg1]: arg2
}
if (typeof o[arg1] === 'string') {
    Assert.equal(arg2, 'rand');
} else {
    Assert.equal(arg2, 15);
};
