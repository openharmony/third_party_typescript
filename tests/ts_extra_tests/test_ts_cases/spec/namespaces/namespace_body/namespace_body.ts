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
    the body of a namespace corresponds to a function that is executed once to initialize the namespace instance.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

namespace Example {
    var namespace_name = "Example";
    export function exampleName(str: string): string {
        return str + " " + namespace_name;
    }
    class Point {
        x: number = 0;
        y: number = 0;
    }
    interface PointXYZ {
        x: number;
        y: number;
        z: number;
    }
    type StrNumBool = string | number | boolean;
    export enum Color {
        RED = 0xFF0000,
        GREEN = 0x00FF00,
        BLUE = 0x0000FF,
    }
    namespace SubNamespace { }
    declare var __TEST__: boolean;
    import EE = ExportExample;
    let a = new Point();
    Assert.equal(a.x, 0);
    Assert.equal(a.y, 0);
    let b: PointXYZ = {
        x: 1,
        y: 2,
        z: 3
    }
    Assert.equal(b.x, 1);
    Assert.equal(b.y, 2);
    Assert.equal(b.z, 3);
    let c: StrNumBool = "a";
    Assert.equal(c, "a");
    c = 1;
    Assert.equal(c, 1);
}
namespace ExportExample {
    export var namespace_name = "ExportExample";
    export function exampleEName(str: string): string {
        return str + " " + namespace_name;
    }
    export class Point {
        x: number = 0;
        y: number = 0;
    }
    export interface PointXYZ {
        x: number;
        y: number;
        z: number;
    }
    export type StrNumBool = string | number | boolean;
    export enum Color {
        RED = 0xFF0000,
        GREEN = 0x00FF00,
        BLUE = 0x0000FF,
    }
    export namespace SubNamespace { }
    export declare var __TEST__: boolean;
    export import E = Example;
}
Assert.equal(Example.exampleName("G"), "G Example");
Assert.equal(Example.Color.RED, 0xFF0000);
Assert.equal(ExportExample.namespace_name, "ExportExample");
Assert.equal(ExportExample.exampleEName("G"), "G ExportExample");
let myclass = new ExportExample.Point();
Assert.equal(myclass.x, 0);
Assert.equal(myclass.y, 0);
let ipoint: ExportExample.PointXYZ = {
    x: 1,
    y: 2,
    z: 3
}
Assert.equal(ipoint.x, 1);
Assert.equal(ipoint.y, 2);
Assert.equal(ipoint.z, 3);
let t: ExportExample.StrNumBool = "a";
Assert.equal(t, "a")
t = 1;
Assert.equal(t, 1)
t = true;
Assert.equal(t, true);
Assert.equal(ExportExample.Color.RED, 0xFF0000);