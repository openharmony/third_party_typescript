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
  During type argument inference in a function call,
  it is in certain circumstances necessary to instantiate a generic call signature of an argument expression in the context of a non-generic call signature of a parameter such that further inferences can be made.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

function fun<S, T, U>(x: S[], y: T[], combine: (x: S) => (y: T) => U): U[] {
    let len = Math.max(x.length, y.length);
    let result: U[] = [];
    for (let i = 0; i < len; i++) result.push(combine(x[i])(y[i]));
    return result;
}

let names = ["Peter", "Paul", "Mary"];
let ages = [7, 9, 12];
let pairs = fun(names, ages, s => n => ({ name: s, age: n }));
Assert.equal(JSON.stringify(pairs), '[{"name":"Peter","age":7},{"name":"Paul","age":9},{"name":"Mary","age":12}]');