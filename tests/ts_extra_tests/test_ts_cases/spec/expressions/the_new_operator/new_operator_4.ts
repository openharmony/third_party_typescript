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
    new C  
    new C ( ... )  
    new C < ... > ( ... )
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class C {
  x: number = 1;
}
let c = new C;
Assert.equal(c.x, 1);
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
const john = new Person("john", 30);
Assert.isString(john.name, "john");
class Box<T> {
  contents: T;
  constructor(value: T) {
    this.contents = value;
  }
}
const myBox = new Box<string>("hello");
Assert.equal(myBox.contents, "hello");