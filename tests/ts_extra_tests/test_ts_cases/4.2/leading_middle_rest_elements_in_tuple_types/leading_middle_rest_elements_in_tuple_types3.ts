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
   In prior versions, TypeScript only allowed '...rest' elements at the very last position of a tuple type.
   However, now rest elements can occur anywhere within a tuple.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

interface h_i{
  num: number;
}
interface h_f{
  str: string;
}
type myType = h_i | h_f;

let tup1: [...myType[], boolean];
tup1 = [true];
tup1 = [{ num: 10 }, true];
tup1 = [{ num: 10 }, { str: 'string' }, true];

let tup2: [string, ...myType[], boolean];
tup2 = ['a', false];
tup2 = ['a', { num: 10 }, false];
tup2 = ['a', { num: 10 }, { str: 'string' }, false];

let tup3: [string, boolean, ...myType[]];
tup3 = ['a', false];
tup3 = ['a', false, { num: 10 }];
tup3 = ['a', false, { num: 10 }, { str: 'string' }];

Assert.equal(JSON.stringify(tup1), "[{\"num\":10},{\"str\":\"string\"},true]");
Assert.equal(JSON.stringify(tup2), "[\"a\",{\"num\":10},{\"str\":\"string\"},false]");
Assert.equal(JSON.stringify(tup3), "[\"a\",false,{\"num\":10},{\"str\":\"string\"}]");
