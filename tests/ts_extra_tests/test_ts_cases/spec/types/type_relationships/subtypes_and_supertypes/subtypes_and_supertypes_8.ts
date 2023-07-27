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
  S is a subtype of a type T, and T is a supertype of S, 
  if S has no excess properties with respect to T,   
  and S is an intersection type and at least one constituent type of S is a subtype of T.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface T {
    name: string
    age: number
}
interface Foo {
    name: string
    age: number
}
interface Bar {
    hobby: string
}
type S = Foo & Bar
let t: T = {
    name: "T",
    age: 18
}
let s: S = {
    name: "S",
    age: 20,
    hobby: "drawing"
}

t = s;
Assert.equal(t, s);