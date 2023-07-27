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
   Using this ability, lib.d.ts now has a new Required<T> type. 
   This type strips ? modifiers from all properties of T, thus making all properties required.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../suite/assert.js";

type ABCU = { 'A'?: number, 'B'?: number, 'C'?: number, 'D'?: number };
type ABC = Required<ABCU>;

let abcu: ABCU = { 'C': 3 };
let abc: ABC = { A: 1, B: 2, C: 3, D: 4 };
Assert.equal(JSON.stringify(abcu), '{"C":3}');
Assert.equal(JSON.stringify(abc), '{"A":1,"B":2,"C":3,"D":4}');