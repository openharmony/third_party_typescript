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
    To deepen the connection between parameter lists and tuple types,
    the syntax for rest elements and optional elements mirrors the syntax for parameter lists.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type Weapon = [Damage: number, DamageType?: string, ...rest: any[]];
function getWeaponJSON(weapon: Weapon): string {
   let len: number = weapon.length;
   let obj: { [key: string ]: any } = { 'Damage': 0 };
   for (let i = 0; i < len; i++) {
      if (i == 0) {
         obj['Damage'] = weapon[i];
      } else if (i == 1) {
         obj['DamageType'] = weapon[i];
      }
   }
   return JSON.stringify(obj);
}
let weapon1: Weapon = [1024, 'XO'];
let weapon2: Weapon = [100];
Assert.equal(getWeaponJSON(weapon1), '{"Damage":1024,"DamageType":"XO"}');
Assert.equal(getWeaponJSON(weapon2), '{"Damage":100}');
