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
  In the body of a function expression or arrow function that has no return type annotation, 
  if the function expression or arrow function is contextually typed by a function type with exactly one call signature, 
  and if that call signature is non-generic, return expressions are contextually typed by the return type of that call signature.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

type Fun = {
    description: string
    (someThing: number): boolean
}
function fun1(fn: Fun) {
    return fn.description + fn(100)
}
function fun2(num: number) {
    Assert.equal(num, 100)
    return false
}
fun2.description = 'hello'
Assert.equal(fun1(fun2), 'hellofalse');