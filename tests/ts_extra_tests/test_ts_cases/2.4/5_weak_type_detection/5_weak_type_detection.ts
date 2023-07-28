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
 description: TypeScript 2.4 introduces the concept of "weak types". Any type that contains nothing but a set of all-optional properties is considered to be weak.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

interface I {
    month?: string;
    type?: number;
    value?: number;
}

function check(i: I) {
    if (i !== undefined && i !== null) {
        return true;
    } else {
        return false;
    }
}

const obj1 = {
    month: "January"
};
Assert.isTrue(check(obj1));


const obj2: {
    [index: string]: { mem: string };
} = {};
Assert.isTrue(check(obj2));

const obj3 = {
    str: "string",
    trueOrFalse: true
} as I;
Assert.isTrue(check(obj3));
