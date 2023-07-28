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
description: Dynamic import expressions are a new feature and part of ECMAScript that allows users to asynchronously request a module at any arbitrary point in your program.
module: ESNext
isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'
async function func(x: number, y: number): Promise<number> {
  const add = await import("./lib.js");
  const sum = add.add(x, y);
  return sum;
}

func(10, 20).then((sum) => {
  Assert.equal(30, sum);
});
