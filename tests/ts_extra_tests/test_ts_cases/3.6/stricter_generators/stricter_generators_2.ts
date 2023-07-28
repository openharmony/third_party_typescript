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
  The Iterator type now allows users to specify the yielded type, the returned type, and the type that next can accept.
  To allow differentiation between returned values and yielded values, 
  TypeScript 3.6 converts the IteratorResult type to a discriminated union type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

class C {
    name: string;
    age: number;
    isJob: boolean;
    constructor(name: string, age: number, isJob: boolean) {
        this.name = name;
        this.age = age;
        this.isJob = isJob;
    }
}

let c1 = new C("caihua", 12, false);

const keys = Object.keys(c1);
let nextIndex = 0;
let x: Iterator<string, number> = {
    next() {
        return nextIndex < keys.length
            ? {
                value: keys[nextIndex++],
                done: false,
            }
            : { value: 0, done: true };
    },
};

let dd = x.next();
Assert.isString(dd.value);
Assert.isBoolean(dd.done);
Assert.equal(dd.value, "name");
Assert.equal(dd.done, false);
x.next();
x.next();

dd = x.next();
Assert.isNumber(dd.value);
Assert.isBoolean(dd.done);
Assert.equal(dd.value, 0);
Assert.equal(dd.done, true);
