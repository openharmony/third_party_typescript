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
    If index is of type Any, the String or Number primitive type, 
    or an enum type, the property access is of type Any.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface MyObject {
  [key: string]: number;
}
const obj: MyObject = {
  prop1: 1,
  prop2: 2,
  prop3: 3,
};
const value2 = obj[0];
Assert.equal(value2, undefined);
enum MyEnum {
  Prop1 = "prop1",
  Prop2 = "prop2",
  Prop3 = "prop3",
}
const value3 = obj[MyEnum.Prop3];
Assert.equal(value3, 3);