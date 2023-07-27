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
  This feature was supported before TypeScript 2.1, 
  but only when targeting ES6/ES2015. 
  TypeScript 2.1 brings the capability to ES3 and ES5 run-times.
 options:
  lib:dom,es5,es2015.promise
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function dTime(milli: number) {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, milli);
    });
}
async function showMsg(a: number, b: string) {
    Assert.equal(a, 12);
    for (let i = 0; i < 5; i++) {
        await dTime(300);
        Assert.equal(b, "New");
    }
    Assert.equal(b, "New");
}
showMsg(12, "New");
