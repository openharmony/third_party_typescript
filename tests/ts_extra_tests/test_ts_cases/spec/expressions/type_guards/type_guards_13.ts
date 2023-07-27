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
  A type guard of any other form has no effect on the type of x.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Person {
  name: string
  age: number
  public constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}
class Animal {
  height: number
  weight: number
  public constructor(height: number, weight: number) {
    this.height = height
    this.weight = weight
  }
}
function func(arg: Person | Animal) {
  if ('age' in arg) {
    Assert.isString(arg.name)
  }
  if ('height' in arg) {
    Assert.isNumber(arg.height)
  }
}
let p = new Person('x', 18);
func(p);
let a = new Animal(200, 180);
func(a);