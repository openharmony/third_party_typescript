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
   The resulting type is an array type with an element type that is the union of the types of 
   the non-spread element expressions and the numeric index signature types of the spread element expressions.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let arr = [1, 2, ...["three", "four"], 5];
Assert.isNumber(arr[0]);
Assert.isNumber(arr[1]);
Assert.isString(arr[2]);
Assert.isString(arr[3]);
Assert.isNumber(arr[4]);