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
    Base class instance member variables and accessors can be overridden by derived class instance member variables and accessors.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class MyClass {
    num: number = 20;
    constructor(num: number) {
        this.num = num;
    }
    get() {
        return this.num
    }
    set(num: number) {
        this.num = num;
    }
}
class myClass extends MyClass {
    constructor(num: number) {
        super(num);
        this.num = num;
    }
    get() {
        return 10
    }
    set(num: number) {
        this.num = num;
    }
}
let myTest = new myClass(5);
Assert.equal(myTest.num, 5);
Assert.equal(myTest.get(), 10);