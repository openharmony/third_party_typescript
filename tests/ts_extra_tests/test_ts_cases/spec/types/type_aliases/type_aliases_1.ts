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
    A type alias serves as an alias for the type specified in the type alias declaration.
    A type alias declaration can introduce a name for any kind of type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

type MyString = string;
let x: MyString = 'x';
Assert.isString(x);

type MyUnionType = number | string | boolean;
let y: MyUnionType = 10;
Assert.isNumber(y);
y = '10';
Assert.isString(y);
y = true;
Assert.isBoolean(y);

type MyInterType = object & { name: string };
let z: MyInterType = { name: 'xiao' };
Assert.equal(typeof z, 'object');