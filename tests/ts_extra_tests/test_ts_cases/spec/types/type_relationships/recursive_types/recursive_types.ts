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
  when comparing types S and T for a given relationship, 
  the relationship in question is assumed to be true for every directly or indirectly nested occurrence of the same S and the same T
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface iA {
    next: iA;
}
interface iB {
    next: iC;
}
interface iC {
    next: iD;
}
interface iD {
    next: iB;
}
type IsEqual<T, U> =
    (<T1>() => T1 extends T ? 1 : 2) extends
    (<T2>() => T2 extends U ? 1 : 2)
    ? true
    : false
var t1: IsEqual<iA, iB> = true;
Assert.isTrue(t1);