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
   Interfaces inherit even the private and protected members of a base class. 
   When a class containing private or protected members is the base type of an interface type, 
   that interface type can only be implemented by that class or a descendant class. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class h_C {
    private h_pri: string;
    constructor(h_pri: string) {
        this.h_pri = h_pri;
    }
    get() {
        return this.h_pri;
    }
    set() {
        this.h_pri = this.h_pri;
    }
}
interface h_I extends h_C {
    choose(): string;
}
class h_c extends h_C implements h_I {
    choose(): string {
        return 'choose';
    }
}
let h_CC = new h_C('private');
Assert.equal(h_CC.get(), 'private');
let h_cc = new h_c('PRIVATE');
Assert.equal(h_cc.get(), 'PRIVATE');