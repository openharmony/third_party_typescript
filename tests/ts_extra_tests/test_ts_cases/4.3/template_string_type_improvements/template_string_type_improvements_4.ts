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
    TypeScript add better inference capabilities
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

function funStr01<V extends string>(arg: `*${V}*`): `*${V}*` {
    return arg;
}
function funStr02<T extends string>(s: string, n: number, b: boolean, t: T) {
    let x1 = funStr01("*hello*");
    Assert.equal(x1, "*hello*");

    let x2 = funStr01("**hello**");
    Assert.equal(x2, "**hello**");

    let x3 = funStr01(`*${s}*` as const);
    Assert.equal(x3, "*s*");

    let x4 = funStr01(`*${n}*` as const);
    Assert.equal(x4, "*5*");

    let x5 = funStr01(`*${b}*` as const);
    Assert.equal(x5, "*true*");

    let x6 = funStr01(`*${t}*` as const);
    Assert.equal(x6, "*t*");

    let x7 = funStr01(`**${s}**` as const);
    Assert.equal(x7, "**s**");
}

funStr02("s", 5, true, "t");
