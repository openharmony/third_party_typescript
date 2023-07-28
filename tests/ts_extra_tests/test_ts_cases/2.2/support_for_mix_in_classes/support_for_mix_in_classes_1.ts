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
     typeScript 2.2 adds support for the ECMAScript 2015 mixin class pattern as well as rules for combining mixin construct signatures with regular construct signatures in intersection types.
     a mixin constructor type refers to a type that has a single construct signature with a single rest argument of type any[] and an object-like return type.
     a mixin class is a class declaration or expression that extends an expression of a type parameter type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

class PointXY {
    public x: number;
    public y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
type MIXType<T> = new (...members: any[]) => T;
function mixC<T extends MIXType<{}>>(BC: T) {
    return class extends BC {
        constructor(...members: any[]) {
            super(...members);
        }
        public pname: string = "";
        setPname(pname: string) {
            this.pname = pname;
        }
        getPname() {
            return this.pname;
        }
    };
}
const PointMix = mixC(PointXY);
var a = new PointMix(4, 4);
var b = new PointMix();
a.setPname("A");
b.setPname("B");
Assert.equal(a.toString(), "(4, 4)");
Assert.equal(b.getPname(), "B");

class PointMixCopy extends mixC(PointXY) {
    public occupied: boolean = false;
    setOccupied(occupied: boolean) {
        this.occupied = occupied;
    }
    getOccupied() {
        return this.occupied;
    }
}
var c = new PointMixCopy(5, 5);
c.setPname("C");
c.setOccupied(true);
Assert.equal(c.toString(), "(5, 5)");
Assert.equal(c.getPname(), "C");
Assert.equal(c.getOccupied(), true);
