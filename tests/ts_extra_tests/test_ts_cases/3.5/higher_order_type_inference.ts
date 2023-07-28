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
   TypeScript 3.5 generalizes TypeScript 3.4's inference behavior to work on constructor functions as well.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../suite/assert.js'

{
    class A<T> {
        mem: T;
        constructor(mem: T) {
            this.mem = mem;
        }
    }

    class B<U> {
        mem: U;
        constructor(mem: U) {
            this.mem = mem;
        }
    }

    function func<T, U, V>(
        F: new (x: T) => U,
        G: new (y: U) => V
    ): (x: T) => V {
        return x => new G(new F(x));
    }


    let f = func(A, B);

    let a = f(10);

    Assert.equal(a.mem.mem, 10);
};