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
 description: indexed access types, also called lookup types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

class TestHuman {
    name: string;
    age: number;
    constructor(name: string, age: number, job: string) {
        this.name = name;
        this.age = age;
    }
}

type TestName = TestHuman["name"];
let test1: TestName = "";
Assert.equal(typeof test1, "string");
Assert.notEqual(typeof test1, "number");
Assert.notEqual(typeof test1, "boolean");

type TestAge = TestHuman["age"];
let test2: TestAge = 0;
Assert.equal(typeof test2, "number");
Assert.notEqual(typeof test2, "string");
Assert.notEqual(typeof test2, "boolean");
