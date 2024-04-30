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

function meta(key: string, value: string) {
  return (_: any, context: { metadata: { [x: string]: string; }; }) => {
    context.metadata[key] = value;
  };
}

class C {
  @meta('b', 'y')
  m() {}
}

Assert.equal(C[Symbol.metadata].b, 'y'); 