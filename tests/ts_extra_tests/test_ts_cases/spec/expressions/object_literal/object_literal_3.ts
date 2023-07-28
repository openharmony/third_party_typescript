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
    If the object literal is contextually typed and the contextual type contains a string index signature, 
    the property assignment is contextually typed by the type of the string index signature.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let obj1: {
  'str': string;
  [key: string]: string;
} = {
  'str': 'string',
  'num': 'number',
  'bool': 'boolean'
}
Assert.isString(obj1['num']);
Assert.isString(obj1['bool']);

interface I{
  'str': string;
  [key: string]: string;
}
let obj2 = {} as I;
obj2 = {
  'str': 'string',
  'num': 'number',
  'bool': 'boolean'
}
Assert.isString(obj2['num']);
Assert.isString(obj2['bool']);