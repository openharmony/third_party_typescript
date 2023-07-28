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
    TypeScript 4.5 introduces a new utility type called the Awaited type. 
    This type is meant to model operations like await in async functions,
    or the .then() method on Promises - specifically, the way that they recursively unwrap Promises;
    some of the problems around inference with Promise.all served as motivations for Awaited.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"


function ToP<T>(value: number): number | Promise<number> | PromiseLike<number> {
    return new Promise((resolve, reject) => {
        resolve(Math.random());
    });
}

async function operate(): Promise<[number, number]> {
    const result = await Promise.all([ToP(100), ToP(200)]);
    return result;
}

let D = operate().then(res => {
    Assert.isObject(res, "object");
});

type E = Awaited<Promise<typeof D>>;

let e: E;
Assert.equal(e, undefined);