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
    When an identifier is resolved as a TypeName, only names in scope with a type meaning are considered and other names are ignored.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

var s: string = "TypeScript";
type s = Number;
Assert.equal(s, "TypeScript");

let s0: s = 1408;
Assert.equal(s0, 1408);