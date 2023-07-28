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
   Null- and undefined-aware types
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

let a: number;
let b: number | undefined;
let c: number | null | undefined;

a = 0;
Assert.equal(a,0);
b = 0;
Assert.equal(b,0);
b = undefined;
Assert.equal(b,undefined);
c = 0;
Assert.equal(c,0);
c = undefined;
Assert.equal(c,undefined);
c = null;
Assert.equal(c,null);
