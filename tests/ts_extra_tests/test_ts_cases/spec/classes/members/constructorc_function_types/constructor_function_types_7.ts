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
    A property named 'prototype', the type of which is an instantiation of the class type with type Any supplied 
    as a type argument for each type parameter.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Animal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
Assert.equal(typeof (Animal.prototype), "object");
let cat = new Animal("Cat")
Assert.equal(Object.getPrototypeOf(cat) === Animal.prototype, true);
Assert.equal(Object.getPrototypeOf(Animal.prototype) === Object.prototype, true);
Assert.equal(Object.getPrototypeOf(Object.prototype) === null, true);