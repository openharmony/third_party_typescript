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
  A type guard of the form 'x instanceof C', where x is not of type Any, 
  C is of a subtype of the global type 'Function', and C has a property named 'prototype',
  when true, narrows the type of x to the type of the 'prototype' property in C provided it is a subtype of the type of x,
  or, if the type of x is a union type, removes from the type of x all constituent types that aren't subtypes of the type of the 'prototype' property in C, 
  or when false, has no effect on the type of x.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Person {
   height: number
   age: number
   public constructor(height: number, age: number) {
      this.height = height
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
   if (arg instanceof Person) {
      return arg.age = 18
   }
   if (arg instanceof Animal) {
      return arg.weight = 300
   }
}
var p = new Person(150, 18)
Assert.equal(func(p), 18)
var a = new Animal(200, 180)
Assert.equal(func(a), 300);