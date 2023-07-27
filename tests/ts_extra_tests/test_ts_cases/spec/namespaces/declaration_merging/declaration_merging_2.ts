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
    declaration merging also extends to namespace declarations with the same qualified name relative to a common root as a function, class, or enum declaration.
    when merging a non-ambient function or class declaration and a non-ambient namespace declaration, the function or class declaration must be located prior to the namespace declaration in the same source file. 
    this ensures that the shared object instance is created as a function object.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface Point {
    x: number;
    y: number;
}
function Point(x: number, y: number): Point {
    return { x: x, y: y };
}
namespace Point {
    export var origin = Point(0, 0);
    export function equals(p1: Point, p2: Point) {
        return p1.x == p2.x && p1.y == p2.y;
    }
}
var p1 = Point(0, 0);
var p2 = Point.origin;
var b = Point.equals(p1, p2);
Assert.equal(p1.x, 0);
Assert.equal(p1.y, 0);
Assert.equal(p2.x, 0);
Assert.equal(p2.y, 0);
Assert.equal(b, true);

enum Color {
    Red = 0xFF0000,
    Green = 0x00FF00,
    Blue = 0x0000FF,
}
namespace Color {
    export interface Color {
        Red: number;
        Green: number;
        Blue: number;
    }
}
Assert.equal(Color.Red, 0xFF0000);
var color: Color.Color = { Red: 255, Green: 255, Blue: 255 };
Assert.equal(color.Green, 255);

class PointXYZ {
    public x: number;
    public y: number;
    public z: number;
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    toString() {
        return "( " + this.x + " , " + this.y + " , " + this.z + " )";
    }
}
namespace PointXYZ {
    export var xyz = new PointXYZ(1, 1, 1);
    export interface PointXYZ {
        x: number;
        y: number;
        z: number;
    }
}
var xyz1 = new PointXYZ(1, 3, 5);
var xyz2: PointXYZ.PointXYZ = { x: 2, y: 3, z: 4 };
var xyz3 = PointXYZ.xyz;
Assert.equal(xyz1.toString(), "( 1 , 3 , 5 )");
Assert.equal(xyz2.x, 2);
Assert.equal(xyz3.toString(), "( 1 , 1 , 1 )");