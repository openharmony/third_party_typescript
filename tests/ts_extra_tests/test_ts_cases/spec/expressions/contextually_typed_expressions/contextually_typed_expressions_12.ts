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
  In a contextually typed parenthesized expression, the contained expression is contextually typed by the same type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

var a: number = 10
var b: number = 5
var c = (a + b) * (a - b)
Assert.isNumber(c)
interface Foo {
  num: number
  str: string
}
const x: Foo[] = [{ num: 18, str: 'hello' }, { num: 20, str: 'world' }]
Assert.isNumber(x[0].num)
Assert.isNumber(x[1].num)
Assert.isString(x[0].str)
Assert.isString(x[1].str);