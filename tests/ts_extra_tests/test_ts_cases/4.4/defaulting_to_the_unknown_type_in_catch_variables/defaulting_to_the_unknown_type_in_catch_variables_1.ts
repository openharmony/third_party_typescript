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
  TypeScript 4.4 introduces a new flag called useUnknownInCatchVariables. 
  This flag changes the default type of catch clause variables from any to unknown.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

function fun(a: any) {
    if (typeof a === "number") {
    } else {
        throw new Error("type error");
    }
}

try {
    fun("string");
} catch (err) {
    Assert.equal(err instanceof Error, true);
    if (err instanceof Error) {
        Assert.equal(err.message, "type error");
    }
};
