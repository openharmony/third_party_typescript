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
   In TypeScript 4.4, the new flag exactOptionalPropertyTypes specifies that optional property types
   should be interpreted exactly as written, meaning that | undefined is not added to the type
   This flag needs to be turned on explicitly. It also requires strictNullChecks to be enabled as well.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface I {
  x: string;
  y?: number;
}
const p: I = {
  x: "aaaa",
};
const keys = Object.keys(p);
Assert.equal(keys.indexOf("y"), -1);
Assert.equal(typeof p.y, "undefined");
Assert.notEqual(typeof p.y, "number");
p.y = 12;
Assert.equal(typeof p.y, "number");
Assert.notEqual(typeof p.y, "undefined");