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
  You might find yourself using ?. to replace a lot of code that performs repetitive nullish checks using the && operator.
module: ESNext
isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

const obj = {
    x: {
        y: 'e2'
    }
};

if (obj?.x?.y) {
    Assert.equal(obj?.x?.y, "e2", "true");
}
if (obj && obj.x && obj.x.y) {
    Assert.equal(obj && obj.x && obj.x.y, "e2", "true");
};