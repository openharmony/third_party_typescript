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
    TypeScript 5.0 manages to make all enums into union enums by creating a unique type for each computed member. 
 module: ES2022
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js';

enum E {
  A = 10 * 10, // Numeric literal enum member
  B = 'foo', // String literal enum member
  C = Math.random() // Opaque computed enum member
}

function getStringValue(e: E): string {
  return String(e);
}

Assert.equal(getStringValue(E.A), 100);
Assert.equal(getStringValue(E.B), 'foo');