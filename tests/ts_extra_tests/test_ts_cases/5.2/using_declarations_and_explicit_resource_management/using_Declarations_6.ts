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

(Symbol as { asyncDispose: symbol; dispose: symbol }).asyncDispose ??= Symbol('Symbol.asyncDispose');
(Symbol as { dispose: symbol }).dispose ??= Symbol('Symbol.dispose');

function loggy(id: string): Disposable {
  console.log(`Constructing ${id}`);

  return {
    [Symbol.dispose]() {
      console.log(`Disposing ${id}`);
      Assert.isTrue(id === 'a' || id === 'b' || id === 'c' || id === 'd' || id === 'e');
    }
  };
}

function func(): void {
  using a = loggy('a');
  using b = loggy('b');
  {
    using c = loggy('c');
    using d = loggy('d');
  }
  using e = loggy('e');
}

func();