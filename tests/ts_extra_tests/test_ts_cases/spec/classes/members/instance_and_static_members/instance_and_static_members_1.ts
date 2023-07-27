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
    Members are either instance members or static members.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Person {
  private _name: string;
  public age: number;
  constructor(name: string, age: number) {
    this._name = name;
    this.age = age;
  }
  public set name(name: string) {
    this._name = name;
  }
  public get name() {
    return this._name;
  }
  static language: string = "english";
  static ageAdd() {
    return this.language + "aaa";
  }
}
let per: Person = new Person("rain", 22);
Assert.equal(per.name, "rain");
Assert.equal(per.age, 22);
Assert.equal(Person.language, "english");
Assert.equal(Person.ageAdd(), "englishaaa");