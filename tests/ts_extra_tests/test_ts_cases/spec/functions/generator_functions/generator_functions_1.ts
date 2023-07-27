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
 description: Generator Functions
 options:
   lib: es2015
   target: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

function* generator(): IterableIterator<number> {
  yield 0;
  yield 1;
  yield 2;
}
const iterator = generator();
let cc = iterator.next();
Assert.equal(cc.value, 0);
Assert.equal(cc.done, false);
cc = iterator.next();
Assert.equal(cc.value, 1);
Assert.equal(cc.done, false);
cc = iterator.next();
Assert.equal(cc.value, 2);
Assert.equal(cc.done, false);
cc = iterator.next();
Assert.equal(cc.value, undefined);
Assert.equal(cc.done, true);