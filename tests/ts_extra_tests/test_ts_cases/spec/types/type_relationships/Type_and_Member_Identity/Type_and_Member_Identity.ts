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
    the variables 'a' and 'b' are of identical types because the two type references to 'C' create types with a private member 'x' that originates in the same declaration,
    and because the two private 'x' members have types with identical sets of members once the type arguments 'X' and 'Y' are substituted.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Teacher<T> {
    private x: T;
    constructor(t: T) {
        this.x = t;
    }

}

interface student1 { f(): string; }

interface student2 { f(): string; }

class Person implements student1, student2 {
    f() {
        return "X+Y"
    }
}

let a: Teacher<student1> = new Teacher(new Person);
let b: Teacher<student2> = new Teacher(new Person);
Assert.isObject(a);
Assert.isObject(b);
Assert.equal(typeof a, typeof b)