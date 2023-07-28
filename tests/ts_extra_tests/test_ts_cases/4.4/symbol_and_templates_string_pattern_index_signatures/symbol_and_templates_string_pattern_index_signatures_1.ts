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
   TypeScript lets us describe objects where every property has to have a certain type using index signatures.
   This allows us to use these objects as dictionary-like types, where we can use string keys to index into them with square brackets.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface I {
  [key: string]: any;
}
let t: I = {};
t["1"] = 1;
t["2"] = "1";
const keys = Object.keys(t);
keys.forEach((item) => {
  Assert.isString(item);
});
