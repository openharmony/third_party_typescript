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
  A property or index signature can now be declared with the readonly modifier is considered read-only.
  Read-only properties may have initializers and may be assigned to in constructors within the same class declaration, but otherwise assignments to read-only properties are disallowed
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface Demo {
  readonly x: number;
  readonly y: string;
  readonly z: boolean;
}
let d2 = { x: 1, y: "aa", z: true };
let d3: Demo = d2;
Assert.equal(JSON.stringify(d3), '{"x":1,"y":"aa","z":true}');
d2.x = 5;
Assert.equal(d3.x, 5)

let x: Array<number> = [0, 1, 2];
let y: ReadonlyArray<number> = x;
Assert.equal(JSON.stringify(y), '[0,1,2]');

class Demo2 implements Demo {
  readonly x: number;
  readonly y: string;
  readonly z: boolean;
  constructor(z: boolean) {
    this.x = 1;
    this.y = "demo";
    this.z = z;
  }
}
let d4: Demo2 = new Demo2(true);
Assert.equal(d4.x, 1);
Assert.equal(d4.y, "demo");
Assert.equal(d4.z, true);

interface Demo3 {
  [key: string]: number;
  x: number;
}
let d5: Demo3 = {
  x: 1,
  y: 2
};
Assert.equal(d5['x'], 1);
Assert.equal(d5['y'], 2);