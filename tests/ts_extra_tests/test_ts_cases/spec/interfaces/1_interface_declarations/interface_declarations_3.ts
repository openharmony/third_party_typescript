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
   Since function and constructor types are just object types containing call and construct signatures, interfaces can
   be used to declare named function and constructor types
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

{
    interface Example1 {
        (h_a: string, h_b: string): number;
    }

    let sc: Example1 = (h_a: string, h_b: string): number => { return h_a.charCodeAt(0) + h_b.charCodeAt(0); };
    Assert.equal(sc('a', 'b'), 195);
};
