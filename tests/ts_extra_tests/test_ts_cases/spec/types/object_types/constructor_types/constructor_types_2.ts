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
    Constructor types may be written using constructor type literals
    or by including construct signatures in object type literals.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Person {
  name: string;
  age: number;
  constructor(n: string, age: number) {
    this.name = n;
    this.age = age;
  }
  run(): string {
    return "person";
  }
}
class Student extends Person {
  run(): string {
    return "student";
  }
}
class Teacher extends Person {
  run(): string {
    return "teacher";
  }
}

let testClass1: new (name: string, age: number) => Person = Student;
let testObj1: Person = new testClass1("caihua1", 12);
Assert.equal(testObj1.age, 12);
Assert.equal(testObj1.name, "caihua1");
let testClass2: { new(n: string, a: number): Person } = Teacher;
let testObj2: Person = new testClass2("caihua2", 120);
Assert.equal(testObj2.age, 120);
Assert.equal(testObj2.name, "caihua2");