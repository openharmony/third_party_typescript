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
 description: Blocks are extended to include, type alias
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

type Parent = {
    name: string;
};

type Child = Parent & {
    age: number
};


const child: Child = { name: "name", age: 10 };

Assert.equal("name", child.name)
Assert.equal(10, child.age);