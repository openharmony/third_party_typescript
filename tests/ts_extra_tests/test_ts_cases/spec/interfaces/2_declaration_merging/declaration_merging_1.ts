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
   When a generic interface has multiple declarations, all declarations must have identical type parameter lists,
   i.e. identical type parameter names with identical constraints in identical order.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

{
    interface Ds<T> {
        createE1(a: T): number;
    }

    interface Ds<T> {
        createE2(a: T): number;

        createE3(a: T): number;
    }

    let name: Ds<number | string | boolean> = {
        createE1(a: string): number {
            return 0
        },
        createE2(a: boolean): number {
            return 0
        },
        createE3(a: number): number {
            return 0
        }
    };
    let src :Ds<number | string> = {
        createE1(a: number): number {
            return 1
        },
        createE2(a: number | string): number {
            return 2;
        },
        createE3(a: number | string): number {
            return 3;
        },
    }

    class Get {
        static getName(name: Ds<number | string | boolean>): Ds<number | string | boolean> {
            return name;
        };
        static getSrc(src :Ds<number | string>){
            return src;
        }
    }

    Assert.equal(Get.getSrc(src).createE1(1),1);
    Assert.equal(Get.getSrc(src).createE2(""),2);
    Assert.equal(Get.getName(src).createE3("233"), 3);
    Assert.equal(Get.getName(name).createE1(''), 0);
    Assert.equal(Get.getName(name).createE3(0), 0);
    Assert.equal(Get.getName(name).createE2(true), 0);
};