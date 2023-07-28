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
    Index signatures, which define type constraints for properties in the given type. 
    An object type can have at most one string index signature and one numeric index signature.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface numberIndex {
    [index: number]: string
}
let numberTest: numberIndex = ['1', '2', '3']
Assert.equal(numberTest[0], '1');
Assert.equal(numberTest[1], '2');
Assert.equal(numberTest[2], '3');