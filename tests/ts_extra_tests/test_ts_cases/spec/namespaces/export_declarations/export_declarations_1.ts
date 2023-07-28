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
    an export declaration declares an externally accessible namespace member. An export declaration is simply a regular declaration prefixed with the keyword export.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

namespace ED1 {
    export interface Weapon { WName: string, Damage: number }
    export var def = 1024;
    export class Point {
        x: number = 0;
        y: number = 0;
    }
    export function exampleName(str: string): string {
        return str;
    }
    export enum Color {
        RED = 0xFF0000,
        GREEN = 0x00FF00,
        BLUE = 0x0000FF,
    }
}
var weapon1: ED1.Weapon = { WName: "40mmAT", Damage: 40 };
var def1 = ED1.def;
Assert.equal(weapon1.WName, "40mmAT");
Assert.equal(weapon1.Damage, 40);
Assert.equal(def1, 1024);
let myclass = new ED1.Point();
Assert.equal(myclass.x, 0);
Assert.equal(myclass.y, 0);
let examplename = ED1.exampleName("a");
Assert.equal(examplename, "a");
Assert.equal(ED1.Color.RED, 0xFF0000);