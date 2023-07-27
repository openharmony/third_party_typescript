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
  In the signature of a function implementation, a parameter can be marked optional by following it with an initializer.
  When a parameter declaration includes both a type annotation and an initializer, the initializer expression is contextually typed by the stated type 
  and must be assignable to the stated type, or otherwise a compile-time error occurs. 
  When a parameter declaration has no type annotation but includes an initializer, 
  the type of the parameter is the widened form (section 3.12) of the type of the initializer expression
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

class Test {
    a: number;
    constructor(a: number) { this.a = a; }
}
function f(x: number, y: Test = { a: 1 }, z = "hello") {
    Assert.isString(z);
    return {
        x,
        yy: y,
        z: z,
    };
}
Assert.equal(f(0).yy.a, 1);
Assert.equal(f(0).z, "hello");