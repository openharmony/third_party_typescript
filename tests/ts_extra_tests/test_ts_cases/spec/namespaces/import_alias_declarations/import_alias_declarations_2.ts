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
    when an import statement includes an export modifier, all meanings of the local alias are exported.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

namespace IAD1 {
    export var lv: number = 5;
    export interface GGI {
        UIName: string;
        Cost: number;
    }
}
namespace IAD2 {
    import I1 = IAD1;
    import I2 = IAD1.GGI;
    export var i2 = I1.lv * 2;
    export interface GI extends I2 {
        Strength: number;
    }
}
var i1 = IAD2.i2;
var gi: IAD2.GI = { UIName: "GI", Cost: 200, Strength: 100 };
Assert.equal(i1, 10);
Assert.equal(gi.UIName, "GI");
Assert.equal(gi.Cost, 200);
Assert.equal(gi.Strength, 100);

namespace IAD3 {
    export var i = 0;
    interface U {
        times: number;
    }
    var u1: U = { times: 5 };
    export function ux5() {
        return u1.times * 5;
    }
}
export namespace IAD4 {
    export import I3 = IAD3;
}
Assert.equal(IAD4.I3.i, 0);
Assert.equal(IAD4.I3.ux5(), 25);
