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
   Two call or construct signatures are considered identical 
   when they have the same number of type parameters with identical type parameter constraints and, 
   after substituting type Any for the type parameters introduced by the signatures, 
   identical number of parameters with identical kind and types, and identical return types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface M{
    <T extends string>(arg: T): T;
}
interface M{
    <T extends string>(arg: T): T;
}
function func<T extends string>(arg: T): T{
    return arg;
}
let a: M = func<any>('a');
Assert.isString(a);