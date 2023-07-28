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
    If C has one or more apparent construct signatures (section 3.11.1), the expression is processed in the same manner as a function call, 
    but using the construct signatures as the initial set of candidate signatures for overload resolution.
    The result type of the function call becomes the result type of the operation.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Person {
  constructor(public name: string, public age: number) { }
}
interface Animal {
  speak(): void;
}
class Dog implements Animal {
  speak() {
    return "Woof!";
  }
}
const p = new Person("Alice", 30);
const d = new Dog();
Assert.isString(p.name);
Assert.equal(d.speak(), "Woof!");