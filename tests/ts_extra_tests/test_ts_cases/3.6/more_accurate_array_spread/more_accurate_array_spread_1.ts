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
 description: More Accurate Array Spread.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

const t1 = { name: "John", age: 30 };
const t2 = ["javascript", "typescript", "react"];
const t3 = { ...t1, skills: t2 };
Assert.equal("name" in t3, true);
Assert.equal("age" in t3, true);
Assert.equal("skills" in t3, true);
Assert.equal("isJob" in t3, false);

let arr = [...Array(3)];
Assert.equal(arr[0], undefined);
