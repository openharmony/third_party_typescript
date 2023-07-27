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
    typescript recently introduced a way to add extends constraints to infer type variables in conditional types.
    if these infer types appear in a template string type and are constrained to a primitive type, TypeScript will now try to parse out a literal type.
    this can now better convey what a library will do at runtime, and give more precise types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type myType<T, V> = T extends [infer U extends V, ...unknown[]] ? U : false;
function func<T, V>(arr: any[], x: myType<[T, ...any], V>) {
    arr[0] = x;
    return arr;
}
let arr = ["A", "B", "C"];
let first = func<number, number>(arr, 65);
Assert.equal(JSON.stringify(first), "[65,\"B\",\"C\"]");

type S = "string" extends `${infer T extends string}` ? T : false;
let s: S = "string";
Assert.equal(s, "string");