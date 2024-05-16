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
    Method Decorator：tracing method invocations 
 module: ES2022
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js';

function trace(value: Function, context: {
  kind: string
}): ((this: unknown, ...args: unknown[]) => string) | undefined {
  if (context.kind === 'method') {
    return function (this: unknown, ...args: unknown[]): string {
      const result = value.apply(this, args) + '!!!';
      return result;
    };
  }
  return undefined;
}

class StringBuilder {
  str = '';

  @trace
  add(newStr: string): void {
    this.str += newStr;
  }

  @trace
  toString(): string {
    return this.str;
  }
}

const sb = new StringBuilder();
sb.add('Home');
sb.add('page');

Assert.equal(sb.toString(), 'Homepage!!!');