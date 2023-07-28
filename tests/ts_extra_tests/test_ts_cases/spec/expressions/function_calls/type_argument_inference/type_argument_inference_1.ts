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
  Given a type parameter T and set of candidate types, the actual inferred type argument is determined,
  if the set of candidate argument types is empty, the inferred type argument for T is T's constraint.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

type t = number | string;
function select<T extends t>(h_x: T, h_y: T): T {
    return h_x < h_y ? h_x : h_y;
}
var a = select(10, 20);
Assert.isNumber(a);
type HELLO = "HELLO";
function getx(x: HELLO): string {
    return x;
}
const x = "HELLO";
Assert.equal(getx(x), "HELLO");