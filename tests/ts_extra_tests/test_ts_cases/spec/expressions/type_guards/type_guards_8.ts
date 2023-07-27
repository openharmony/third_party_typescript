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
  A type guard of the form typeof x === s, where s is a string literal with any value but 'string', 'number', or 'boolean',
  when true, if x is a union type, removes from the type of x all constituent types that are subtypes of the string, number, or boolean primitive type,
  or when false, has no effect on the type of x.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function f1(x: string | number | undefined) {
    if (typeof x === "undefined") {
        return undefined
    }
    else {
        return x
    }
}
var a = f1(10)
Assert.isNumber(a)
var b = f1('s')
Assert.isString(b)
var c = f1(undefined)
Assert.isUndefined(c)
function f2(x: string | number | boolean) {
    if (typeof x === "undefined") {
        return undefined
    }
    else {
        return x
    }
}
var a1 = f2(10)
Assert.isNumber(a1)
var b1 = f2('s')
Assert.isString(b1)
var c1 = f2(true)
Assert.isBoolean(c1);