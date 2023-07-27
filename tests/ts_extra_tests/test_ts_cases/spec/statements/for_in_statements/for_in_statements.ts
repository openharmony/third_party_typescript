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
 description: test for (v in expr) statement
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

let arr = [4, 5, 6];

let i = 0;
for (let index in arr) {
    i++;
}
Assert.equal(3, i);

const person = {
    name: "opharmony",
    role: "tools",
    age: 3,
};

i = 0;
for (const key in person) {
    i++;
}
Assert.equal(3, i);

interface ABC {
    a: number
    b: string
}

const x: ABC = {
    a: 1,
    b: '2'
}

i = 0;
for (let key in x) {
    i++;
}
Assert.equal(2, i);

i = 0;
for (var key in x) {
    i++;
}
Assert.equal(2, i);