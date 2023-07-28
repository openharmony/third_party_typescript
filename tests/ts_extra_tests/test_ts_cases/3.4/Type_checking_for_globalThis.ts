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
    globalThis provides a standard way for accessing the global scope which can be used across different environments.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../suite/assert.js"

var nm = 10010;
let gt:any = globalThis
gt.nm = 10086;
Assert.equal(gt.nm,10086);
Assert.equal(typeof gt.nm,"number");

var np = "sss";
let gp:any = globalThis
gp.np = "nanj";
Assert.equal(gp.np,"nanj");
Assert.notEqual(typeof gp.np,"number");
Assert.isString(gp.np);