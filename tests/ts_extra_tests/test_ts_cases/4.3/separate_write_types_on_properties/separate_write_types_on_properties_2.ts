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
   Be able to write getters and setters with different types in object literals.
 options:
   lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

interface SWTC2 {
    get data(): number;
    set data(val: number | string | boolean);
}

function funSW(): SWTC2 {
    let data = 0;
    return {
        get data(): number {
            return data;
        },
        set data(val: string | number | boolean) {
            if (val === undefined || val === null) {
                data = NaN;
            } else if (typeof val === "number") {
                data = val;
            } else if (typeof val === "string") {
                data = val.length;
            } else if (typeof val === "boolean") {
                if (val === false) {
                    data = 0;
                } else if (val === true) {
                    data = 1;
                }
            }
        },
    };
}

let t = funSW();
t.data = "NARC";
Assert.equal(t.data, 4);

t.data = true;
Assert.equal(t.data, 1);

t.data = 1024;
Assert.equal(t.data, 1024);
