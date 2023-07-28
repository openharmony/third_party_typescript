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
  Index signatures allow us set more properties on a value than a type explicitly declares,
  And index signatures can now be declared as static.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

class SIS {
    hello = "hello";
    world = "1213";
    [propName: string]: string | number | undefined;
}

let sis = new SIS();
sis["Yes!Yes!Yes!"] = 42;
Assert.equal(sis["Yes!Yes!Yes!"], 42);

let x = sis["No!No!No!"];
x = undefined;
Assert.isUndefined(x);
x = 20;
Assert.equal(x, 20);
x = "x";
Assert.equal(x, "x");

class B {
    static hello = "hello";
    static world = 1342;
    static [propName: string]: string | number | undefined;
}

B["Yes!Yes!Yes!"] = 42;
Assert.equal(B["Yes!Yes!Yes!"], 42);

let y = B["No!No!No!"];
y = "y";
Assert.equal(y, "y");
y = 10;
Assert.equal(y, 10);
y = undefined;
Assert.isUndefined(y);
