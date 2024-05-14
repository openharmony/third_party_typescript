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

(Symbol as { dispose: symbol }).dispose ??= Symbol('Symbol.dispose');

class ErrorName extends Error {
  name = 'ErrorName';
}

class ErrorSuppressed extends Error {
  name = 'ErrorSuppressedName';
}

type ThrowReturnType = {
  [Symbol.dispose](): void;
};

function throwError(id: string): ThrowReturnType {
  return {
    [Symbol.dispose]() {
      throw new ErrorName(`Error from ${id}`);
    }
  };
}

function func(): void {
  using a = throwError('a');
  throw new ErrorSuppressed('oops!')
}

try {
  func();
}
// The type of 'e' can only be any or unknown. When the type is unknown, the equivalent of 'e.name' cannot be found
catch (e: any) {
  Assert.equal(e.name, 'SuppressedError');
  Assert.equal(e.message, 'An error was suppressed during disposal.');
  Assert.equal(e.error.name, 'ErrorName');
  Assert.equal(e.error.message, 'Error from a');
  Assert.equal(e.suppressed.name, 'ErrorSuppressedName');
  Assert.equal(e.suppressed.message, 'oops!');
}