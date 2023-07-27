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
   The following type won't be optimized, since it uses the result of a conditional type by adding it to a union.
   You can introduce a helper that takes an "accumulator" type parameter to make it tail-recursive
 module: ESNext
 isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

type RunObtain<S> = S extends `${infer Char}${infer Rest}`
    ? Char | RunObtain<Rest>
    : never;
type gc = RunObtain<"                getChar">;
var g1: gc = "e";
Assert.isString(g1);

type RunObtain1<S> = RunObtainHelper<S, never>;
type RunObtainHelper<S, Acc> = S extends `${infer Char}${infer Rest}`
    ? RunObtainHelper<Rest, Char | Acc>
    : Acc;

type gch = RunObtainHelper<string, number>;
var g2: gch = 10;
Assert.isNumber(g2);

let g3: RunObtain1<'    NEW'> = ' ';
Assert.equal(g3, ' ');
g3 = 'E';
Assert.equal(g3, 'E');

let g4: RunObtainHelper<'  NARC  ', 'ACC'> = 'ACC';
Assert.equal(g4, 'ACC');
g4 = 'N';
Assert.equal(g4, 'N');