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
    Template string types are types that either construct new string-like types by concatenating,
    or match patterns of other string-like types.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from "../../../suite/assert.js"

type Figure = "three-colour" | "pure color";
type Num = "one" | "two";

type Cat1 = `${Num | Figure} cat`;
type Cat2 = "one cat" | "two cat" | "three-colour cat" | "pure color cat";
var cat1: Cat1 = "pure color cat";
var cat2: Cat2 = cat1;
cat1 = "one cat";
cat2 = cat1;
cat1 = "three-colour cat";
cat2 = cat1;
cat1 = "two cat";
cat2 = cat1;

let s1: `${number}-${number}-${number}`;
let s2: `1-2-3` = `1-2-3`;
s1 = s2;
Assert.equal(s1, "1-2-3");
