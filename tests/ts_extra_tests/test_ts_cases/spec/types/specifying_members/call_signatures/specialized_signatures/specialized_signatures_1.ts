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
    Specialized signatures are used to express patterns where specific string values for some parameters 
    cause the types of other parameters or the function result to become further specialized.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../../suite/assert.js'

interface specialType {
  Tfun(x: "hello"): "hello";
  Tfun(x: "world"): "world";
  Tfun(x: string): string;
}
class getType implements specialType {
  Tfun(x: any): any {
    let xx: "hello" = "hello";
    let xx2: "world" = "world";
    if (x === xx) {
      return x;
    } else if (x === xx2) {
      return x;
    } else if (typeof x === "string") {
      return "isstring";
    }
  }
}
let x1 = new getType();
let xx1: "hello" = "hello";
let y1: "hello" = x1.Tfun(xx1);
Assert.equal(xx1, y1);
let x2 = new getType();
let xx2: "world" = "world";
let y2 = x2.Tfun(xx2);
Assert.equal(xx2, y2);
let x3 = new getType();
let y3 = x3.Tfun("helloworld");
Assert.equal(y3, "isstring");