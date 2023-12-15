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


// Counterexample: Using construction signatures in objects.
interface Person {
  name: string
  age: number
  sayHello(): void
}

const Person1: {
  new (name: string, age: number): Person
} = function (name: string, age: number) {
  this.name = name
  this.age = age
}

Person1.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}, and I am ${this.age} years old.`)
}

const alice: Person = new Person1('Alice', 30)
alice.sayHello()
