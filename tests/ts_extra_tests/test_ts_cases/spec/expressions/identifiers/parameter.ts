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
  For a parameter, the type of the parameter.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class paramMethod {
  person: string;
  age: number;
  constructor(person: string, age: number) {
    this.person = person;
    this.age = age;
    Assert.isString(person);
    Assert.isNumber(age);
  }
}
let newparam = new paramMethod("xiaoli", 18);
Assert.equal(newparam.age, 18);
Assert.equal(newparam.person, "xiaoli");