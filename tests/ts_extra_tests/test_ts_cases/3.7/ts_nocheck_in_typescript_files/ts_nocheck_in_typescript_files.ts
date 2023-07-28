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
  TypeScript 3.7 allows us to add // @ts-nocheck comments to the top of TypeScript files to disable semantic checks. Historically this comment was only respected in JavaScript source files in the presence of checkJs, but we’ve expanded support to TypeScript files to make migrations easier for all users.
 module: ESNext
 isCurrent: true
---*/


// @ts-nocheck

import { Assert } from "../../../suite/assert.js";

function add(a, b) {
    let s = a + b;
    return s;
}
Assert.isTrue(isNaN(add()));
Assert.equal(add("NARC"), "NARCundefined");
Assert.isTrue(isNaN(add(1408)));
Assert.equal(add(1, 2), 3);
Assert.equal(add('A', 'B'), "AB");
Assert.equal(add(10, "false"), "10false");
Assert.equal(add(10, true), 11);
