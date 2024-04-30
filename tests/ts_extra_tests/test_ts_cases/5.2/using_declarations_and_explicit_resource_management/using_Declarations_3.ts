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

(Symbol as { dispose: symbol }).dispose ??= Symbol('Symbol.dispose');

class ErrorA extends Error {
  name = 'ErrorA';
}

class ErrorB extends Error {
  name = 'ErrorB';
}

function throwy(id: string) {
  return {
    [Symbol.dispose]() {
      throw new ErrorA(`Error from ${id}`);
    }
  };
}

function func() {
  using a = throwy('a');
  throw new ErrorB('oops!')
}

try {
  func();
}
catch (e: any) {
  Assert.equal(e.name, 'SuppressedError');
  Assert.equal(e.message, 'An error was suppressed during disposal.');
  Assert.equal(e.error.name, 'ErrorA');
  Assert.equal(e.error.message, 'Error from a');
  Assert.equal(e.suppressed.name, 'ErrorB');
  Assert.equal(e.suppressed.message, 'oops!');
}