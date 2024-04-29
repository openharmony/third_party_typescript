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
    Method Decorator：binding methods to instances
 module: ES2022
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function bind(value: Function, context: { kind: string, name: string, addInitializer(initializer: () => void): void }) {
  if (context.kind === 'method') {
    context.addInitializer(function (this: any) {
      this[context.name] = value.bind(this);
    });
  }
}

class Color {
  name: string;
  
  constructor(myName: string) {
    this.name = myName;
  }

  @bind
  toString() {
    return this.name;
  }
}

const green = new Color('green').toString;
Assert.equal(green(), 'green');