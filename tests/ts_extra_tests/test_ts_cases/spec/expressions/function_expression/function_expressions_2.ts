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
  If T is a function type with exactly one call signature, 
  and if that call signature is non-generic, S is that signature.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

type MyFunctionType = (x: number, y: number) => number;
function myFunction(fn: MyFunctionType) {
  return fn(2, 3);
}
const add: MyFunctionType = function (x: number, y: number) {
  return x + y;
};
const result = myFunction(add);
Assert.equal(result, 5);