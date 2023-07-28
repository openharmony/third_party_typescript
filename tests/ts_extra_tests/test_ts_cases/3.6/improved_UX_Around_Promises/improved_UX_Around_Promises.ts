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
 description: For example, it’s often very common to forget to .then() or await the contents of a Promise before passing
   it to another function. TypeScript’s error messages are now specialized, and inform the user that perhaps they should
   consider using the await keyword.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

let s = 1;
let t = 1;
function d1() {
    s = 2
}
let i = 0;
async function  d2(this:any):Promise<any> {
    s = 3;
    return s;
}
async function  d3(this:any):Promise<any> {
    t = 3;
    return t;
}



async function d4() {
    d1();
    Assert.equal(s, 2);
    d2().then(
        () => {
            s = 5
        }
    );
    Assert.equal(s, 3);
    await d3().then(
        () => {
            t = 5
        }
    );
    Assert.equal(t, 5);
}
d4().then(r => {});



