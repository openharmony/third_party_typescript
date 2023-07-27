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
 description: A destructuring variable declaration introduces zero or more named variables and initializes them with values extracted from properties of an object
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../../suite/assert.js'

var object_name = {
    key1: "value1",
    key2: "value2",
    key3: ["content1", "content2"],
    key4: true,
    key5: undefined
}

var { key1, key2: y, key3, key4: z = false, key5: k = true } = object_name;

Assert.equal("value1", key1);
Assert.equal("value2", y);
Assert.equal("content1", key3[0]);
Assert.equal("content2", key3[1]);
Assert.isTrue(z);
Assert.isTrue(k);


