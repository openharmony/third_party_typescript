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
     When an expression is an IdentifierReference, the expression refers to the most nested namespace, class, enum, function, variable,
     or parameter with that name whose scope (section 2.4) includes the location of the reference. 
     The type of such an expression is the type associated with the referenced entity:
     For a namespace, the object type associated with the namespace instance
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

namespace MyNamespace {
  export interface Person {
    name: string;
    age: number;
  }
  export function greet(person: Person) {
    Assert.equal(person.name, "John");
    Assert.equal(person.age, 30);
  }
}
const person: MyNamespace.Person = {
  name: "John",
  age: 30,
};
MyNamespace.greet(person);