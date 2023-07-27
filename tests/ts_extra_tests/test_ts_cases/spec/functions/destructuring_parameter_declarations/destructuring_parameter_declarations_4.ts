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
   the type T associated with a destructuring parameter declaration is determined as follows
   if the declaration includes an initializer expression, T is the widened form of the type of the initializer expression.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

type testStr = "caihua";
type testStrNum = 12;
class Person {
    m_name: testStr | undefined;
    m_age: testStrNum | undefined;
    constructor();
    constructor(name?: testStr, age?: testStrNum) {
        if (name && typeof name === "string") {
            this.m_name = name;
        } else {
            this.m_name = undefined;
        }
        if (age && typeof age === "number") {
            this.m_age = age;
        } else {
            this.m_age = undefined;
        }
    }
}
let tt: Person = new Person();
function showInfo(v: Person) {
    let {
        m_name = "caihua",
        m_age = 12,
    }: { m_name: testStr | undefined; m_age: testStrNum | undefined } = v;
    Assert.equal(typeof m_name === "string", true);
    Assert.equal(typeof m_age === "number", true);
}
showInfo(tt);