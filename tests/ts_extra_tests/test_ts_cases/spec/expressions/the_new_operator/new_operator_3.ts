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
    If C has no apparent construct signatures but one or more apparent call signatures, the expression is processed as a function call. 
    A compile-time error occurs if the result of the function call is not Void. The type of the result of the operation is Any.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Person {
  sayHello() {
    return "Hello,world";
  }
}
let person: Person = new Person();
Assert.equal(person.sayHello(), "Hello,world");
let person2: any = new Person();
person2.sayHello();
Assert.equal(person2.sayHello(), "Hello,world");