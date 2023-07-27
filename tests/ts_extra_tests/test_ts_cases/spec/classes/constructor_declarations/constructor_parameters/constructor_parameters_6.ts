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
    In a class with no constructor declaration, an automatic constructor is provided, as described in section 8.3.3.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class myClass {
    public a: string = "test";
    public b: number = 1;
}
class myClass2 {
    public c: number = 2;
}
let myTest: myClass = new myClass();
Assert.equal(myTest.a, "test");
Assert.equal(myTest.b, 1);
let myTest2: myClass2 = new myClass2();
Assert.equal(myTest2.c, 2);