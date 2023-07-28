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
    There are a few rules when using labeled tuples. 
    For one, when labeling a tuple element, all other elements in the tuple must also be labeled.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type A01 = [name: string, age: number];
type A02 = [name?: string, age?: number];

let a1: A01 = ['NARC', 0];
let a2_1: A02 = [];
let a2_2: A02 = ['ACDC'];
Assert.equal(JSON.stringify(a1), '["NARC",0]');
Assert.equal(JSON.stringify(a2_1), '[]');
Assert.equal(JSON.stringify(a2_2), '["ACDC"]');