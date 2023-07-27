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
    A // @ts-ignore comment suppresses all errors that originate on the following line. 
    It is recommended practice to have the remainder of the comment following @ts-ignore explain which error is being suppressed.
    Please note that this comment only suppresses the error reporting, and we recommend you use this comments very sparingly.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function addString(str: string, str2: string): string {
    str += "";
    str2 += "";
    return str + str2;
}
// @ts-ignore
let n: number = addString(114, 514);
Assert.isString(n);
Assert.equal(n, "114514");
