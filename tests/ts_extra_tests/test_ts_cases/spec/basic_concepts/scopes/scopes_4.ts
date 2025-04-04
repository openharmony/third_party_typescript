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
    The scope of a non-exported name declared within a namespace declaration is the body of that namespace declaration.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

namespace X {
   var a: string = 'TypeScript';
   let b: number = 110;
   export function assert() {
      Assert.equal(a, 'TypeScript');
      Assert.equal(b, 110);
   }
}
X.assert();