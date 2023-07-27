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
 description: With private fields, each field name is unique to the containing class.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

class stu {
    #x = 10;
    getX() {
        return this.#x;
    }
}

class Dtu extends stu {
    #y = 20;
    getY() {
        return this.#y;
    }
}

let dt = new Dtu();

Assert.equal(10, dt.getX());
Assert.equal(20, dt.getY());