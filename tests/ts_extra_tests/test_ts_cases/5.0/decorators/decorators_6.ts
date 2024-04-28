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
    Method Decorator：Class setter decorators
 module: ES2022
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function logged(value: Function, context: { kind: string }) {
  if (context.kind === 'setter') {
    return function (this: any, ...args: any[]) {
      const ret = value.call(this, ...args);
      return ret;
    };
  }
}

class A {
  public value: number = 0;

  @logged
  set x(newValue) {
    this.value = newValue;
  }

  get x() {
    return this.value;
  }
}

const X = new A();
X.x = 1;
Assert.equal(X.value, 1);