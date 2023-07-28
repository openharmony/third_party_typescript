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
    In a static member function or static member accessor where this references the constructor function object of a derived class,
    a super property access is permitted and must specify a public static member function of the base class.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Base {
    static greet() {
        return "hello world";
    }
}
class Derived extends Base {
    static greet() {
        super.greet();
        Assert.equal(super.greet(), "hello world");
        return "hola,mundo";
    }
}
Derived.greet();
Assert.equal(Derived.greet(), "hola,mundo");