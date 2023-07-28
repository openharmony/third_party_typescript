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
  If e is an expression of a function type that contains exactly one generic call signature and no other members, 
  and T is a function type with exactly one non-generic call signature and no other members, 
  then any inferences made for type parameters referenced by the parameters of T's call signature are fixed, 
  and e's type is changed to a function type with e's call signature instantiated in the context of T's call signature.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

type T = (arg: number) => number;
let f = <T>(arg: T): T => { return arg };
let para: T = function func(arg: number) { 
    return arg;
}
let result = f(para(20));
Assert.equal(result, 20);
Assert.isFunction(f);