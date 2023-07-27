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
   In strictNullChecks mode, control flow based type analysis includes definite assignment analysis for local variables of types that don’t permit the value undefined.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

function tFun(c: boolean): void {
  let x: number;
  if (c) {
    x = 1;
    Assert.equal(x, 1);
  }
  x = 2;
  Assert.equal(x, 2);
}

tFun(true);
