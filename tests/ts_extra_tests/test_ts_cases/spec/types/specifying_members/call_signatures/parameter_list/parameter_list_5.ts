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
    A parameter is permitted to include a public, private,
    or protected modifier only if it occurs in the parameter list of a ConstructorImplementation (section 8.3.1) 
    and only if it doesn't specify a BindingPattern.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../../suite/assert.js'

class Person {
  public name: string;
  private age: number;
  protected sex: string;
  constructor(name: string, age: number, sex: string) {
    this.name = name;
    this.age = age;
    this.sex = sex;
  }
  get _age() {
    return this.age;
  }
  set _age(value) {
    if (value >= 0) {
      this.age = value;
    }
  }
}
class Child extends Person {
  f() {
    if (this.sex === "man") {
      this.sex = "male";
    } else {
      this.sex = "female";
    }
  }
}
let a = new Child("wangwu", 15, "man");
a.name = "lisi";
a._age = 19;
Assert.equal(a.name, "lisi");
Assert.equal(a._age, 19);