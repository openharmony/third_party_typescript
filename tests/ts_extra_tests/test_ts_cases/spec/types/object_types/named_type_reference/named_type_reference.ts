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
    Type references to class and interface types are classified as object types.
    Type references to generic class and interface types include type arguments that are substituted for the type parameters of the class
    or interface to produce an actual object type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class C1 {
    num1: number;
    num2: number;
    constructor(num1: number, num2: number) {
        this.num1 = num1;
        this.num2 = num2;
    }
    add(x: number, y: number): void {
        let sum: number = x + y;
        Assert.equal(sum, 10);
    }
}
let o: C1 = new C1(4, 6);
o.add(3, 7);

interface I {
    name: string;
    age: number;
    greet: () => string
}
let i: I = {
    name: 'xiao',
    age: 18,
    greet() { return "hello"; }
}
Assert.equal(i.name, "xiao");
Assert.equal(i.age, 18);
Assert.equal(i.greet(), "hello");
class C2<T> {
    x: T;
    constructor(x: T) {
        this.x = x;
    }
    getx() {
        return this.x;
    };
}
let c2 = new C2<number>(1);
Assert.equal(c2.getx(), 1);
