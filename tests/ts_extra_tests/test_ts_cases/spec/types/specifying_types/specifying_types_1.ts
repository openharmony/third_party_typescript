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
    Types are specified either by referencing their keyword or name, or by writing object type literals, 
    array type literals, tuple type literals, function type literals, constructor type literals, or type queries.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let num: number = 5;
Assert.isNumber(num);

let obj = {
  name: 'xiao',
  age: 18
}
Assert.equal(typeof obj, 'object');

let arr = [10, 5, 7, 20];
Assert.equal(typeof arr, 'object');

let arr2 = ['str', 5, true];
Assert.equal(typeof arr2, 'object');

let fun = (h_x: number, h_y: number) => {
  return h_x + h_y
}
Assert.equal(typeof fun, 'function');