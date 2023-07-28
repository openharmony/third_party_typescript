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
    TypeScript can now better-relate, and infer between, different template string types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

let sn1: `${number}-${number}-${number}`;
let sn2: `1-2-3` = `1-2-3`;
let sn3: `${number}-2-3` = `${4}-2-3`;
let sn4: `1-${number}-3` = `1-${5}-3`;
let sn5: `1-2-${number}` = `1-2-${6}`;
let sn6: `${number}-2-${number}` = `${7}-2-${8}`;

sn1 = sn2;
Assert.equal(sn1, "1-2-3");
sn1 = sn3;
Assert.equal(sn1, "4-2-3");
sn1 = sn4;
Assert.equal(sn1, "1-5-3");
sn1 = sn5;
Assert.equal(sn1, "1-2-6");
sn1 = sn6;
Assert.equal(sn1, "7-2-8");
