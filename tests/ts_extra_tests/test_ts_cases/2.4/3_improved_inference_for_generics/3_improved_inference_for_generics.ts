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
 description: TypeScript 2.4 introduces a few wonderful changes around the way generics are inferred.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

function func(a: number, b: string) {
    return a + b;
}
Assert.isString(func(10, 'a'));

type T1 = <T, U>(x: T, y: U) => [T, U];
type T2 = <T>(x: T, y: T) => [T, T];
function f(a: T1, b: T2) {
    b = a;
    Assert.isTrue(b == a);
}

let a: T1 = function funA<T, U>(x: T, y: U): [T, U] {
    return [x, y];
}
let b: T2 = function funB<T>(x: T, y: T): [T, T] {
    return [x, y];
}
f(a, b);