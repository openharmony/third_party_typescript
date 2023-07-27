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
   TypeScript 3.4 introduces new support for readonly tuples.
   a readonly tuple with elements 'T1, T2, … Tn' extends from ReadonlyArray'< T1 | T2 | … Tn >'.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../suite/assert.js"

let arr1: ReadonlyArray<number | string | boolean> = [10, 'b', false];
let arr2: readonly [number, string, boolean] = [5, 'a', true];

Assert.isNumber(arr1[0]);
Assert.isNumber(arr2[0]);
Assert.isString(arr1[1]);
Assert.isString(arr2[1]);
Assert.isBoolean(arr1[2]);
Assert.isBoolean(arr2[2]);