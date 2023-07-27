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
    The function body of a constructor is permitted to contain return statements. If return statements specify expressions, 
    those expressions must be of types that are assignable to the this-type of the class.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'


class myClass1 {
    num: number;
    constructor(num: number) {
        this.num = num
        return;
    }
}
let myTest1 = new myClass1(5);
Assert.equal(myTest1.num, 5);
class myClass2 {
    num: number;
    constructor(num: number) {
        this.num = num
        return { num: 10 };
    }
}
let myTest2 = new myClass2(5);
Assert.equal(myTest2.num, 10);