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
    If object has an apparent string index signature and index is of type Any, 
    the String or Number primitive type, or an enum type, the property access is of the type of that index signature.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

interface ExampleObject {
  [key: string]: string;
}
const myObject: ExampleObject = {
  foo: "bar",
  baz: "qux",
};
const myIndex: any = "foo";
const myValue = myObject[myIndex];
Assert.isString(myValue);