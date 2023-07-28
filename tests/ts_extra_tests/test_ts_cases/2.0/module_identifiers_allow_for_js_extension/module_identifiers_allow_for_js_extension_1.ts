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
description: With TypeScript 2.0, the compiler will look up definition of "moduleA.js" in ./moduleA.ts or ./moduleA.d.t.
module: ESNext
isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"
import { HelloWorld } from "./test_js_extension.js"

let world = new HelloWorld("HelloWorld.txt");
Assert.equal(world.txt, "HelloWorld.txt");
