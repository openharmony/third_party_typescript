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
    if the parameter is a rest parameter, the parameter type is any[].
    A type annotation for a rest parameter must denote an array type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../../suite/assert.js'

function restFun(first: any, ...restname: any[]) {
  return first + " " + restname.join(" ");
}
let restname1 = restFun("aa", "bb", "cc");
Assert.equal(restname1, "aa bb cc");
let restname2 = restFun(1, 2, 3, 4);
Assert.equal(restname2, "1 2 3 4");
let restname3 = restFun(true, false, true);
Assert.equal(restname3, "true false true");