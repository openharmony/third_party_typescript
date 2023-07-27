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
 description: Accessing a private field on any other type will result in a TypeError!
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

class stu {
    #len: number;
    constructor(len: number) {
        this.#len = len;
    }
    compare(other: any) {
        return this.#len === other.#len;
    }
}

const a = new stu(300);
const c = new stu(300);


Assert.isTrue(a.compare(c));