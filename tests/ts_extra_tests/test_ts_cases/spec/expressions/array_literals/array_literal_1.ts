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
    If the array literal contains no spread elements, and if the array literal is contextually typed (section 4.23) 
    by a type T and T has a property with the numeric name N, where N is the index of the element expression in the array literal, 
    the element expression is contextually typed by the type of that property.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface MyArray {
  0: number;
  1: string;
  length: 2;
}
const myArray: MyArray = [42, "hello"];
Assert.isNumber(myArray[0]);
Assert.isString(myArray[1]);