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
    if an ambient module declaration includes an export assignment, it is an error for any of the declarations within the module to specify an export modifier. 
    if an ambient module declaration contains no export assignment, entities declared in the module are exported regardless of whether their declarations include the optional export modifier.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

export declare module m1 {
   interface I1 {
      a3_1: boolean;
      a3_2: number;
   }
   var AMD2Var1: string;
}
declare module m2 {
   export interface I2 {
      a3_1: boolean;
      a3_2: string;
   }
   export var AMD2Var1: string;
}
var am3_1: m1.I1 = { a3_1: false, a3_2: 0 };
var am3_2: m2.I2 = { a3_1: true, a3_2: "T" };
Assert.equal(JSON.stringify(am3_1), '{"a3_1":false,"a3_2":0}');
Assert.equal(JSON.stringify(am3_2), '{"a3_1":true,"a3_2":"T"}');