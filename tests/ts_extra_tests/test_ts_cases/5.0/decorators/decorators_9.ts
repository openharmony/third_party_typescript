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
    Accessor Decorator
 module: ES2022
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js';

interface ReturnType {
  get(): number;
  set(val: number): void;
  init(initialValue: number): number;
}

// The type of 'value' can only be any. If other types are set, 
// it will prompt that the get/set attribute does not exist for that type
function accessorDecorator(value: any, context: { kind: string }): ReturnType | undefined {
  if (context.kind === 'accessor') {
    let { get, set } = value;

    return {
      get(): number {
        return get.call(this);
      },

      set(val: number): void {
        Assert.equal(val, 123);
        return set.call(this, val);
      },

      init(initialValue: number): number {
        Assert.equal(initialValue, 1);
        return initialValue;
      }
    };
  }
  return undefined;
}

class AccessorTest {
  @accessorDecorator
  accessor x = 1;
}

let d = new AccessorTest();
d.x;
d.x = 123;