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
   Import declarations are used to import entities from other modules and provide bindings for them in the current module.
 options:
    lib: es2015
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'
import { A, B, C, D, E, F, G, H, I } from './export_member_set_0.js';

Assert.equal(A, 0);
Assert.equal(B, 0x1000);
let g = D(0, 10);
let arr = C(g);
Assert.equal(JSON.stringify(arr), '[0,1,2,3,4,5,6,7,8,9]');
let ncolor = new E('Red', [255, 0, 0]);
Assert.equal(ncolor.cname, 'Red');
Assert.equal(JSON.stringify(ncolor.color), '[255,0,0]');
let p: F = { x: 0, y: 0, pname: '00' };
Assert.equal(JSON.stringify(p), '{"x":0,"y":0,"pname":"00"}');
let ns: G = 'valueOf';
Assert.equal(ns, 'valueOf');
Assert.equal(H.Red, 0xFF0000);
Assert.equal(I.x, 1024);