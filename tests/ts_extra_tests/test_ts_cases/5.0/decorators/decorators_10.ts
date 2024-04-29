/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
    Class Decorator：making classes function-callable
 module: ES2022
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function logged(value: any, context: { kind: string }) {
  if (context.kind === 'field') {
    return function (initialValue: number) {
      return initialValue = 2;
    };
  }
}

class C {
  @logged x = 1;
}

Assert.equal(new C().x, 2); 