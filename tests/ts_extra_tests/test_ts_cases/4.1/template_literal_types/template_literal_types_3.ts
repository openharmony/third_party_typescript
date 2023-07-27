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
    The new type aliases are Uppercase, Lowercase, Capitalize and Uncapitalize.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type UpperHello<T extends string> = `${Uppercase<T>}`;
type LowerHello<T extends string> = `${Lowercase<T>}`;
type CapHello<T extends string> = `${Capitalize<T>}`;
type UncapHello<T extends string> = `${Uncapitalize<T>}`;
type HELLO = UpperHello<"hello">;
type hello = LowerHello<"HEllO">;
type Hello = CapHello<"hello">;
type hELLO = UncapHello<"HELLO">;
function gethello(hi: HELLO | hello | Hello | hELLO) {
  if (hi == "HELLO") return 1;
  else if (hi == "hello") return 2;
  else if (hi == "Hello") return 3;
  else if (hi == "hELLO") return 4;
}
let hi1 = gethello("HELLO");
Assert.equal(hi1, 1);
let hi2 = gethello("hello");
Assert.equal(hi2, 2);
let hi3 = gethello("Hello");
Assert.equal(hi3, 3);
let hi4 = gethello("hELLO");
Assert.equal(hi4, 4);
