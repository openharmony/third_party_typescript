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
 description: Blocks {}
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

{
    var block1: number | undefined = 1024;
    let block2: string | undefined = "NARC";
    Assert.equal(block1, 1024);
    Assert.equal(block2, "NARC");
}
{
    var block1: number | undefined;
    let block2: string | undefined;
    Assert.equal(block1, 1024);
    Assert.isUndefined(block2);
}