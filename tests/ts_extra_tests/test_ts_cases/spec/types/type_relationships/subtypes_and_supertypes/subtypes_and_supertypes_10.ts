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
  and T is an intersection type and S is a subtype of each constituent type of T.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface S {
    name: string
    age: number
    height: number
}
interface Foo {
    name: string
}
interface Bar {
    age: number
}
type T = Foo & Bar
let s: S = {
    name: "T",
    age: 18,
    height: 180
}
let t: T = {
    name: "S",
    age: 20
}

t = s;
Assert.equal(t, s);