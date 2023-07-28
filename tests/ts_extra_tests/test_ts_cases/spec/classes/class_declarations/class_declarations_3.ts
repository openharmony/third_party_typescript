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
    A class with type parameters is called a generic class. 
 module: ESNext
 isCurrent: true
 ---*/
import { Assert } from '../../../../suite/assert.js'

class MyClass<T> {
    field: T;
    constructor(field: T) {
        this.field = field;
    }
    public getFieldName(): T {
        return this.field;
    }
}
class Compute {
    constructor(public num1: number, public num2: number) { }
    public hypot() {
        return Math.sqrt(this.num1 * this.num1 + this.num2 * this.num2);
    }
}
let mc1: MyClass<string> = new MyClass<string>("a");
Assert.equal("a", mc1.field);
Assert.equal("a",mc1.getFieldName());
let mc2: MyClass<number> = new MyClass<number>(1);
Assert.equal(1, mc2.field);
Assert.equal(1,mc2.getFieldName());
let mc3: MyClass<boolean> = new MyClass<boolean>(false);
Assert.equal(false, mc3.field);
Assert.equal(false,mc3.getFieldName());
let p: Compute = new Compute(8, 6);
let mc4: MyClass<Compute> = new MyClass<Compute>(p);
Assert.equal(8, mc4.field.num1);
Assert.equal(6, mc4.field.num2);
Assert.equal(10,mc4.field.hypot());

let obj: object = {
    x: 1,
    y: 2
}
let mc5: MyClass<object> = new MyClass<object>(obj);
Assert.equal(obj, mc5.field);
let list: Array<number> = [1, 2, 3];
let mc6: MyClass<Array<number>> = new MyClass<Array<number>>(list);
Assert.equal(list, mc6.field);