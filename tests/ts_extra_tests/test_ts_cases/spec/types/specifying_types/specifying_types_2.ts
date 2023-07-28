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
    Parentheses are required around union, intersection, function, or constructor types when they are used as array element types
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let arr: (string | number)[] = ['10', 5];
Assert.equal(typeof arr, 'object');
let m_fun = function func(x: number) {
  return x;
}
let fun: ((h_x: string) => string) | ((h_x: number) => number) = m_fun;
Assert.equal(typeof fun, 'function');