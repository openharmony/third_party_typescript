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
   TypeScript 2.8 adds the ability for a mapped type to either add or remove a particular modifier. 
   Specifically, a readonly or ? property modifier in a mapped type can now be prefixed with either + or - to indicate that the modifier should be added or removed.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../suite/assert.js";

type RU = { +readonly [key in "A" | "B" | "C"]-?: number };
type NR = { -readonly [key in 1 | 2 | 3]+?: string };

let ru: RU = { 'A': 1, 'B': 2, 'C': 3 };
let nr: NR = { 1: 'A', 3: 'C' };
nr[1] = 'Z';
Assert.equal(JSON.stringify(ru), '{"A":1,"B":2,"C":3}');
Assert.equal(JSON.stringify(nr), '{"1":"Z","3":"C"}');
