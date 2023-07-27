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
    Array literals may be used to create values of tuple types.
    the members of an array type whose element type is the union type of the tuple element types
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let cc: [number, string, boolean];
cc = [12, "abcd", true];
let index: number = 0;
let x = cc[index];
x = 12;
Assert.equal(x, 12);
x = false;
Assert.equal(x, false);
x = "string";
Assert.equal(x, "string");