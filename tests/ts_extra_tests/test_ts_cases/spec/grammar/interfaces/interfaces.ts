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
    this appendix contains a summary of the grammar found in the main document.
    typescript grammar is a superset of the grammar defined in the ECMAScript 2015 Language Specification (specifically, the ECMA-262 Standard, 6th Edition) and this appendix lists only productions that are new or modified from the ECMAScript grammar.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface X {
    x: number;
}
interface Y {
    y: number;
}
interface Z {
    z: number;
}
interface PointXYZ extends X, Y, Z {
    toJSON(): string;
}
let pa: PointXYZ = {
    x: 3,
    y: 4,
    z: 5,
    toJSON() {
        let pArr = [this.x, this.y, this.z];
        return JSON.stringify(pArr);
    },
}
Assert.equal(pa.toJSON(), "[3,4,5]");