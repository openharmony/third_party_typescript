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
import * as ID from './export_modifiers_0.js';

Assert.equal(ID.exp, 0);
Assert.equal(ID.econ, 0x1000);
let g = ID.arrList(0, 10);
let arr = ID.getGArr(g);
Assert.equal(JSON.stringify(arr), '[0,1,2,3,4,5,6,7,8,9]');
let ncolor = new ID.newColor('Red', [255, 0, 0]);
Assert.equal(ncolor.cname, 'Red');
Assert.equal(JSON.stringify(ncolor.color), '[255,0,0]');
let p: ID.Point = { x: 0, y: 0, pname: '00' };
Assert.equal(JSON.stringify(p), '{"x":0,"y":0,"pname":"00"}');
let ns: ID.NumStrKey = 'valueOf';
Assert.equal(ns, 'valueOf');
Assert.equal(ID.Color.Red, 0xFF0000);
Assert.equal(ID.N.x, 1024);