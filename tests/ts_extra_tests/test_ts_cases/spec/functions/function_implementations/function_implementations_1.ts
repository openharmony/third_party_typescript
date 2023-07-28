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
   If there are no return statements with expressions in f's function body, the inferred return type is Void.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function func(h_x: number) {
  Assert.isNumber(h_x);
}
type voidTest = ReturnType<typeof func>;
let tt1: void = undefined;
let tt2: voidTest = undefined;
Assert.equal(tt1, tt2);
Assert.equal(tt1 === tt2, true);