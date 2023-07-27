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
    conditional types can now immediately reference themselves within their branches
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type TYPE1<T> = T extends ReadonlyArray<infer U> ? TYPE1<U> : T;

function fun1<T extends readonly unknown[]>(x: T): TYPE1<T>[] {
  return [];
}
let d1 = fun1([1, 2, 3]);
type typeofx = typeof d1;
let nx1: typeofx = [1, 2, 3];
Assert.isNumber(nx1[0]);
let d2 = fun1([[1], [2, 3]]);
type typeofx2 = typeof d2;
let nx2: typeofx2 = [4, 5, 6];
Assert.isNumber(nx2[0]);
let d3 = fun1([[1], [[2]], [[[3]]]]);
type typeofx3 = typeof d3;
let nx3: typeofx3 = [7, 8, 9];
Assert.isNumber(nx3[0]);