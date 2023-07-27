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
    when a rest parameter has a tuple type, the tuple type is expanded into a sequence of discrete parameters.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function rfun1(a: string, b: number, c: boolean, ...v: [number, string, boolean]) {
    return { number: v[0], string: v[1], boolean: v[2] };
}
function rfun2(a: string, b: number, c: boolean, v1: number, v2: string, v3: boolean) {
    return { number: v1, string: v2, boolean: v3 };
}
var r1 = rfun1("a", 1, true, 1, "rfun", true);
var r2 = rfun2("a", 1, true, 1, "rfun", true);
var jr1 = JSON.stringify(r1);
var jr2 = JSON.stringify(r2);
Assert.equal(jr1, jr2);