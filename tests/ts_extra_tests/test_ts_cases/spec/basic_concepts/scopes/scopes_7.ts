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
    The scope of a member name declared in an enum declaration is the body of that declaration and every enum declaration with the same root and the same qualified name relative to that root.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

enum E1 {
   a, b, c,
}
enum E2 {
   a, b, c,
}
enum E1 {
   d = 0,
}
Assert.equal(E1.a, 0);
Assert.equal(E2.a, 0);
Assert.equal(E1.d, 0);