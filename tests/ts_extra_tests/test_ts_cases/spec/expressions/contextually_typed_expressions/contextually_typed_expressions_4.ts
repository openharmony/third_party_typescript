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
  In the body of a function declaration, function expression, arrow function, method declaration, 
  or get accessor declaration that has a return type annotation, 
  return expressions are contextually typed by the type given in the return type annotation.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function add(x: number, y: number): number {
    return x + y
}
let sum = add(10, 20)
Assert.isNumber(sum)
type Fun = (a: number, b: number) => number
function fun(fn: Fun, x: number, y: number) {
    return fn(x, y)
}
function minus(a: number, b: number) {
    return a - b
}
function mul(a: number, b: number) {
    return a * b
}
let m = fun(minus, 15, 7)
let n = fun(mul, 3, 6)
Assert.isNumber(m)
Assert.isNumber(n);