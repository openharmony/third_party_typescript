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
    Every class and interface has a this-type that represents the actual type of instances of the class or interface
    within the declaration of the class or interface. The this-type is referenced using the keyword this in a type
    position.
    within instance methods and constructors of a class, the type of the expression this  is the this-type of the class.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface INTERFACE {
    say: () => string;
}
let i: INTERFACE = {
    say() {
        return typeof this;
    }
}
Assert.equal(i.say(), 'object');
class C {
    num: number;
    constructor(num: number) {
        this.num = num;
        Assert.equal(typeof this, 'object');
    }
}
let h_c = new C(10);
Assert.equal(h_c.num, 10);
