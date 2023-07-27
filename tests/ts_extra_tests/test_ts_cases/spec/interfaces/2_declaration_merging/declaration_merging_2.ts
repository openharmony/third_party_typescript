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
   multiple declarations is equivalent to the following single declaration.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

{
    interface D1 {
        createE1(a: string): number;
    }

    interface D1 {
        createE2(a: boolean): number;

        createE3(a: number): number;
    }

    interface DAssert {
        createE4(a: string): number;

        createE5(a: boolean): number;

        createE6(a: number): number;
    }

    let name: D1 & DAssert = {
        createE1(a: string): number {
            return 0
        },
        createE2(a: boolean): number {
            return 0
        },
        createE3(a: number): number {
            return 0
        },
        createE4(a: string): number {
            return 0
        },
        createE5(a: boolean): number {
            return 0
        },
        createE6(a: number): number {
            return 0
        }
    };

    class Class {
        static getName(name: D1 & DAssert): D1 & DAssert {
            return name;
        }
    }

    Assert.equal(Class.getName(name).createE1(''), 0);
    Assert.equal(Class.getName(name).createE3(0), 0);
    Assert.equal(Class.getName(name).createE2(true), 0);
    Assert.equal(Class.getName(name).createE4(''), 0);
    Assert.equal(Class.getName(name).createE5(true), 0);
    Assert.equal(Class.getName(name).createE6(0), 0);
};