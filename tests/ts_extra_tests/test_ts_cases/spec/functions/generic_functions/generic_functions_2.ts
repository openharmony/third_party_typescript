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
   The type arguments of a call to a generic function may be explicitly specified in a call operation
   or may, when possible, be inferred from the types of the regular arguments in the call.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function identity<T>(arg: T): T {
  return arg;
}
Assert.equal(identity(0), 0);
Assert.equal(identity<number>(0), 0);
Assert.equal(identity("hello"), "hello");
Assert.equal(identity<string>("hello"), "hello");
Assert.equal(identity(true), true);
Assert.equal(identity<boolean>(true), true);