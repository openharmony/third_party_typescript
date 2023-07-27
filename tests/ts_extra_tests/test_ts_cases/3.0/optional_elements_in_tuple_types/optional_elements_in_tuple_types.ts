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
   Optional elements in tuple types , Rest elements in tuple types
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

let o1:[number, ...string[]] = [1, '1', '2']
let o2:[number, ...string[]] = [1, '1', '2', '3']
Assert.equal(o1.length, 3)
Assert.equal(o2.length, 4)

let o3: [string, string?, number?]
o3 = ['test', "hello", 1];
Assert.equal(o3.length, 3)
o3 = ['test', "hello"];
Assert.equal(o3.length, 2)
o3 = ['test'];
Assert.equal(o3.length, 1)

