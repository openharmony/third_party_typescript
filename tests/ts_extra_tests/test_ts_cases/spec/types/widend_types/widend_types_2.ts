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
  When inferring the type of a variable, property or function result from an expression, 
  the widened form of the source type is used as the inferred type of the target.
 module: ESNext
 isCurrent: true
 ---*/


import {Assert} from '../../../../suite/assert.js'

var x = 10
var y = 'a'
var z = x + y
Assert.isString(z);