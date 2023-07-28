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
  That's exactly what TypeScript 3.7 introduces. At the "top level" of a type alias, TypeScript will defer resolving type arguments to permit these patterns.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

type JSONType =
    | string
    | number
    | boolean
    | null
    | JsonObjectX
    | JsonArray;

interface JsonObjectX {
    [property: string]: JSONType;
}

interface JsonArray extends Array<JSONType> { }
const myJson: JSONType = ["a", 2, true, null, {
    "Damage": 1024,
    "DamageType": "XO",
}, []];

Assert.equal(typeof myJson, "object");