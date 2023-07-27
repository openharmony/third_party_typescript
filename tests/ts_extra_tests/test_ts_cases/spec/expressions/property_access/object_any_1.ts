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
    If object is of type Any, any name is permitted and the property access is of type Any.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let myVariable: any = { name: "John", age: 30 };
Assert.isString(myVariable.name);
myVariable.name = 42;
Assert.isNumber(myVariable.name);

Assert.isNumber(myVariable.age);
myVariable.age = "Hello World";
Assert.isString(myVariable.age);