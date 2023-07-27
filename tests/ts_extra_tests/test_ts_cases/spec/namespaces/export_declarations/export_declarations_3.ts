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
    an exported member depends on a (possibly empty) set of named types. Those named types must be at least as accessible as the exported member, or otherwise an error occurs.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface WeaponDamage { DamageType: string, Damage: number }
namespace ED3 {
    export interface WeaponData { WName: string, ROT: number, Range: number }
    export interface Weapon { WeaponDamage: WeaponDamage, WeaponData: WeaponData }
    export function getWeapon(Weapon: Weapon) {
        return "WeaponName = " + Weapon.WeaponData.WName + "\n" + "DamageType = " + Weapon.WeaponDamage.DamageType + "\n" + "Damage = " + Weapon.WeaponDamage.Damage + "\n" + "ROT = " + Weapon.WeaponData.ROT + "\n" + "Range = " + Weapon.WeaponData.Range;
    }
}
var weapon_damage: WeaponDamage = { DamageType: "EXPLODE", Damage: 1024 };
var weapon_data: ED3.WeaponData = { WName: "AntiTankMissiles", ROT: 75, Range: 16 };
var weapon: ED3.Weapon = { WeaponData: weapon_data, WeaponDamage: weapon_damage };
var weaponStr = ED3.getWeapon(weapon);
Assert.isString(weaponStr);
