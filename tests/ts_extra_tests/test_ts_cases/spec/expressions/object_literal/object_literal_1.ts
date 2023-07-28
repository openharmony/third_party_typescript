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
    If the object literal is contextually typed and the contextual type contains a property with a matching name, 
    the property assignment is contextually typed by the type of that property.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let obj1: {
    str: string;
    num: number;
    bool: boolean;
} = {
    str: 'string',
    num: 5,
    bool: true
}
Assert.isString(obj1.str);
Assert.isNumber(obj1.num);
Assert.isBoolean(obj1.bool);

interface I{
    num: number;
    str: string;
}
let obj2 = {} as I;
obj2.num = 10;
obj2.str = 'string';
Assert.isNumber(obj2.num);
Assert.isString(obj2.str);