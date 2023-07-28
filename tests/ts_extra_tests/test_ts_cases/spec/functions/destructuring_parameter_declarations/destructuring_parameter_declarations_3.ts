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
   If the declaration occurs in a function expression for which a contextual signature is available,
   T is the type obtained from the contextual signature.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Person {
    m_name: string;
    m_age: number;
    constructor(name: string, age: number) {
        this.m_name = name;
        this.m_age = age;
    }
}
let tt: Person = new Person("caihua", 12);
const showInfo: (v: Person) => void = function (v) {
    let { m_name, m_age } = v;
    Assert.isString(m_name);
    Assert.equal(m_name, "caihua");
    Assert.isNumber(m_age);
    Assert.equal(m_age, 12);
};
showInfo(tt);