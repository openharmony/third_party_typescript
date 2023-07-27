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
   The widened form of a type is the type in which all occurrences of the Null and Undefined types have been replaced with the type any.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

var nu = null
Assert.equal(typeof nu, 'object')
var un = undefined
Assert.isUndefined(un)
var obj = { x: 0, y: null }
Assert.equal(typeof obj, 'object')
var arr = [null, undefined]
Assert.equal(typeof arr, 'object');