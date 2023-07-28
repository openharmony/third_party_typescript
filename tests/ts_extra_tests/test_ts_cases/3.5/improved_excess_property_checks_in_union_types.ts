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
   In TypeScript 3.5, the type-checker at least verifies that all the provided properties belong to some union member and have the appropriate type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../suite/assert.js'

interface I{
    num: number;
    mem2: string;
}
type T = {
    num: number;
    str: string;
}

type ut = I | T;
let result: ut = {
    mem2: 'member',
    num: 10,
    str: 'string'
}
Assert.isNumber(result.num);
Assert.isObject(result);