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
    Function types with multiple call or construct signatures cannot be written as function type literals 
    but must instead be written as object type literals.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface I {
    (x: string): number;
    (x: number): string
}
let i: I = Object.assign(function (x: any) {
    if (typeof x === 'string') {
        return x.toString();
    } else {
        return x.toString();
    }
})
Assert.equal(i('a'), 'a');
Assert.equal(i(2), 2);