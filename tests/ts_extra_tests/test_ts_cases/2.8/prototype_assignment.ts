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
   You can assign an object literal directly to the prototype property. Individual prototype assignments still work too.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../suite/assert.js"

let q: number = 0;
let c: any = function (p: number) { q = p; }
c.sub = {
  m() {
    Assert.equal(q, 5);
  }
}
c(5);
c.sub.m();