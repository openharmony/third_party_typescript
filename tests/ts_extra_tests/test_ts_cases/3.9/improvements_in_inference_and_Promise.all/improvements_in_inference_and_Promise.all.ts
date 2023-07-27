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
    recrent versions of TypeScript (around 3.7) have had updates to the declarations of functions like Promise.all and Promise.race. 
    unfortunately, that introduced a few regressions, especially when mixing in values with null or undefined.
    this issue has now been fixed.
 options:
    lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface I1 {
    func1(): number;
}

interface I2 {
    func2(): number;
}

async function func(
    arg1: Promise<I1>,
    arg2: Promise<I2 | undefined>
) {
    let [t1, t2] = await Promise.all([arg1, arg2]);
    return t1.func1();
}

let para1: Promise<I1> = new Promise(() => { return 10; });
let para2: Promise<I2> = new Promise(() => { return 5; });
func(para1, para2);
Assert.isObject(func(para1, para2));