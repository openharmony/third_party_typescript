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
  That’s part of why TypeScript 4.5 allows a type modifier on individual named imports.
  BaseType is always guaranteed to be erased and someFunc will be preserved under preserveValueImports.
module: ESNext
isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"
import type { PrivateType } from "./some-module.js"
import  { privateF } from "./some-module.js"


export class Type implements PrivateType {
  func() {
    return privateF();
  }
}

const type = new Type();
Assert.isFunction(Type);
Assert.equal(type.func(), 15);