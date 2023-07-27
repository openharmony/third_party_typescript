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
   Different sorts of type guard conditions are preserved.
   As another example, here’s a function that checks whether two of its inputs have contents.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function fun01(a: string | undefined, b: number | undefined, c: boolean) {
    const res = a && b && c;
    if (res) {
        Assert.equal(a.toLowerCase(), "abc");
        Assert.equal(b, 1);
        Assert.equal(c, true);
        return 1;
    } else {
        return 0;
    }
}
Assert.equal(fun01("abc", 1, true), 1);
Assert.equal(fun01("abc", undefined, true), 0);