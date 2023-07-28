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
    template literal string type has the same syntax as template literal strings in JavaScript, but is used in type positions.   
    When you use it with concrete literal types, it produces a new string literal type by concatenating the contents.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type Go = "go";
type Dong = `just ${Go}`;
function fun(w: Go | Dong) {
  if (w == "go") return 1;
  else if (w == "just go") return 2;
}
let saying1 = fun("go");
Assert.equal(saying1, 1);
let saying2 = fun("just go");
Assert.equal(saying2, 2);
type Size = "small" | "big";
type Num = "one" | "two";
type Food = `${Num | Size} food`;
function getfish(food: Food) {
  if (food == "one food") return 1;
  else if (food == "two food") return 2;
  else if (food == "small food") return "small";
  else if (food == "big food") return "big";
}
let x1 = getfish("one food");
Assert.equal(x1, 1);
let x2 = getfish("two food");
Assert.equal(x2, 2);
let x3 = getfish("small food");
Assert.equal(x3, "small");
let x4 = getfish("big food");
Assert.equal(x4, "big");
