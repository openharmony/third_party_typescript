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
    All instance property members of a class must satisfy the constraints implied by the index members of the class .
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

class Ra {
  public h_x: number;
  constructor(h_x: number) {
    this.h_x = h_x;
  }
  public h_f() {
    this.h_x++;
  }
  public h_g(): any {
    return this.h_x;
  }
  static h_s: string = "aa";
}
let aa: Ra = new Ra(1);
Assert.equal(aa.h_x, 1);
aa.h_f();
Assert.equal(aa.h_x, 2);
class Rb extends Ra {
  public h_y: number;
  constructor(h_x: number, h_y: number) {
    super(h_x);
    this.h_y = h_y;
  }
  public h_g(): boolean { return false; }
}
let bb: Rb = new Rb(1, 2);
Assert.equal(bb.h_x, 1);
Assert.equal(bb.h_y, 2);
bb.h_f();
Assert.equal(bb.h_x, 2);
Assert.equal(bb.h_g(), false);
interface Rc {
  h_x: number;
  h_f: () => void;
  h_g: () => any;
}
let c: Rc = aa;
Assert.equal(c.h_g(), 2);
interface Rd {
  h_x: number;
  h_y: number;
  h_f: () => void;
  h_g: () => boolean;
}
let d: Rd = bb;
Assert.equal(d.h_g(), false);