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
    The scope of an exported name declared within a namespace declaration is the body of that namespace declaration and every namespace declaration with the same root and the same qualified name relative to that root.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

namespace X {
   export var a: string = '404NotFound';
   export let b: number = 119;
   export namespace Y {
      export function pak() {
         return { a, b };
      }
   }
}
Assert.equal(X.a, '404NotFound');
Assert.equal(X.b, 119);
Assert.equal(X.Y.pak().a, '404NotFound');
Assert.equal(X.Y.pak().b, 119);