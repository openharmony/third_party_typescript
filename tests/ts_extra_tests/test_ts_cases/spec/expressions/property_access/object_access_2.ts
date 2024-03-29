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
    If name denotes an accessible apparent property (section 3.11.1) in the widened type (section 3.12) of object, 
    the property access is of the type of that property. Public members are always accessible,
    but private and protected members of a class have restricted accessibility, as described in 8.2.2.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

var sites = {
  site1: "User1",
  site2: "User2",
  sayHello: function () { },
};
sites.sayHello = function () {
  return "hello " + sites.site1;
};
Assert.isString(sites.sayHello());
class Person {
  name: string;
  age: string;
  constructor(name: any, age: any) {
    this.name = name;
    this.age = age;
  }
  greet() { }
}
const person1 = new Person("Alice", 30);
const person2 = { name: "Bob", age: 35 };
person1["greet"]();
Assert.equal(person1.name, "Alice");
Assert.equal(person2.name, "Bob");
Assert.equal(person1.age, 30);