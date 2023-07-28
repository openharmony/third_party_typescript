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
 description: Expressions controlling 'if' statements can be of any type (and not just type Boolean).
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

let a = true;

if (a) {
    a = false;
}

Assert.isFalse(a);

let b = "string b";
if (b) {
    b = "string b 2";
}
Assert.equal("string b 2", b);

let c = 1;
if (c) {
    c = 2
}
Assert.equal(2, c);

var myObject = {
    d: 4
}
if (myObject) {
    myObject.d = 5;
}
Assert.equal(5, myObject.d);

let myObject2 = 1;
if (myObject2 == 2) {
    myObject2 = 3;
}
Assert.equal(1, myObject2);

let und: undefined;
let flag = false;
if (und) {
    flag = true;
} else {
    flag = false;
}
Assert.isFalse(flag);