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
   TypeScript 3.5 introduces the new Omit helper type, which creates a new type with some properties dropped from the original.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../suite/assert.js'

{
    type TA = {
        a: string;
        b: number;
        c: string;
    };
    type TB = Omit<TA, "c">;
    let s: TB = {
        a: 'string',
        b: 1,
    }
    let s1: TA = {
        a: 'string',
        b: 1,
        c: 'string'
    }
    Assert.isFalse("c" in s)
    Assert.isTrue("c" in s1);
};