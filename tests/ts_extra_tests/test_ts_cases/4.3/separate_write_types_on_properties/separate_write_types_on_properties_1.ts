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
    TypeScript 4.3 allows to specify types for reading and writing to properties.
    When considering how two properties with the same name relate to each other, TypeScript will only use the "reading" type. 
    "Writing" types are only considered when directly writing to a property.
 options: 
    target: es2015
    lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

class SWTC1 {
    #data = 0;
    get data(): number {
        return this.#data;
    }
    set data(val: string | number | boolean) {
        if (val === undefined || val === null) {
            this.#data = NaN;
        } else if (typeof val === "number") {
            this.#data = val;
        } else if (typeof val === "string") {
            this.#data = val.length;
        } else if (typeof val === "boolean") {
            if (val === false) {
                this.#data = 0;
            } else if (val === true) {
                this.#data = 1;
            }
        }
    }
}

let c = new SWTC1();
let n: number = 0;

c.data = "hello";
n = c.data;
Assert.equal(n, 5);

c.data = 42;
n = c.data;
Assert.equal(n, 42);

c.data = true;
n = c.data;
Assert.equal(n, 1);
