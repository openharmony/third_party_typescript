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
    Copying Array Methods
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

const myArray = ['AAA', 'BBB', 'CCC'];
const updatedArray = myArray.with(1, 'DDD');

Assert.equal(updatedArray[0], 'AAA');
Assert.equal(updatedArray[1], 'DDD');
Assert.equal(updatedArray[2], 'CCC');

Assert.equal(myArray[0], 'AAA');
Assert.equal(myArray[1], 'BBB');
Assert.equal(myArray[2], 'CCC');