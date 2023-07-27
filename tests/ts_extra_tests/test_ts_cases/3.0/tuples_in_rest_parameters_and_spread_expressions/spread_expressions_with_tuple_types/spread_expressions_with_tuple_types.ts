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
    when a function call includes a spread expression of a tuple type as the last argument, the spread expression corresponds to a sequence of discrete arguments of the tuple element types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function fun1(...v: [number, string, boolean]) {
    return { number: v[0], string: v[1], boolean: v[2] };
}
const args: [number, string, boolean] = [11, "str", true];
var v1 = fun1(...args);
var v2 = fun1(args[0], args[1], args[2]);
var v3 = fun1(11, "str", true);
var jv1 = JSON.stringify(v1);
var jv2 = JSON.stringify(v2);
var jv3 = JSON.stringify(v3);
var flag = false;
if (jv1 === jv2 && jv2 === jv3 && jv3 === jv1) {
    flag = true;
}
Assert.isTrue(flag);