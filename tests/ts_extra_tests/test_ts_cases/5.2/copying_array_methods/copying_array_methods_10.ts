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


import { Assert } from '../../../suite/assert.js';

const myArray = [true, false, true];
const splicedArray = myArray.toSpliced(1, 1, false, false);

Assert.equal(splicedArray[0], true);
Assert.equal(splicedArray[1], false);
Assert.equal(splicedArray[2], false);
Assert.equal(splicedArray[3], true);

Assert.equal(myArray[0], true);
Assert.equal(myArray[1], false);
Assert.equal(myArray[2], true);
