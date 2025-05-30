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
 description: Expressions controlling 'Do' statements can be of any type (and not just type Boolean).
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

var num = 1;
do {
    if (num % 5 == 0) {

        break;
    }
    num++;
} while (num);
Assert.equal(5, num);

do {
    num++;
} while (num < 100);

Assert.equal(100, num);


var myObject = {
    d: 1,
}
do {
    if (myObject.d % 5 == 0) {

        break;
    }
    myObject.d++;
} while (myObject);
Assert.equal(5, myObject.d);