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
  When a function expression is inferentially typed and a type assigned to a parameter in that expression references type parameters for which inferences are being made,
  the corresponding inferred type arguments to become fixed and no further candidate inferences are made for them.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

function func<T>(arg1: T, arg2:T) {
    return [arg1, arg2];
}
let a = func(3, 5);
let b = func('a', 'b');
Assert.equal(a, '3,5');
Assert.equal(b, 'a,b');