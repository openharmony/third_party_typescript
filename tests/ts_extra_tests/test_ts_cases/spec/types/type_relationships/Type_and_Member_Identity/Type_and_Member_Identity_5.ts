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
   Two members are considered identical when they are public properties with identical names, optionality, and types. 
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface M{
    str: string;
    mem?: number;
}
interface M{
    str: string;
    mem?: number;
    boo: boolean;
}
let a: M = {
    str: 'a',
    mem: 5,
    boo: true
}
let b: M = {
    str: 'a',
    mem: 5,
    boo: false
}
Assert.equal(typeof a.str, typeof b.str);
Assert.equal(typeof a.mem, typeof b.mem);