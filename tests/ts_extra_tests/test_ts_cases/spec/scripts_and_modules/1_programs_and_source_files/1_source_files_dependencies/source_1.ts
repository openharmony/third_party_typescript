/// <reference path="source_00.ts"/>
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
    if a source file with the resulting path and file extension '.d. ts' exists, that file is added as a dependency.
 module: ESNext
 isCurrent: true
 ---*/


import * as source from 'source';
import { Assert } from "../../../../../suite/assert.js";

let fun = source.getstr;
fun = (s: string) => {
  return s;
}
let str: string = fun("a");
Assert.equal(str, "a")