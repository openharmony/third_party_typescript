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

const enum CED {
    None = -1,
    False,
    True = 1,
    DEF = 1024,
    Ver = "1.0.1",
}
Assert.equal(CED.None, -1);
Assert.equal(CED.False, 0);
Assert.equal(CED.True, 1);
Assert.equal(CED.DEF, 1024);
Assert.equal(CED["None"], -1);
Assert.equal(CED["False"], 0);
Assert.equal(CED["True"], 1);
Assert.equal(CED["DEF"], 1024);
Assert.equal(CED.Ver, "1.0.1");

function toLength(str: string): number {
    return str.length;
}

enum ABCList {
    A,
    B,
    C = "string".length,
    D = 10,
    E,
    F = ~17,
    G = 0x0f << 0x02,
    H = 0xff & 0xaa,
    I = E | F,
    J = toLength(ABCList[11]),
}
Assert.equal(ABCList.A, 0);
Assert.equal(ABCList.B, 1);
Assert.equal(ABCList.C, 6);
Assert.equal(ABCList.D, 10);
Assert.equal(ABCList.E, 11);
Assert.equal(ABCList.F, -18);
Assert.equal(ABCList.G, 60);
Assert.equal(ABCList.H, 170);
Assert.equal(ABCList.I, -17);
Assert.equal(ABCList.J, 1);