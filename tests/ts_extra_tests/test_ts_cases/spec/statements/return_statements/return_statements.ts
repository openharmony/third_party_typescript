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
 description: Return Statements
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

function h_f(): (h_x: string) => number {
    return h_s => h_s.length;
}

Assert.equal(11, h_f()("openharmony"));

function testReruen() {
    for (let i = 0; i < 10; i++) {

        if (i == 5) {
            return i;
        }
    }
}
Assert.equal(5, testReruen());
