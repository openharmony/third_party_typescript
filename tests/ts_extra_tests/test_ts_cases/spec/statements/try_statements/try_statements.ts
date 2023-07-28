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
 description: The variable introduced by a 'catch' clause of a 'try' statement is always of type Any. It is not possible to include a type annotation in a 'catch' clause.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../suite/assert.js'

try {
    new Array(100000000000000000000);
}
catch (err) {
    Assert.isTrue(err instanceof RangeError);
}

try {
    let a: any;
    let b = a.name;
}
catch (err) {
    Assert.isTrue(err instanceof TypeError);
}

try {
    decodeURI('%');
}
catch (err) {
    Assert.isTrue(err instanceof URIError);
};