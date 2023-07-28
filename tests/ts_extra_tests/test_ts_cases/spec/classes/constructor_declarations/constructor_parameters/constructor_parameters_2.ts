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
    A parameter of a ConstructorImplementation may be prefixed with a public, private, or protected modifier. 
    This is called a parameter property declaration and is shorthand for declaring a property with the same name as the parameter 
    and initializing it with the value of the parameter.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class MyClass1 {
  constructor(public num1: number, private num2: number = 1) { }
  get foo(): number {
    return this.num2;
  }
}
class MyClass2 {
  public num1: number;
  protected num2: number;
  constructor(num1: number, num2: number) {
    this.num1 = num1;
    this.num2 = num2;
  }
  get foo(): number {
    return this.num2;
  }
}
let p1 = new MyClass1(1, 2);
Assert.equal(p1.num1, 1);
Assert.equal(p1.foo, 2);
let p2 = new MyClass2(3, 4);
Assert.equal(p2.foo, 4);