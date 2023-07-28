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
    The super keyword can be used in expressions to reference base  class properties and the base class constructor.
    Super calls consist of the keyword super followed by an argument list enclosed in parentheses. Super calls are only permitted in constructors of derived classes.
    A super call invokes the constructor of the base class on the instance referenced by this. 
    A super call is processed as a function call (section 4.15) using the construct signatures of the base class constructor function type 
    as the initial set of candidate signatures for overload resolution. 
    The type of a super call expression is Void.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Animal {
  private name: string;
  constructor(name: any) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a noise`;
  }
}
class Dog extends Animal {
  private breed: string;
  constructor(name: any, breed: any) {
    super(name);
    this.breed = breed;
  }
  extendsSpeak() {
    super.speak();
    Assert.isString(super.speak(), "Fodo makes a noise");
    return `${this.breed}`;
  }
}
const d = new Dog("Fido", "Golden Retriever");
d.extendsSpeak();
Assert.isString(d.extendsSpeak(), "Golden Retriever");