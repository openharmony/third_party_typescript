/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
    Easier Method Usage for Unions of Arrays
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js';

let array: string[] | number[];
array = [1, 2, 3, 4];

const filteredArray = array.filter(x => !!x);
const lastIndexOfA = filteredArray.lastIndexOf(4);

Assert.equal(lastIndexOfA, 3);