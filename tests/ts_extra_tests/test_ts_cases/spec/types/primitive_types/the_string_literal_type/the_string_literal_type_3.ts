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
    String literal types are permitted only in that context and nowhere else.
    string literals no longer always have the type string.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let HELLO: "HELLO" = "HELLO";
let WORLD: "WORLD" = "WORLD";

let hello = HELLO.toLowerCase();
Assert.equal(hello, "hello");

let HELLOWORLD = HELLO + WORLD;
Assert.equal(HELLOWORLD, "HELLOWORLD");

let a: "foo" | number = "foo";
Assert.equal(a, 'foo');