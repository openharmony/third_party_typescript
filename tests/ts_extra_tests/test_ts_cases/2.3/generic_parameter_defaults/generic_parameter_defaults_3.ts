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
    typescript 2.3 adds support for declaring defaults for generic type parameters.
    default types for a type parameter must satisfy the constraint for the type parameter, if it exists.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface Length {
   length: number;
}
type STRS = string | string[]
function fun3<T extends Length = STRS>(s: T) {
   return s.length;
}
Assert.equal(fun3<STRS>("ABC"), 3);
Assert.equal(fun3([1, 2, 3, 4]), 4);
