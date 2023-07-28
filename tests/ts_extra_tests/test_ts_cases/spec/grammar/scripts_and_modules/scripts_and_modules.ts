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
    this appendix contains a summary of the grammar found in the main document.
    typescript grammar is a superset of the grammar defined in the ECMAScript 2015 Language Specification (specifically, the ECMA-262 Standard, 6th Edition) and this appendix lists only productions that are new or modified from the ECMAScript grammar.
 module: ESNext
 isCurrent: true
 ---*/


import * as sf1 from "./source_file_1.js";
import checkGenerator from "./source_file_2.js";
import arr1 from "./source_file_3.js";
import PointXY from "./source_file_4.js";
import { Assert } from "../../../../suite/assert.js";

Assert.equal(sf1.num, 1408);

Assert.equal(sf1.show(), "show");

let a3: Generator<number, void, unknown> = sf1.arr3(9);
checkGenerator(a3, 3);

let green = new sf1.Color(0, 255, 0);
Assert.equal(JSON.stringify(green.ColorData), '[0,255,0]');

let p: sf1.Point = { x: 0, y: 0 };
Assert.equal(p.x, 0);
Assert.equal(p.y, 0);

let arrstrnum: sf1.ArrStrNum;
arrstrnum = ["a", "b", "c", "d", "e"];
Assert.equal(JSON.stringify(arrstrnum), '["a","b","c","d","e"]');
arrstrnum = [1, 2, 3, 4, 5];
Assert.equal(JSON.stringify(arrstrnum), '[1,2,3,4,5]');
arrstrnum = ["a", 2, "c"];
Assert.equal(JSON.stringify(arrstrnum), '["a",2,"c"]');
arrstrnum = "arrstrnum";
Assert.isString(arrstrnum);
arrstrnum = 0;
Assert.isNumber(arrstrnum);

Assert.equal(sf1.XXXX.x, 1024);
Assert.equal(sf1.XXXX.showXXXX(), "showXXXX");

let a1 = arr1(9);
checkGenerator(a1, 1);

let p1 = new PointXY(10, 10);
Assert.equal(JSON.stringify(p1.point), '[10,10]');