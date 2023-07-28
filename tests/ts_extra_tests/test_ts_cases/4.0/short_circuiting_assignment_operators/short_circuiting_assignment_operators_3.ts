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
    On the rare case that you use getters or setters with side-effects, it’s worth noting that these operators only perform assignments if necessary.
    In that sense, not only is the right side of the operator “short-circuited” - the assignment itself is too.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

const obj = {
  get prop() {
    return true;
  },
  set prop(_val: boolean) { },
};
function test01() {
  return true;
}
obj.prop = obj.prop || test01();
Assert.equal(obj.prop, true);
