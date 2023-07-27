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
    A constructor type literal specifies the type parameters, regular parameters, and return type of a construct signature.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface I1 {
    x: number;
    y: number;
}

interface Constructor {
    new(x: number, y: number): I1;
}
class I2 implements I1 {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
function fun1(
    cons: Constructor,
    x: number,
    y: number
): I1 {
    return new cons(x, y);
}
let x1: I1 = fun1(I2, 2, 2)
Assert.equal(x1.x, 2);
Assert.equal(x1.y, 2);

interface F1<T, U> {
    x: T;
    y: U;
}
interface ConstructorF<T, U> {
    new(x: T, y: U): F1<T, U>;
}
class F2<T, U> implements F1<T, U> {
    readonly x: T;
    readonly y: U;

    constructor(x: T, y: U) {
        this.x = x;
        this.y = y;
    }
}
function fun2<T, U>(
    cons: ConstructorF<T, U>,
    x: T,
    y: U
): F1<T, U> {
    return new cons(x, y);
}
let f1: F1<number, boolean> = fun2(F2, 1, true);
Assert.equal(f1.x, 1);
Assert.equal(f1.y, true);