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
    Class, interface, type alias, and function declarations may optionally include 
    lists of type parameters enclosed in < and > brackets.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Person {
  name: string;
  age: number;
  job: string;
  constructor(name: string, age: number, job: string) {
    this.name = name;
    this.age = age;
    this.job = job;
  }
}

type optionallyTest<T> = {
  [P in keyof T]?: T[P];
};
let x: optionallyTest<Person> = {};
x = { name: "dog" };
Assert.isUndefined(x.job);
Assert.isUndefined(x.age);
x = { name: "dog", age: 18 };
Assert.isUndefined(x.job);
x = { name: "dog", age: 18, job: "teacher" };