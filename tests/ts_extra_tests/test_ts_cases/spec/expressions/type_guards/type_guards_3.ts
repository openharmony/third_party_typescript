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
  In the true expression of a conditional expression, 
  the type of a variable or parameter is narrowed by a type guard in the condition when true, 
  provided no part of the conditional expression contains assignments to the variable or parameter.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function func(arg: string | (() => string)) {
   let x = typeof arg == "string" ? arg : arg();
   return x;
}
let result = func("abc");
Assert.isString(result);