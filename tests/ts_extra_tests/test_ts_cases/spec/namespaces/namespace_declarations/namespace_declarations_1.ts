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
    namespaces are declared using the namespace keyword, 
    but for backward compatibility of earlier versions of TypeScript a module keyword can also be used.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

namespace A {
   export interface TA {
      TName: string;
      Ver: number;
   }
}
var varA: A.TA = { TName: "TA", Ver: 1.5 }
Assert.equal(varA.TName, "TA");
Assert.equal(varA.Ver, 1.5);

module B {
   export interface TB {
      SkillName: string;
      Damage: number;
   }
}
var varB: B.TB = { SkillName: "OverKill", Damage: 1024 };
Assert.equal(varB.SkillName, "OverKill");
Assert.equal(varB.Damage, 1024);
