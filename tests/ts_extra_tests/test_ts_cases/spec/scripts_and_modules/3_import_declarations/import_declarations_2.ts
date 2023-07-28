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
   imports the module with the given name and creates a local binding for the module itself. The local binding is
   classified as a value (representing the module instance) and a namespace (representing a container of types and
   namespaces).
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'
import { h_x, h_y, h_z } from '../1_programs_and_source_files/source_2.js';

Assert.equal(h_x, 0);
Assert.equal(h_y, 1);
Assert.equal(h_z, 2);
