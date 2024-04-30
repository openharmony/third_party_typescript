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


import { Assert } from '../../../suite/assert.js'
import * as fs from 'fs'

(Symbol as { dispose: symbol }).dispose ??= Symbol('Symbol.dispose');

function openFile(path: string) {
  const file = fs.openSync(path, 'w+');

  return {
    handle: file,
    [Symbol.dispose]() {
      fs.closeSync(this.handle);

      Assert.isTrue(path === 'a' || path === 'b' || path === 'c' || path === 'd' || path === 'e');
    },
  };
}

function func() {
  using a = openFile('a');
  using b = openFile('b');
  {
    using c = openFile('c');
    using d = openFile('d');
  }
  using e = openFile('e');

  return;
  using f = openFile('f');
}

func();