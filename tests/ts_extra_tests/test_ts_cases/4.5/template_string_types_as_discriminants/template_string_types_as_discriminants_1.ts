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
  TypeScript 4.5 now can narrow values that have template string types, and also recognizes template string types as discriminants.
module: ESNext
isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

interface Message {
    pattern: string;
    location: string;
}

interface SMessage {
    pattern: `${string}SMessage`;
    location: string;
}

interface EMessage {
    pattern: `${string}EMessage`;
    message: string;
}

function RunTest(r: SMessage | EMessage |Message) {
    if (r.pattern === "WinSMessage") {
        let token = r.pattern;
        Assert.equal(token, "WinSMessage");
    } else {
        Assert.equal(r.pattern, "LostEMessage");
    }
}

const successMessage: SMessage = {
    pattern: "WinSMessage",
    location: "request SMessage"
}

const errorMessage: EMessage = {
    pattern: "LostEMessage",
    message: "100-continue"
}

RunTest(successMessage);
RunTest(errorMessage);