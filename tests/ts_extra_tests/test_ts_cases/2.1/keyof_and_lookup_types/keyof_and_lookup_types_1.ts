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
   An indexed type query keyof T yields the type of permitted property names for T.
   A keyof T type is considered a subtype of string.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

class TestHuman {
    name: string;
    age: number;
    private job: string;
    constructor(name: string, age: number, job: string) {
        this.name = name;
        this.age = age;
        this.job = job;
    }
}
type TestName = Pick<TestHuman, "name">;
let nn: TestName = {
    name: "ayw",
};
Assert.notEqual(nn.name, undefined);
Assert.equal(nn.name, "ayw");

type TestAge = Pick<TestHuman, "age">;
let aa: TestAge = {
    age: 20,
};
Assert.notEqual(aa.age, undefined);
Assert.equal(aa.age, 20);

type Test = Pick<TestHuman, "name" | "age">;
let cc: Test = {
    name: "cool",
    age: 15,
};
Assert.notEqual(cc.name, undefined);
Assert.notEqual(cc.age, undefined);

Assert.equal(cc.name, "cool");
Assert.equal(cc.age, 15);

type TestString = keyof { [x: string]: number };

let str: TestString = "abc";
Assert.isString(str);
