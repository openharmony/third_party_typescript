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
 description: TypeScript 2.7 improves type inference for multiple object literals occurring in the same context. When multiple object literal types contribute to a union type, we now normalize the object literal types such that all properties are present in each constituent of the union type.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

let obj1 = [{ a: 1, b: 2 }, { a: "abc" }, {}][0];
obj1.a = 5;
Assert.isNumber(obj1.a);
obj1.a = 'a';
Assert.isString(obj1.a);
obj1.a = undefined;
Assert.isUndefined(obj1.a);

obj1.b = 6;
Assert.isNumber(obj1.b);
obj1.b = undefined;
Assert.isUndefined(obj1.b);

function fun<T>(...args: T[]): T {
   return args[1];
};
let obj2 = fun({ a: 1, b: 2 }, { a: "abc", b: "ABC" }, {});

obj2.a = 5;
Assert.isNumber(obj2.a);
obj2.a = 'a';
Assert.isString(obj2.a);
obj2.a = undefined;
Assert.isUndefined(obj2.a);

obj2.b = 6;
Assert.isNumber(obj2.b);
obj2.b = 'b';
Assert.isString(obj2.b);
obj2.b = undefined;
Assert.isUndefined(obj2.b);
