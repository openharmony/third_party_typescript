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
  Previous versions of TypeScript treated optional object properties as 
  unassignable to otherwise compatible index signatures, due to the presence of undefined.
  TypeScript 4.2 allows this assignment.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

interface I{
    [key: string]: number;
}

type myType = {
    'a'?: number;
    'b'?: number;
    'c'?: number;
}
const eg: myType = { 'a': 10 };
const i: I = eg;
Assert.isObject(i);

const obj: { [key: string]: number } = eg;
Assert.isObject(obj);
