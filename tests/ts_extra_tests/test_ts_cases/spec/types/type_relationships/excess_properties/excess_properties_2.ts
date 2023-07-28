/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not c this file except in compliance with the License.
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
  In cases where excess properties are expected, an index signature can be added to the target type as an indicator of intent.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../../suite/assert.js'

interface I {
  a: string;
  b?: boolean;
  [str: string]: any;
}

let x: I = {
  a: "aaa",
  b: true,
  c: "ccc",
  d: "ddd"
};
Assert.equal(JSON.stringify(x), '{"a":"aaa","b":true,"c":"ccc","d":"ddd"}');