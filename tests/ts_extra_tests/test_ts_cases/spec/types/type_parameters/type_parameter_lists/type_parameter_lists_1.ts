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
  Class, interface, type alias, and function declarations may optionally include 
  lists of type parameters enclosed in < and > brackets.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class MinClass<T> {
  public list: T[] = [];
  add(v: T) {
    this.list.push(v);
  }
  findminNumberValue(): T {
    let minNum = this.list[0];

    for (let i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}

let minStringValue = new MinClass();
minStringValue.add("a");
minStringValue.add("b");
minStringValue.add("c");
minStringValue.add("d");
Assert.equal(minStringValue.findminNumberValue(), "a");

let minNumberValue = new MinClass();
minNumberValue.add(1);
minNumberValue.add(2);
minNumberValue.add(3);
minNumberValue.add(4);
Assert.equal(minNumberValue.findminNumberValue(), 1);
