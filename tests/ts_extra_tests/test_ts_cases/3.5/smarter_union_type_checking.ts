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
  In TypeScript 3.5, when assigning to types with discriminant properties like in T, 
  the language actually will go further and decompose types like S into a union of every possible inhabitant type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../suite/assert.js'

{
    type newTest = { mem: string } | { mem: number };
    interface I1{
        num: number;
        boo: newTest;
    }
    interface I2{
        num: number;
        boo: { mem: string };
    }
    interface I3{
        num: number;
        boo: { mem: number };
    }
    let i1: I1 = {
        num: 10,
        boo: { mem: 'member' }
    }
    let i2: I2 | I3 = {
        num: 20,
        boo: { mem: 15 }
    }

    i1 = i2;
    Assert.equal(i1, i2);

    type T1 = { mem1: number, mem2: boolean };
    type T2 = { mem1: number, mem2: true } | { mem1: number, mem2: false };
    let t1: T1 = {
        mem1: 10,
        mem2: true
    }
    let t2: T2 = {
        mem1: 20,
        mem2: false
    }
    t1 = t2;
    Assert.equal(t1, t2);
};