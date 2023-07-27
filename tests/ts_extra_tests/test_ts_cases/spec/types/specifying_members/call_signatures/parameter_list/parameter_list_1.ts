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
    A signature's parameter list consists of zero or more required parameters, followed by zero or more optional parameters,
    finally followed by an optional rest parameter.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../../suite/assert.js'

function fun1(firstParameter: string, lastParameter?: string) {
  if (lastParameter) return firstParameter + " " + lastParameter;
  else return firstParameter;
}
let result1 = fun1("Bob");
let result3 = fun1("Bob", "Adams");
Assert.equal(result1, "Bob");
Assert.equal(result3, "Bob Adams");
function fun2(firstParameter: string, ...restParameter: string[]) {
  return firstParameter + " " + restParameter.join(" ");
}
let employeeName = fun2("Joseph", "Samuel", "Lucas", "MacKinzie");
Assert.equal(employeeName, "Joseph Samuel Lucas MacKinzie");