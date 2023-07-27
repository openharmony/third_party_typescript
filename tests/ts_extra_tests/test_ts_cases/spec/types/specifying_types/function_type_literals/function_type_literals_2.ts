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
    A function type literal specifies the type parameters, regular parameters, and return type of a call signature.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

let fun1: (x: number, y: number) => number =
    function (x: number, y: number): number { return x + y; };
Assert.equal(fun1(1, 2), 3);
let fun2: Function = (x: number, y: number): boolean => {
    return x > y ? true : false;
}
Assert.equal(fun2(1, 2), false);
interface Func {
    fun(x: string): string;
}
let fun3: Func = {
    fun(x: string): string {
        return x;
    }
}
Assert.equal(fun3.fun("aa"), "aa");