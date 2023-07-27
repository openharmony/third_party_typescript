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
    If T is a union type, let U be the set of element types in T that have call signatures. 
    If each type in U has exactly one call signature and that call signature is non-generic, and if all of the signatures are identical ignoring return types, 
    then S is a signature with the same parameters and a union of the return types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

type MyUnionType = ((x: number) => string) | ((x: number) => number);
function myFunction(fn: MyUnionType, arg: number) {
  return fn(arg);
}
const fn1 = (x: number): string => `Hello,${x}`;
const fn2 = (x: number): number => x * 2;
const result1 = myFunction(fn1, 123);
const result2 = myFunction(fn2, 456);
Assert.equal(result1, "Hello,123");
Assert.equal(result2, 912);