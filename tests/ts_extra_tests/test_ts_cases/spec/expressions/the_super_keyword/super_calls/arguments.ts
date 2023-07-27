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
       Type arguments cannot be explicitly specified in a super call.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class SuperClass<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}
class SubClass<T> extends SuperClass<T> {
  constructor(value: T) {
    super(value);
  }
}
const sub = new SubClass("hello");
Assert.equal(sub.value, "hello");