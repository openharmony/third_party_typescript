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
    When an identifier is resolved as a PrimaryExpression, only names in scope with a value meaning are considered and other names are ignored.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../../suite/assert.js";

var v: number = 333;
interface v {
   v: string;
}
Assert.equal(v, 333);

let v0: v = { v: "v" };
Assert.equal(v0.v, "v");