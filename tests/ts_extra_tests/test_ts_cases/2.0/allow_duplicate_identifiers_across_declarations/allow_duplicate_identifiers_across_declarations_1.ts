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
 description: TypeScript 2.0 relaxes this constraint and allows duplicate identifiers across blocks, as long as they have identical types.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

interface Skill {
    damage?: number;
}

interface Skill {
    skillName?: string;
    damageType?: string;
    damage?: number;
}

let sa: Skill = {
    damage: 1024,
};

let sb: Skill = {
    skillName: "XOMissile",
    damageType: "XO",
    damage: 128,
};

Assert.equal(sa.damage, 1024);
Assert.equal(sb.damage, 128);
