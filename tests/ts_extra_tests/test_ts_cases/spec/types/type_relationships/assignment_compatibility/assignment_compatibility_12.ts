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
    if S has no excess properties with respect to T,
    and S is an object type, an intersection type, an enum type, or the Number, Boolean, or String primitive type, T is an object type, and for each member M in T,
    and M is a property and S has an apparent property N where
    M and N have the same name,
    the type of N is assignable to that of M,
    if M is a required property, N is also a required property, and
    M and N are both public, M and N are both private and originate in the same declaration, 
    M and N are both protected and originate in the same declaration, 
    or M is protected and N is declared in a class derived from the class in which M is declared.
 module: ESNext
 isCurrent: true
 ---*/


import {Assert} from '../../../../../suite/assert.js'

type T = {
    name: any
    age: number
}
type S = {
    name: string
    age: number
}
let t: T
let s: S = {
    name: "Xi",
    age: 20,
}
t = s
Assert.equal(t, s);