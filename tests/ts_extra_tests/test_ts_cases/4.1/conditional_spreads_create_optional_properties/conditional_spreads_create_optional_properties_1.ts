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
    the returned type sometimes uses all-optional properties.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface I1 {
  x: string;
  y: number;
  z: string;
}
interface I2 {
  x: string;
  owner: I1;
}
function fun(other?: I2) {
  return {
    ...(other && other.owner),
    otherStuff: 123,
  };
}
let pet: I2 = {
  x: "qiqi",
  owner: {
    x: "owner",
    y: 11,
    z: "qingdao",
  },
};
let pet2 = fun(pet);
Assert.equal(pet2.y, 11);
Assert.equal(pet2.x, "owner");
Assert.equal(pet2.z, "qingdao");
Assert.equal(pet2.otherStuff, 123);