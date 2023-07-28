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
    if the object literal is contextually typed, 
    if the contextual type contains a numeric index signature, 
    and if the property assignment specifies a numeric property name, 
    the property assignment is contextually typed by the type of the numeric index signature.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let obj1: {
    1: string;
    [key: number]: string;
} = {
    1: 'string',
    2: 'number',
    3: 'boolean'
}
Assert.isString(obj1[2]);
Assert.isString(obj1[3]);

interface I{
    1: string;
    [key: number]: string;
}
let obj2 = {} as I;
obj2 = {
    1: 'string',
    2: 'number',
    3: 'boolean'
}
Assert.isString(obj2[2]);
Assert.isString(obj2[3]);