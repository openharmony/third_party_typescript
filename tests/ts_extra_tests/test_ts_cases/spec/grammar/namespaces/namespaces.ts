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

namespace ExampleG {
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
    };
    namespace SubNamespace { }
    declare var __TEST__: boolean;
    export import EE = ExportExampleG;
}
namespace ExportExampleG {
    export var namespace_name = "ExportExampleG";
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
    export import E = ExampleG;
}
Assert.equal(ExampleG.exampleName("G"), "G Example");
Assert.equal(ExampleG.Color.RED, 0xFF0000);
Assert.equal(ExportExampleG.exampleEName("G"), "G ExportExampleG");