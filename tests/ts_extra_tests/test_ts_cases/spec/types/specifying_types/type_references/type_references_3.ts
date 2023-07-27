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
    A type argument is simply a Type and may itself be a type reference to a generic type. 
    A type reference to a generic type G designates a type wherein all occurrences of G's type parameters have been replaced 
    with the actual type arguments supplied in the type reference. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface I1 {
    a: string;
}
interface I2 extends I1 {
    b: string;
}
interface I3 extends I2 {
    c: string;
}
interface I4<T, U extends I2> {
    x: T;
    y: U;
}
let z: I4<I4<I1, I2>, I3> = {
    x: {
        x: { a: 'a' },
        y: {
            a: 'a',
            b: 'b'
        }
    },
    y: {
        a: 'a',
        b: 'b',
        c: 'c'
    }
}
Assert.equal(z.x.x.a, 'a');
Assert.equal(z.x.y.b, 'b');
Assert.equal(z.y.a, 'a');
Assert.equal(z.y.b, 'b');
Assert.equal(z.y.c, 'c');