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
   Higher order type inference from generic functions.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../suite/assert.js'

function Func<A, B, C>(f: (arg: A) => B, g: (arg: B) => C): (arg: A) => C {
    return (x) => g(f(x));
}

interface A<T> {
    arr: T;
}

function func1<T>(index: T): T[] {
    return [index];
}

function func2<U>(arr: U): A<U> {
    return { arr };
}

const result = Func(
    func1,
    func2,
)

Assert.equal(result("hello").arr[0].toUpperCase(), 'HELLO');