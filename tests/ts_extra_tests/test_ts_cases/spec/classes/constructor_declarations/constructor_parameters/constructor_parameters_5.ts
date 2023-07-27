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
    A parameter property declaration may declare an optional parameter, 
    but the property introduced by such a declaration is always considered a required property.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class myClass {
    constructor(public num1: number, public num2?: number, public num3: number = 10) {
        this.num1 = num1;
        this.num2 = num2;
        this.num3 = num3;
    }
}
let myTest = new myClass(3);
Assert.equal(myTest.num1, 3);
Assert.equal(myTest.num3, 10);
Assert.equal(myTest.num2, undefined);