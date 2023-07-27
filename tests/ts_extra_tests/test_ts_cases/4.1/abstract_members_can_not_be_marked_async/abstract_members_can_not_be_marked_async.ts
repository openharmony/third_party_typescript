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
    Members marked as abstract can no longer be marked as async.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

abstract class Animal {
  abstract name: string;
  abstract eat(): number;
  run(): void { }
}
class Dog extends Animal {
  name: string = "dog";
  gender: string;
  constructor(gender: string) {
    super();
    this.gender = gender;
  }
  eat(): number {
    return 1;
  }
}
let dog = new Dog("male");
Assert.equal(dog.eat(), 1);
Assert.equal(dog.name, "dog");
