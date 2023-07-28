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

let fun1: (num1: number, num2: number) => number = (
  num1: number,
  num2: number
) => {
  return num1 + num2;
};
Assert.equal(fun1(3, 5), 8);
let fun2: { (num1: number, num2: number, num3: number): number } = (
  num1: number,
  num2: number,
  num3: number
) => {
  return num1 + num2 + num3;
};
Assert.equal(fun2(1, 3, 5), 9);