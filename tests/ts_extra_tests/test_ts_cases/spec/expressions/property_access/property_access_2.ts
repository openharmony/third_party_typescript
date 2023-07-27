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
    Tuple types assign numeric names to each of their elements and elements are therefore strongly typed 
    when accessed using bracket notation with a numeric literal.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

var myArry: [number, string, boolean] = [10, 'string', true];
var h_n = myArry[0];
Assert.isNumber(h_n);
var h_s = myArry[1];
Assert.isString(h_s);
var h_b = myArry[2];
Assert.isBoolean(h_b);