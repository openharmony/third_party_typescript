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
  In TypeScript 3.1, mapped object types over tuples and arrays now produce new tuples/arrays, 
  rather than creating a new type where members like push(), pop(), and length are converted.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

type Type<T> = {
    [k in keyof T]: Array<T[k]>;
};
type tuple = [number, string, boolean];
type tt = Type<tuple>;
let cc: tt = [
    [0, 1, 2, 3],
    ["a", "b", "c", "d"],
    [false, true],
];
Assert.equal(Array.isArray(cc), true);
Assert.equal(cc.length, 3);
cc.push([1, 2, 3]);
cc.push([false, false]);
cc.push(["hello", "world"]);
Assert.equal(cc.length, 6);

let vv: any = cc.pop();
Assert.equal(vv[0], "hello");
Assert.equal(vv[1], "world");
Assert.equal(cc.length, 5);
