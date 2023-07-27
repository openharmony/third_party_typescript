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
 description: TypeScript 2.9 allows passing generic type arguments to tagged template strings.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

let jianbing = "jianbing"
function kitchen(xx: TemplateStringsArray, value: string) {
  Assert.equal(2, xx.length);
}
kitchen`lunch_is${jianbing}!`;
function f<T>(yy: TemplateStringsArray, args: T): T {
  Assert.equal(2, yy.length);
  return args;
};
let a = f<string> `lunch_is${jianbing}!`;
Assert.equal("jianbing", a);
let b = f<string> `lunch_is${"dessert"}!`;
Assert.equal("dessert", b);
Assert.equal("dessert", b);
let c = f<number>`sss${2}`;
Assert.equal(2, c);