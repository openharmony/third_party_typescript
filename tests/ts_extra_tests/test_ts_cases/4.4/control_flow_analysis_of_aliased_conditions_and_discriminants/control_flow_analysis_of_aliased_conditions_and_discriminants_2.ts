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
 description: Different sorts of type guard conditions are preserved. For example, checks on discriminated unions
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type T1 = { name: "x1"; size: number };
type T2 = { name: "x2"; sideLength: number };
type T3 = T1 | T2;
let c: T1 = { name: "x1", size: 2 };
let s: T2 = { name: "x2", sideLength: 2 };
function fun01(shape: T3): number {
    const isx1 = shape.name === "x1";
    if (isx1) {
        return Math.PI * shape.size ** 2;
    } else {
        return shape.sideLength ** 2;
    }
}
Assert.equal(Math.round(fun01(c)), 13);
Assert.equal(fun01(s), 4);
function fun02(shape: T3): number {
    const { name } = shape;
    if (name === "x1") {
        return Math.PI * shape.size ** 2;
    } else {
        return shape.sideLength ** 2;
    }
}
Assert.equal(Math.round(fun02(c)), 13);
Assert.equal(fun02(s), 4);