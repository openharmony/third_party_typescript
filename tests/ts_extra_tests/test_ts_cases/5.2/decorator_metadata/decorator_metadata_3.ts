/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
    Decorator Metadata
 options:
  lib: ESNext.Decorators
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

Symbol.metadata ??= Symbol('Symbol.metadata')

interface Context {
  name: string;
  metadata: Record<PropertyKey, unknown>;
}

function setMetadata(_target: any, context: Context) {
  context.metadata[context.name] = true;
}

class SomeClass {
  @setMetadata
  static barriy = 'hello!';
}

const ourMetadata = SomeClass[Symbol.metadata];

Assert.equal(ourMetadata.barriy, true);