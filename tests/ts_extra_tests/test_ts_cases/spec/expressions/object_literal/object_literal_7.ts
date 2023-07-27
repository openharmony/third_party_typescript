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
    When an object literal is contextually typed by a type that includes a string/numeric index signature, 
    the resulting type of the object literal includes a string/numeric index signature with the union type 
    of the types of the properties declared in the object literal, or the Undefined type if the object literal is empty. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface I1{
    1: string;
    [key: string]: string;
}
let obj1: I1 = {
    1: 'number',
    'str': 'string'
}
Assert.isString(obj1[1]);
Assert.isString(obj1['str']);
let obj2: I1 = {
    1: 'number'
}
Assert.isString(obj2[1]);
Assert.isUndefined(obj2['str']);

interface I2{
    'string': string;
    [key: number]: string;
}
let obj3: I2 = {
    'string': 'number',
    1: 'string'
}
Assert.isString(obj3['string']);
Assert.isString(obj3[1]);
let obj4: I2 = {
    'string': 'number'
}
Assert.isString(obj4['string']);
Assert.isUndefined(obj4[1]);