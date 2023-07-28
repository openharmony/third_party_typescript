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
  The type T associated with a binding property is determined as follows:
  Let S be the type associated with the immediately containing destructuring variable declaration, binding property, or binding element.
  If S is the Any type: 
  If the binding property specifies an initializer expression, T is the type of that initializer expression.
  Otherwise, T is the Any type.
  Let P be the property name specified in the binding property.
  If S has an apparent property with the name P, T is the type of that property.
  Otherwise, if S has a numeric index signature and P is a numerical name, T is the type of the numeric index signature.
  Otherwise, if S has a string index signature, T is the type of the string index signature.
  Otherwise, no type is associated with the binding property and an error occurs.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../../suite/assert.js'

var object_name = {
  key1: "value1",
  key2: "value2",
  key3: ["content1", "content2"],
  key4: true,
  key5: undefined
}


var ohArray: number[] = [10, 20, 30];

var { key1, key3: [y, z = 10, k = 10] = ohArray, key5: [a, b] = ohArray } = object_name;

Assert.equal("value1", key1);
Assert.equal("content1", y);
Assert.equal("content2", z);
Assert.equal(10, k);
Assert.equal(10, a);
Assert.equal(20, b);