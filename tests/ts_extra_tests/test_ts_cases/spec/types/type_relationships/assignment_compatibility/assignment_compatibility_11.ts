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
   if S has no excess properties with respect to T, and S is a type parameter and the constraint of S is assignable to T.
 module: ESNext
 isCurrent: true
 ---*/


import {Assert} from '../../../../../suite/assert.js'

interface event<T> {
    data: T
}
type T = event<any>
type S = event<number>
let t: T
let s: S = { data: 10 }
t = s
Assert.equal(t, s);