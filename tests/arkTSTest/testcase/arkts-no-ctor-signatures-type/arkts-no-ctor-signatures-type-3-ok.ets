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


// Positive example: Using classes to implement interfaces.
interface PersonInterface {
  name: string
  age: number
  sayHello(): void
}

class Person implements PersonInterface {
  public name = ''
  public age = 0
  constructor(name: string, age: number) {}

  sayHello() {
    console.log(`Hello, my name is ${this.name}`)
  }
}

let person = new Person('John', 30)
person.sayHello() // Hello, my name is John
