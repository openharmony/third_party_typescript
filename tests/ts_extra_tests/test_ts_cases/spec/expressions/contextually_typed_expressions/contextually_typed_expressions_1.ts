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
  In a variable, parameter, binding property, binding element, or member declaration, 
  an initializer expression is contextually typed by the type given in the declaration's type annotation.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let a: number
a = 10
Assert.isNumber(a)
function fun(x: string) {
  let y = x + 'ing'
  return y
}
Assert.isString(fun('str'))
interface Obj {
  name: string
  age: number
}
let obj: Obj = {
  name: 'xiao',
  age: 18
}
Assert.isString(obj.name)
Assert.isNumber(obj.age);