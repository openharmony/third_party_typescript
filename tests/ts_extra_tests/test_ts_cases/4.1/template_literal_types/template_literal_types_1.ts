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
    String literal types in TypeScript allow us to model functions and APIs that expect a set of specific strings.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function getnum(x: "a" | "b" | "c") {
  if (x == "a") return 1;
  else if (x == "b") return 2;
  else if (x == "c") return 3;
}
let num1 = getnum("a");
let num2 = getnum("b");
let num3 = getnum("c");
Assert.equal(num1, 1);
Assert.equal(num2, 2);
Assert.equal(num3, 3);
