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
  Initializer expressions are evaluated in the scope of the function body but are not permitted to reference local variables 
  and are only permitted to access parameters that are declared to the left of the parameter they initialize, 
  unless the parameter reference occurs in a nested function expression.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let a = 3;
function f(n1: number = a, n2 = n1 * 2, n3 = n1 + 2) {
    let b = 12;
    function g(xx = b) {
        return xx;
    }
    let c = g();
    return { n1, n2, n3, g: c };
}
Assert.equal(f().n1, 3);
Assert.equal(f().n2, 6);
Assert.equal(f().n3, 5);
Assert.equal(f().g, 12);
Assert.equal(f(1).n1, 1);
Assert.equal(f(1).n2, 2);
Assert.equal(f(1).n3, 3);
Assert.equal(f(1).g, 12);