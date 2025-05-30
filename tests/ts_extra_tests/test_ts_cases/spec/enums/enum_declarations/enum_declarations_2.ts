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
    the numeric index signature reflects a "reverse mapping" that is automatically generated in every enum object. 
    the reverse mapping provides a convenient way to obtain the string representation of an enum value
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

enum Animal {
  Cat = 0xff0000,
  Dog = 0x00ff00,
  Pig = 0x0000ff,
}
var dog = Animal.Dog;
Assert.isNumber(dog);
Assert.isString(Animal[dog]);
Assert.equal("Dog", Animal[dog]);