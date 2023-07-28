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
     Create an object type variable
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

let obj5 = new Object({ Damage: 1024, DamageType: 'XO' });
Assert.equal(JSON.stringify(obj5), '{"Damage":1024,"DamageType":"XO"}');

type ColorOBJ = { Color: [number, number, number], ColorName: string };
let obj6: ColorOBJ = { Color: [255, 0, 0], ColorName: 'Red' };
Assert.equal(JSON.stringify(obj6), '{"Color":[255,0,0],"ColorName":"Red"}');

interface Weapon {
    Damage: number;
    DamageType: string;
}
let obj7: Weapon = { Damage: 333, DamageType: 'EXP' };
Assert.equal(JSON.stringify(obj7), '{"Damage":333,"DamageType":"EXP"}');

let obj8: object = { A: 1 };
Assert.equal(JSON.stringify(obj8), '{"A":1}');