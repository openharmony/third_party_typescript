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
 description: A variable, parameter, binding property, or binding element declaration that specifies a binding pattern has an implied type which is determined
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../../../suite/assert.js'

var object_name = {
    key1: "value1"
}

function f({ aa = {}, b = "hello", c = 3, d = object_name }) {
    Assert.equal("object", typeof (aa));
    Assert.equal("string", typeof (b));
    Assert.equal("number", typeof (c));
    Assert.equal("object", typeof (d));
}

var objectFun = {
    a: [1, 2],
    b: "2",
    c: 3,
    d: object_name
};
f(objectFun);

var [a1, b1, c1, d1] = [1, "hello", true, object_name];

Assert.equal("number", typeof (a1));
Assert.equal("string", typeof (b1));
Assert.equal("boolean", typeof (c1));
Assert.equal("object", typeof (d1));

function testRest(...restElements: any[]): any {
    Assert.isTrue(restElements.length > 0);
    return restElements[0];
}

Assert.isString(testRest("str", "str2"));
Assert.isNumber(testRest(1, 2));