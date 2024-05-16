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
    using Declarations and Explicit Resource Management
 lib: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js';

(Symbol as { asyncDispose: symbol }).asyncDispose ??= Symbol('Symbol.asyncDispose');

async function doWork(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));
}

function loggy(id: string): AsyncDisposable {
  console.log(`Constructing ${id}`);

  return {
    async [Symbol.asyncDispose]() {
      console.log(`Disposing (async) ${id}`);
      await doWork();

      Assert.isTrue(id === 'a' || id === 'b' || id === 'c' || id === 'd' || id === 'e');
    }
  };
}

async function func(): Promise<void> {
  await using a = loggy('a');
  await using b = loggy('b');
  {
    await using c = loggy('c');
    await using d = loggy('d');
  }
  await using e = loggy('e');

  return;
  // Unreachable.
  // Never created, never disposed.
  await using f = loggy('f');
}

func();