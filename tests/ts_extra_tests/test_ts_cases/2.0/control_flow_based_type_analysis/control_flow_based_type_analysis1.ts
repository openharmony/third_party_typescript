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
   the type checker analyses all possible flows of control in statements and expressions to produce the most specific type possible (the narrowed type) at any given location for a local variable or parameter that is declared to have a union type.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

let arg = Math.random() < 0.5 ? 5 : 'a';
if (typeof arg === 'string') {
    Assert.isString(arg);
    arg = 3;
    Assert.isNumber(arg);
}

Assert.isNumber(arg);


function func(x: string | number) {
    if (typeof x === "number") {
        return "10";
    }

    return 10
}

Assert.isNumber(func("10"));
Assert.isString(func(10));
