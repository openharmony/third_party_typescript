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
   An interface declaration declares an interface type.
   An InterfaceDeclaration introduces a named type (section 3.7) in the containing declaration space.
   The BindingIdentifier of an interface declaration may not be one of the predefined type names (section 3.8.1).
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'
import { message } from '../1_programs_and_source_files/source_1.js';

Assert.equal(message(), 'string');
