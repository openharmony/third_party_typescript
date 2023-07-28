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
    when a line is preceded by a // @ts-expect-error comment, TypeScript will suppress that error from being reported; but if there’s no error, TypeScript will report that // @ts-expect-error wasn’t necessary.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function toASCIICode(s: string) {
    s += "";
    let arr: number[] = [];
    let char: string[] = s.split('');
    for (let i = 0; i < s.length; i++) {
        arr[i] = char[i].charCodeAt(0);
    }
    return arr;
}
// @ts-expect-error
let json = JSON.stringify(toASCIICode(123));

Assert.equal(json, "[49,50,51]");
