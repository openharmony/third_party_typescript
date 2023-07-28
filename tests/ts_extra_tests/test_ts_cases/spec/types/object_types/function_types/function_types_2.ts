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
    an object type containing one or more call signatures is said to be a function type.  
    function types may be written using function type literals or by including call signatures in object type literals.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

function add(x: number, y: number): number {
  return x + y;
}
let a: number = add(1, 2);
Assert.equal(a, 3);
let add2 = function (x: number, y: number): number { return x + y; };
let b: number = add2(3, 4);
Assert.equal(b, 7);