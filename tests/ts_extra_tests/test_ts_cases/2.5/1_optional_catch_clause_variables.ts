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
 description: TypeScript 2.5 implements a new ECMAScript feature that allows users to omit the variable in catch clauses.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../suite/assert.js'

function func(str: string) {
    try {
        return JSON.parse(str);
    } catch {
        return str + " is Error JSON";
    }
}

let arrjson: string = '[1,3,5]';
let arr = func(arrjson);
Assert.equal(arr[0], 1);
Assert.equal(arr[1], 3);
Assert.equal(arr[2], 5);

let str: string = 'string';
Assert.equal(func(str), 'string is Error JSON');
