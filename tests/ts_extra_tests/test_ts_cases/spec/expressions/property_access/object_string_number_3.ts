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
    If index is a string literal or a numeric literal and object has an apparent property with the name given by that literal, 
    the property access is of the type of that property.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

const sites = {
  siteName: "Runoob",
  site2: 999,
  sayHello: function () { },
};
Assert.isString(sites["siteName"]);
Assert.isNumber(sites["site2"]);
Assert.isFunction(sites["sayHello"]);
interface Person {
  name: string;
  age: number;
  city: string;
}
const person: Person = {
  name: "Alice",
  age: 30,
  city: "New York",
};
Assert.equal(person["name"], "Alice");
Assert.equal(person["city"], "New York");