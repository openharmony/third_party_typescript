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
   Function declarations are extended to permit the function body to be omitted in overload declarations.
   a function can have at most one implementation.
   When a function has both overloads and an implementation, the overloads must precede the implementation
   and all of the declarations must be consecutive with no intervening grammatical elements.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function add(a: number, b: number): number;
function add(a: string, b: number): string;
function add(a: string, b: string): string;
function add(arg1: string | number, arg2: string | number) {
    if (typeof arg1 === "number" && typeof arg2 === "number") {
        return arg1 + arg2;
    }

    if (typeof arg1 === "string" || typeof arg2 === "string") {
        return `${arg1}${arg2}`;
    }
}
Assert.equal(add(0, 1), 1);
Assert.equal(add("0", 1), "01");
Assert.equal(add("0", "1"), "01");