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
    The meaning of a ThisType depends on the closest enclosing FunctionDeclaration, FunctionExpression, PropertyDefinition, ClassElement, 
    or TypeMember, known as the root declaration of the ThisType.
    When the root declaration is an instance member or constructor of a class, the ThisType references the this-type of that class.
    When the root declaration is a member of an interface type, the ThisType references the this-type of that interface. Otherwise, the ThisType is an error.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class myClass {
    x: number;
    y: number;
    xy() {
        return this.x * this.y;
    }
    m?: this;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
let mc = new myClass(2, 5);
let mc0 = new myClass(1, 2);
mc.m = mc0;
Assert.equal(mc.m.x, 1);
Assert.equal(mc.m.xy(), 2);

type PType<T> = { A: T, B: T };
interface Point {
    x: number;
    y: number;
    PAdd?(a: this, b: this): this;
    PObj?(a: this, b: this): PType<this>;
}
let p1: Point = { x: 1, y: 2 };
let p2: Point = { x: 2, y: 1 };
let pa: Point = {
    x: 0,
    y: 0,
    PAdd(a: Point, b: Point): Point {
        let p: Point = { x: a.x + b.x, y: a.y + b.y };
        return p;
    },
    PObj(a: Point, b: Point): PType<Point> {
        let p: PType<Point> = { A: a, B: b };
        return p;
    }
}
let p3: Point = pa.PAdd!(p1, p2);
let po: PType<Point> = pa.PObj!(p1, p2);
Assert.equal(JSON.stringify(p3), '{"x":3,"y":3}');
Assert.equal(JSON.stringify(po), '{"A":{"x":1,"y":2},"B":{"x":2,"y":1}}');