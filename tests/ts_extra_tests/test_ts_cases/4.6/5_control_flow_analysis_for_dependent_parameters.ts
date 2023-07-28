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
 description: A signature can be declared with a rest parameter whose type is a discriminated union of tuples.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../suite/assert.js'

type T = (...args: [1, number] | [true, string] | ["a", boolean]) => void;
const fun: T = (x: true | 1 | "a", y: string | number | boolean) => {
    if (x === 1) {
        Assert.equal(10, y);
    }
    if (x === true) {
        Assert.equal("hello", y);
    }
    if (x === "a") {
        Assert.isBoolean(y);
    }

};
fun(1, 10);
fun(true, "hello");
fun("a", true);