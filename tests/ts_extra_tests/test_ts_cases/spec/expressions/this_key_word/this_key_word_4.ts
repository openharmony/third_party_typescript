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
    The type of this in an expression depends on the location in which the reference takes place:In the global namespace, this is of type Any.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'
let obj = {
    a: 1024,
    ADD(a: number) {
        return this.a + a;
    },
    getType() {
        return typeof this;
    },
    getThis() {
        return this;
    }
}
Assert.equal(obj.ADD(1), 1025);
Assert.equal(obj.getType(), 'object');
let obj2 = obj.getThis();
Assert.equal(JSON.stringify(obj2), '{"a":1024}');

const t1 = this;
Assert.isUndefined(t1);

const t2 = globalThis;
Assert.equal(t2.JSON.stringify(obj.getThis()), JSON.stringify(obj2.getThis()));