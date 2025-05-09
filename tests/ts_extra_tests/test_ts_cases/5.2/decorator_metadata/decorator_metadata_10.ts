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
    Decorator Metadata: Private Metadata
 options:
  lib: ESNext.Decorators
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js';

Symbol.metadata ??= Symbol('Symbol.metadata');

const myMetadata = new WeakMap();

function meta(key: string, value: string): Function {
  return (_: unknown, context: { metadata: object; }): void => {
    let metadata = myMetadata.get(context.metadata);

    if (!metadata) {
      metadata = {};
      myMetadata.set(context.metadata, metadata);
    }

    metadata[key] = value;
  };
}

@meta('a', 'x')
class C {
  @meta('b', 'y')
  m(): void {}
}

Assert.equal(myMetadata.get(C[Symbol.metadata]).a, 'x');
Assert.equal(myMetadata.get(C[Symbol.metadata]).b, 'y'); 