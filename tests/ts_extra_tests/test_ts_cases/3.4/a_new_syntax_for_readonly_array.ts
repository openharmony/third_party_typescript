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
   TypeScript 3.4 introduces a new syntax for ReadonlyArray using a new readonly modifier for array types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../suite/assert.js"

let arr1: ReadonlyArray<string> = ["1", "2"];
let arr2: readonly string[] = ["1", "2"];

Assert.equal(arr1[1], "2");
Assert.equal(arr2[1], "2");
