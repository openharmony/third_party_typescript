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
    Just as with class declarations, class expressions would create a constructor function that can be used to construct instances. 
    Like class declarations, you may also declare property members and index members, as well as use the constructor parameters.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

var Square = class {
  acreage: number;

  constructor(public h_length: number, public h_width: number) {
    this.acreage = this.h_length * this.h_width;
  }
};
var square = new Square(5, 10);
Assert.equal(square.acreage, 50);
let Ref = class Reflmpl {
  public readonly _v = true;
  constructor(private _rawValue: number, public _shaw = false) {
    this._rawValue = _rawValue;
    this._shaw = this._shaw;
  }
  get value() {
    return this._rawValue;
  }
  set value(newVal) {
    this._rawValue = newVal;
  }
  get shaw() {
    return this._shaw;
  }
  set shaw(newShaw) {
    this._shaw = newShaw;
  }
}
let ref = new Ref(10, true);
Assert.equal(ref.value, 10);
Assert.equal(ref._shaw, true);