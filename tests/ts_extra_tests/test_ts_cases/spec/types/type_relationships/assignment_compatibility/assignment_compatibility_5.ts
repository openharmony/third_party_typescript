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
   S is assignable to a type T, and T is assignable from S,
   if S has no excess properties with respect to T, and S or T is an enum type and the other is the primitive type Number.
 module: ESNext
 isCurrent: true
 ---*/


import {Assert} from '../../../../../suite/assert.js'

enum T {
    A,
    B,
    C
}
let S: number = 5
let t: T
t = S
Assert.equal(t, S);