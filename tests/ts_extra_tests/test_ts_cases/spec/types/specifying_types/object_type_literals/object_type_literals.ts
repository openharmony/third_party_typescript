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
    An object type literal defines an object type by specifying the set of members that are statically considered to be present in instances of the type. 
    Object type literals can be given names using interface declarations but are otherwise anonymous.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let obj: {
    num: number;
    str: string;
    boo: boolean;
    fun: Function;
} = {
    num: 5,
    str: 'str',
    boo: true,
    fun(): number {
        return 123;
    }
}
Assert.equal(obj.num, 5);
Assert.equal(obj.str, 'str');
Assert.equal(obj.boo, true);
Assert.equal(obj.fun(), 123);
interface I {
    name: string,
    age: number,
    readonly id: number
}
let i: I = {
    name: 'xiao',
    age: 18,
    id: 111
}
Assert.equal(i.name, 'xiao');
Assert.equal(i.age, 18);
Assert.equal(i.id, 111);
interface I2 {
    name: string,
    [oname: string]: string;
}
let i2: I2 = {
    name: "join",
    gender: "male"
};
Assert.equal(i2.name, "join");
Assert.equal(i2.gender, "male");
class Myclass {
    x: number = 1;
    y: string = "aa";
    constructor() { }
    fun(): number {
        return 11;
    }
}
let obj2: Myclass = new Myclass()
Assert.equal(obj2.fun(), 11);
Assert.equal(obj2.x, 1);
Assert.equal(obj2.y, "aa");