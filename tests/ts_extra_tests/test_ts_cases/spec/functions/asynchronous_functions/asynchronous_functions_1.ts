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
   An Async Function is a JavaScript Function, Parameterized Arrow Function, Method that has been prefixed with the async modifier.
   An Async Function must provide a return type annotation that points to a compatible Promise type.
   Return type inference can only be used if there is a globally defined, compatible Promise type.
 options:
   lib:es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let pp: Promise<number> = Promise.resolve(1);
async function fetchTest1(): Promise<number> {
    return await pp;
}
fetchTest1().then((params) => {
    Assert.equal(params, 1);
});
async function fetchTest1NoReturnType() {
    return await pp;
}
fetchTest1NoReturnType().then((params) => {
    Assert.equal(params, 1);
});
const fetchTest2 = async (): Promise<number> => {
    return await pp;
};
fetchTest2().then((params) => {
    Assert.equal(params, 1);
});
const fetchTest2NoReturnType = async () => {
    return await pp;
};
fetchTest2NoReturnType().then((params) => {
    Assert.equal(params, 1);
});
class Person {
    async fetchTest3(): Promise<number> {
        return await pp;
    }
    async fetchTest3NoReturnType() {
        return await pp;
    }
}
new Person().fetchTest3().then((params) => {
    Assert.equal(params, 1);
});
new Person().fetchTest3NoReturnType().then((params) => {
    Assert.equal(params, 1);
});