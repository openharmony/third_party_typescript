/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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
   A variable declaration and 'require' call is emitted for a particular imported module only if the imported module, or
   a local alias that references the imported module, is referenced as a PrimaryExpression somewhere in the body of the
   importing module. If an imported module is referenced only as a NamespaceName or TypeQueryExpression,nothing is emitted.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js';
import * as g from '../1_programs_and_source_files/source_10.js';

let p: g.Point = { x: 10, y: 20 };
Assert.equal(p.x, 10);
Assert.equal(p.y, 20);