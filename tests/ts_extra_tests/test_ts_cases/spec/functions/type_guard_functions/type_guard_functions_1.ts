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
 description:  TypeScript compiler narrows the type of a variable within a type guard.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Student {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
class Teacher {
    name: string;
    age: number;
    job: string;
    constructor(name: string, age: number, job: string) {
        this.name = name;
        this.age = age;
        this.job = job;
    }
}
function isTeacher(obj: Student | Teacher): obj is Teacher {
    return "job" in obj;
}
function printInfo(obj: Student | Teacher) {
    if (
        isTeacher(obj) &&
        typeof obj.age === "number" &&
        obj instanceof Teacher
    ) {
        Assert.equal(obj.name, "caihuaTeacher");
        Assert.equal(obj.age, 20);
        Assert.equal(obj.job, "teacher");
        return "teacher";
    } else {
        Assert.equal(obj.name, "caihuaStudent");
        Assert.equal(obj.age, 20);
        return "student";
    }
}
let tt: Teacher = new Teacher("caihuaTeacher", 20, "teacher");
let ss: Student = new Student("caihuaStudent", 20);
Assert.equal(printInfo(tt), "teacher");
Assert.notEqual(printInfo(tt), "student");
Assert.equal(printInfo(ss), "student");
Assert.notEqual(printInfo(ss), "teacher");