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


import { Assert } from '../../../../suite/assert.js'

interface PointInterface {
    x: number;
    y: number;
    z: number;
    getPointArray(): number[];
}
class Point implements PointInterface {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    getPointArray() {
        return [this.x, this.y, this.z];
    }
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class ColorC extends Point {
    static Red: number = 0;
    static Green: number = 0;
    static Blue: number = 0;
    static getColorArray(): number[] {
        return [this.Red, this.Green, this.Blue]
    }
    toJSON() {
        return JSON.stringify(ColorC.getColorArray());
    }
    constructor(Red: number, Green: number, Blue: number, x: number = 0, y: number = 0, z: number = 0) {
        super(x, y, z);
        ColorC.Red = Red;
        ColorC.Green = Green;
        ColorC.Blue = Blue;
    }
}
let colorPoint = new ColorC(255, 0, 0, 1, 1, 1);
Assert.equal(JSON.stringify(colorPoint.getPointArray()), "[1,1,1]");
Assert.equal(colorPoint.toJSON(), "[255,0,0]");
