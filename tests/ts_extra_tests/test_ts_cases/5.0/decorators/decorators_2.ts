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

function replaceMethod(value: Function, context: { kind: string }): (() => string) | undefined {
  if (context.kind === 'method') {
    return function (): string {
      return 'How are you?';
    };
  }
  return undefined;
}

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @replaceMethod
  hello(): string {
    return `Hi ${this.name}!`;
  }
}

const robin = new Person('Robin');
Assert.equal(robin.hello(), 'How are you?');