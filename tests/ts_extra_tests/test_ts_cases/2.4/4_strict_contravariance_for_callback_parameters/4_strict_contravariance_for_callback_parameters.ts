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
 description: TypeScript 2.4 introduces tightens this up when relating two callback types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function f<U>(arg: U): U{
    if (typeof arg === 'number') {
        return arg;
    }
    return arg;
}
function func<T>(a: T, callback: <U>(arg: U) => U){
    return callback(a);
}

let a = func<number>(5, f);
let b = func<number | string>('a', f);
Assert.isNumber(a);
Assert.isString(b);
b = a;
Assert.equal(a, b);