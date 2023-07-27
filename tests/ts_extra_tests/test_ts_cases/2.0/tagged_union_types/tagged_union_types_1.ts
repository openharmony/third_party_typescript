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
description: The TS compiler now support type guards that narrow union types based on tests of a discriminant property and furthermore extend that capability to switch statements.
module: ESNext
isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

type Color = {
    name: "Color";
    rgb: [number, number, number];
}

type Point = {
    name: "Point";
    point: [number, number];
}



type ColorPoint = Color | Point
let un:ColorPoint[] = [{name:"Color", rgb:[0,0,0]},{name:"Point", point:[1,1]}];
let count:number = 0;
function test(s: ColorPoint[]) {
    for (const unElement of s) {
        switch (unElement.name) {
            case "Color":
                count++
                break
            case "Point":
                count++
                break
        }
    }
    return count;
}

function test1(s: ColorPoint) {
    if (s.name === "Color") {
        return s;
    }
    return s;
}

let point: Point = {
    name: "Point",
    point: [0, 0]
};


Assert.equal(JSON.stringify(test(un)), 2);
Assert.equal(test1(point).name, 'Point');
