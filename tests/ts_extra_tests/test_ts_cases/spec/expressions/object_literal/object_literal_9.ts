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
    If the PropertyName of a property assignment is a computed property name.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

const x1: "x1" = "x1";
const x2: "x2" = "x2";
const x3 = Symbol("x3");
interface Obj {
    [x1](): string;
    [x2]: string;
    [x3]: string;
}
let obj1: Obj = {
    x1() {
        return "xx1";
    },
    x2: 'xx2',
    [x3]: 'xx3'
};
let obj2 = {
    [x2]: 1
};
let obj3: {
    [x2]: string
} = {
    x2: 'xxx2'
};
Assert.equal(obj1[x1](), "xx1");
Assert.equal(obj1[x2], "xx2");
Assert.equal(obj2[x2], 1);
Assert.equal(obj3[x2], "xxx2");