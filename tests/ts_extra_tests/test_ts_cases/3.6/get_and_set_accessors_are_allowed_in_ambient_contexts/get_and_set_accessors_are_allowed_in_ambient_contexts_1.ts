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
description: users can write getters and setters in ambient contexts in TypeScript 3.6 and later.
module: ESNext
isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"
import { C } from "./test.js"

let obj: C = { m: 1 };

Assert.equal(1, obj.m);

class mC {
    mem: string;
    constructor(mem: string) {
        this.mem = mem;
    }
    get mC_mem() {
        return this.mem;
    }
    set mC_mem(str:string) {
        this.mem = str;
    }
}
let eg = new mC('member');
Assert.equal(eg.mC_mem, 'member');
