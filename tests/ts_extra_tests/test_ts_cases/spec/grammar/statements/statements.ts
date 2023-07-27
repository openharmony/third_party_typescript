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
    this appendix contains a summary of the grammar found in the main document.
    typescript grammar is a superset of the grammar defined in the ECMAScript 2015 Language Specification (specifically, the ECMA-262 Standard, 6th Edition) and this appendix lists only productions that are new or modified from the ECMAScript grammar.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface Skill {
    SkillName: string;
    Damage: number;
    Data: string;
}
let aoe: Skill = { SkillName: "AoE", Damage: 495, Data: "AreaFire" };
Assert.equal(aoe.SkillName, "AoE");
Assert.equal(aoe.Damage, 495);
Assert.equal(aoe.Data, "AreaFire");

type NumStr = number | string;
let ns: NumStr;
ns = 1024;
Assert.isNumber(ns);
ns = "A";
Assert.isString(ns);

enum Color {
    Red = 0xFF0000,
    Green = 0x00FF00,
    Bule = 0x0000FF,
}
Assert.equal(Color.Green, 0x00FF00);

let aaa;
aaa = true;
Assert.isBoolean(aaa);
aaa = 1408;
Assert.isNumber(aaa);
let abc: string;
abc = "ABC";
Assert.isString(abc);

type TF = -1 | 0 | 1;
let tf0: TF = 0;
let tf1: TF = 1;
let tf2: TF = -1;
Assert.equal(tf0, 0);
Assert.equal(tf1, 1);
Assert.equal(tf2, -1);
