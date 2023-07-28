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
   The star of the show in optional chaining is the new ?. operator for optional property accesses.
module: ESNext
isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

const obj1 = {
    x: {
        y: 'NARC'
    }
};

let str = obj1?.x.y;

Assert.equal(str, "NARC");