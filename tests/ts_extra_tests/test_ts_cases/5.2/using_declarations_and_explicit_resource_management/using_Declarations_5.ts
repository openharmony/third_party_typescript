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
import * as fs from 'fs';

(Symbol as { dispose: symbol }).dispose ??= Symbol('Symbol.dispose');

class TempFile implements Disposable {
  path: string;
  handle: number;

  constructor(path: string) {
    this.path = path;
    this.handle = fs.openSync(path, 'w+');
  }

  [Symbol.dispose]() {
    // Close the file and delete it.
    fs.closeSync(this.handle);
    fs.unlinkSync(this.path);

    Assert.equal(this.path, 'a');
  }
}

function doSomething(): void {
  using file = new TempFile('a');
}

doSomething();