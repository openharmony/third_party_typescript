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
    TypeScript 4.9 supports an upcoming feature in ECMAScript called auto-accessors.
 options:
    target: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

class NormalClass {
    #str: string;
    constructor(str: string) {
        this.#str = str;
    }
    get Str(): string {
        return this.#str;
    }
    set Str(str: string) {
        this.#str = str;
    }
}
class AutoClass {
    str: string;
    constructor(str: string) {
        this.str = str;
    }
}

let c1 = new NormalClass("0");
let c2 = new AutoClass("0");
c1.Str = "NormalClass";
Assert.equal(c1.Str, "NormalClass");
c2.str = "AutoClass";
Assert.equal(c2.str, "AutoClass");
