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
    When a template string is contextually typed by a string-literal-like type it will try to give that expression a template type.
    This also kicks in when inferring types, and the type parameter extends string.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

function funStr(s: string): `hello ${string}` {
    return `hello ${s}`;
}
var b = funStr("s");
Assert.equal(b, "hello s");

let s: string = "s";
function f<T extends string>(x: T): T {
    return x;
}
let x: `hello ${string}` = f(`hello ${s}`);
Assert.equal(x, "hello s");
