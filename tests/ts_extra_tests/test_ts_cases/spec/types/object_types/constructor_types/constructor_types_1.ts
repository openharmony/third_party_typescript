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
    An object type containing one or more construct signatures is said to be a constructor type.
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
class Teacher extends Person {
  run(): string {
    return "teacher";
  }
}
type constructor<T> = new (name: string, age: number) => T;
let testClass1: constructor<Teacher> = Teacher;
let testObj1: Person = new testClass1("caihua", 20);
Assert.equal(testObj1.age, 20);
Assert.equal(testObj1.name, "caihua");
Assert.equal(testObj1.run(), "teacher");