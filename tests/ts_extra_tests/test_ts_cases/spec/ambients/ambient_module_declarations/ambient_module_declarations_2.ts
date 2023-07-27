/// <reference path="ambient_module_declarations_2_0.ts" />
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
    ambient modules are "open-ended" and ambient module declarations with the same string literal name contribute to a single module.
 module: ESNext
 isCurrent: true
 ---*/


import { a2, AMD2IF } from "AMD2";
import { Assert } from "../../../../suite/assert.js"

let amd2: AMD2IF = { a2_1: 1024, a2_2: "AMD2" };
Assert.equal(JSON.stringify(amd2), '{"a2_1":1024,"a2_2":"AMD2"}');

let aa2: typeof a2 = false;
Assert.isFalse(aa2);