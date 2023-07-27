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
  One use of optional chain is optional element access, which acts similarly to optional property accesses, but allows us to access non-identifier properties (e.g. arbitrary strings, numbers).
module: ESNext
isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

function func<T>(arr?: T[]) {
  return arr?.[0];
}

const arr: number[] = [1, 25, 8];
Assert.equal(func<number>(arr), 1, "true");

const arrStr: string[] = ["flower", "xian"];
Assert.equal(func<string>(arrStr), "flower", "true");