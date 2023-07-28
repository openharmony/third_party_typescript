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
    import alias declarations are used to create local aliases for entities in other namespaces.
    an EntityName consisting of a single identifier is resolved as a NamespaceName and is thus required to reference a namespace. The resulting local alias references the given namespace and is itself classified as a namespace.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

namespace N1 {
    interface N2 { hn: number }
    export import hY = N2;
    import hZ = N2.hX;
    export var vb: hZ = { hs: "v" };
}
namespace N2 {
    export interface hX { hs: string }
    export import va = N1.vb;
}
var v1: N1.hY.hX = N1.vb;
var v2 = N2.va;
let iadFlag: boolean = false;
if (v1 == v2) {
    iadFlag = true;
}
Assert.isTrue(iadFlag);
namespace N3 {
    export namespace N4 {
        export class Point {
            x: number = 0;
            y: number = 0;
        }
    }
}
import n1 = N3.N4;
let p = new n1.Point();
Assert.equal(p.x, 0);
Assert.equal(p.y, 0);