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
   a destructuring parameter declaration introduces zero or more named locals
   and initializes them with values extracted from properties or elements of the object or array passed as an argument for the parameter.
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
function showInfo({ m_name, m_age }: Person) {
    Assert.isString(m_name);
    Assert.equal(m_name, tt.m_name);
    Assert.isNumber(m_age);
    Assert.equal(m_age, tt.m_age);
}
showInfo(tt);
let tt1: Person = new Person("caihua1", 121);
let tt2: Person = new Person("caihua2", 122);
let person_array: Person[] = [tt1, tt2];
function showArrayInfo(v_array: Array<Person>) {
    let [tt1, tt2] = v_array;
    Assert.equal(tt1.m_name, v_array[0].m_name);
    Assert.equal(tt1.m_age, v_array[0].m_age);
    Assert.equal(tt2.m_name, v_array[1].m_name);
    Assert.equal(tt2.m_age, v_array[1].m_age);
}
showArrayInfo(person_array);