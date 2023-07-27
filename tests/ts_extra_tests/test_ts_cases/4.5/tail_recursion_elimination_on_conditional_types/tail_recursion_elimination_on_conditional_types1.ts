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
   As long as one branch of a conditional type is simply another conditional type, TypeScript can avoid intermediate instantiations.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from "../../../suite/assert.js"

type project<T extends string> = T extends ` ${infer push}` ? project<push> : T;

type example = project<"                                                tool">;
var t: example = "tool";
Assert.equal(t, "tool");
