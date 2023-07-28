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
    when a namespace identifier is referenced as a NamespaceName it denotes a container of namespace and type names, and when a namespace identifier is referenced as a PrimaryExpression it denotes the singleton namespace instance.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

namespace A {
   export interface TypeA {
      AName: string;
      Lv: number;
      UID: number;
   }
   export var player: TypeA = { AName: "Player", Lv: 5, UID: 0x0000A0F0 };
   export var playerRandom: TypeA = { AName: "playerRandom", Lv: getRandomNumber(99), UID: getRandomNumber(0xFFFFFFFF) };
   function getRandomNumber(x: number): number {
      return Math.floor(Math.random() * x);
   }
}
var playerA = A.player;
var playerB = A.playerRandom;
var an = A;
var playerC: A.TypeA = { AName: "PlayerC", Lv: 95, UID: 6250 };
var playerD = an.player;
Assert.equal(playerA.AName, "Player");
Assert.equal(playerA.Lv, 5);
Assert.equal(playerA.UID, 41200);
Assert.equal(playerB.AName, "playerRandom");
Assert.isNumber(playerB.Lv);
Assert.isNumber(playerB.UID);
Assert.equal(playerC.AName, "PlayerC");
Assert.equal(playerC.Lv, 95);
Assert.equal(playerC.UID, 6250);
Assert.equal(playerD.AName, "Player");
Assert.equal(playerD.Lv, 5);
Assert.equal(playerD.UID, 41200);
