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
 description: TypeScript 4.4 allows index signatures for symbols and template string patterns.
 options:
   lib:es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface I {
  [keys: number | string]: any;
}
const x: any = Symbol("x");
const y: any = Symbol("y");
const z: any = Symbol("z");
let c: I = {};
c[x] = 0xff0000;
c[y] = 0x00ff00;
c[z] = 0x0000ff;
Assert.isNumber(c[x]);