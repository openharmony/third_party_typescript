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
   Type parameters declared in the signature of a function implementation are
   in scope in the signature and body of that function implementation.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

type XY = { x: number; y: number };
function f1<T>(arg: T): T {
  return arg;
}
Assert.equal(f1(0), 0);
Assert.equal(f1("hello"), "hello");
Assert.equal(f1(true), true);
function f2<T extends XY>(arg: T): T {
  return arg;
}
Assert.equal(JSON.stringify(f2<{ x: number, y: number, z: number }>({ x: 0, y: 0, z: 0 })), '{"x":0,"y":0,"z":0}');