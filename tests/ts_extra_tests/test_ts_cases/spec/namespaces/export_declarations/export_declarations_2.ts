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
    the members of a namespace's export declaration space constitute the namespace's export member set. 
    a namespace's instance type is an object type with a property for each member in the namespace's export member set that denotes a value.
 module: ESNext
 isCurrent: true
 ---*/

import { Assert } from '../../../../suite/assert.js'


namespace ED2 {
    export var def = 1024;
    interface Weapon { WName: string, Damage: number }
    export var weapon1: Weapon = { WName: "Lightting", Damage: 200 }
    export var tf = "False";
}
var ed2 = ED2;
var ed2_1 = ed2.def;
var ed2_2 = ed2.weapon1;
var ed2_3 = ed2.tf;
Assert.equal(typeof ed2, "object");
Assert.isNumber(ed2_1);
Assert.equal(typeof ed2_2, "object");
Assert.isString(ed2_3);
