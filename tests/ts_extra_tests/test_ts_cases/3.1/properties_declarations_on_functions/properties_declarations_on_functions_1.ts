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
  TypeScript 3.1 brings the ability to define properties on function declarations and const-declared functions, 
  simply by assigning to properties on these functions in the same scope.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function add<T, K>(a: T, b: K) {
    if (typeof a == "number" && typeof b == "number") {
        return a + b;
    } else {
        return `${a}${b}`;
    }
}

add.description = "this";
add.aa = 0;
add.bb = false;

Assert.equal(add.description, "this");
Assert.equal(add.aa, 0);
Assert.equal(add.bb, false);

add.showInfo = () => {
    return 1;
};
Assert.equal(add.showInfo(), 1);


const link = () => {
    return 11;
};

link.aa = 0;
link.bb = false;
link.cc = "this";
link.showInfo = () => {
    return 1;
};
Assert.equal(link.cc, "this");
Assert.equal(link.aa, 0);
Assert.equal(link.bb, false);
Assert.equal(link.showInfo(), 1);
