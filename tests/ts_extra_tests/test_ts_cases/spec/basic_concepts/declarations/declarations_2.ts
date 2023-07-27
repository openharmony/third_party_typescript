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
   Declarations introduce the following meanings for the name they declare:
   A variable, parameter, function, generator, member variable, member function, member accessor, or enum member declaration introduces a value meaning.
   An interface, type alias, or type parameter declaration introduces a type meaning.
   A class declaration introduces a value meaning (the constructor function) and a type meaning (the class type).
   An enum declaration introduces a value meaning (the enum instance) and a type meaning (the enum type).
   A namespace declaration introduces a namespace meaning (the type and namespace container) and, if the namespace is instantiated, a value meaning (the namespace instance).
   An import or export declaration introduces the meaning(s) of the imported or exported entity.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Myclass {
    a: string;
    constructor(a: string) {
        this.a = a;
    }
    static a :number = 33;
}
var c: Myclass = new Myclass("x");
Assert.equal(c.a, "x");
Assert.equal(Myclass.a,33);
enum WeekDay {
    MON = 1,
    TUE,
    WEN,
    THU,
    FRI,
    SAT,
    SUN
}
type a = WeekDay;
var mon: a = WeekDay.MON;
Assert.equal(mon, 1);
namespace X {
    export let x: string = "x";
}
Assert.equal(X.x, "x");