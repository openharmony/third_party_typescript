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
   the type T associated with a destructuring parameter declaration is determined as follows
   if the declaration specifies a binding pattern, T is the implied type of that binding pattern
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

type cc = {
    name: string;
    age: number;
    isJob: boolean;
};
function showInfo({ age, name, isJob }: cc) {
    Assert.isNumber(age);
    Assert.isBoolean(isJob);
    Assert.isString(name);
}
showInfo({
    name: "caihua",
    age: 90,
    isJob: true,
});