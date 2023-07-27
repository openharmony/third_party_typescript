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
    An ambient variable declaration introduces a variable in the containing declaration space.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

declare type variable1 = number;
declare type variable2 = string;
declare type variable3 = (vab1: number, vab2: string) => string;;

var vab1: variable1 = 3;
let vab2: variable2 = "www";
const vab3: variable3 = (vab1, vab2) => { return vab1 + vab2; }

Assert.equal(typeof vab1, "number");
Assert.equal(typeof vab2, "string");
Assert.equal(vab3(vab1, vab2), "3www");

declare var v1: any;
declare let v2: boolean;
declare const v3: 1024;
let vv1: typeof v1 = true;
Assert.equal(vv1, true);
vv1 = 'vv1';
Assert.equal(vv1, 'vv1');
vv1 = 999;
Assert.equal(vv1, 999);
let vv2: typeof v2 = true;
Assert.isTrue(vv2);
let vv3: typeof v3 = 1024;
Assert.equal(vv3, 1024);