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
  Distributive conditional types
module: ESNext
isCurrent: true
---*/


import { Assert } from "../../suite/assert.js"
type TypeGather<T> =
    T extends string ? string :
    T extends number ? number :
    T extends boolean ? boolean :
    T extends undefined ? undefined :
    T extends Function ? Function :
    object;


type TSF = TypeGather<string | (() => void)>;
type TSSA = TypeGather<string | string[] | undefined>;
type TSANA = TypeGather<string[] | number[]>;

type GatherValue<T> = { value: T };
type GatherArray<T> = { array: T[] };
type Gather<T> = T extends any[] ? GatherArray<T[number]> : GatherValue<T>;

type TGS = Gather<string>;
type TGNA = Gather<number[]>;
type TGSNA = Gather<string | number[]>;

let a: TSF = 's';
let b: TSF = (() => { });
let c: TSSA = 's';
let d: TSSA = ['s'];
let e: TSSA = undefined;
let f: TSANA = ['s'];
let g: TSANA = [1];
let h: TGS = { value: "s" };
let i: TGNA = { array: [1] };
let j: TGSNA = { value: "s" };
let k: TGSNA = { array: [1] };

Assert.equal(typeof a, 'string');
Assert.equal(typeof b, 'function');
Assert.equal(typeof c, 'string');
Assert.equal(typeof d, 'object');
Assert.equal(typeof e, 'undefined');
Assert.equal(typeof f, 'object');
Assert.equal(typeof g, 'object');
Assert.equal(typeof h, 'object');
Assert.equal(typeof i, 'object');
Assert.equal(typeof j, 'object');
Assert.equal(typeof k, 'object');
