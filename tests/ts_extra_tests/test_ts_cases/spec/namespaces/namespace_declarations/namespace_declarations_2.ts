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
    namespaces are either instantiated or non-instantiated. A non-instantiated namespace is a namespace containing only interface types, type aliases, and other non-instantiated namespace. 
    an instantiated namespace is a namespace that doesn't meet this definition. In intuitive terms, an instantiated namespace is one for which a namespace instance is created, whereas a non-instantiated namespace is one for which no code is generated.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

namespace NonInstantiated {
   export interface A {
      TName: string;
      Ver: number;
   }
   export type TF = boolean | number;
   export namespace NI {
      export interface B {
         SkillName: string;
         Damage: number;
      }
      export type StrNum = string | number;
   }
}
var ni1: NonInstantiated.A = { TName: "Non", Ver: 1.0 };
var ni2: NonInstantiated.NI.StrNum = "ni2";
Assert.equal(ni1.Ver, 1.0);
Assert.equal(ni2, "ni2");

namespace Instantiated {
   export function returnName() {
      return "Instantiated";
   }
   export var nsname: string = "Instantiated";
}
Assert.equal(Instantiated.returnName(), "Instantiated");
Assert.equal(Instantiated.nsname, "Instantiated");