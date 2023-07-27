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
    A function expression introduces a new dynamically bound this, whereas an arrow function expression preserves the this of its enclosing context.
    Arrow function expressions are particularly useful for writing callbacks, which otherwise often have an undefined or unexpected this.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class ToAlert {
    information = "Have a good time!";
    F() {
        let for_this = this;
        for_this.information = "sad boy";
        Assert.equal(for_this.information, "sad boy")
    }
};
let a = new ToAlert();
a.F();
a.information = "boy!";
Assert.isString(a.information);
Assert.equal(a.information, "boy!");