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
  Generic types are "templates" from which multiple actual types can be created by writing type references 
  that supply type arguments to substitute in place of the generic type's type parameters
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

interface Person {
  name: string;
  age: number;
  getName(name: string): string;
}
type Optional<T> = { [P in keyof T]: T[P] };
let cc: Optional<Person> = {
  age: 18,
  name: "caihua",
  getName(name: string) {
    return name;
  },
};
Assert.equal(cc.age, 18);
Assert.equal(cc.name, "caihua");
Assert.equal(cc.getName("caihua"), "caihua");