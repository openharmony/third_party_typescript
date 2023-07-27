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
      a union type U is assignable to a type T if each type in U is assignable to T.
      a type T is assignable to a union type U if T is assignable to any type in U.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

type numType = { num: number };
type strType = { str: string };
type boolType = { bool: boolean };
type objType = { obj: Object };
let x: any;
let y: numType | strType | boolType | objType | undefined;
let z: numType = { num: 0xCA };
x = z;
Assert.equal(JSON.stringify(x), '{"num":202}');
let a: strType = { str: "QWER" };
x = a;
Assert.equal(JSON.stringify(x), '{"str":"QWER"}');
let b: boolType = { bool: false };
x = b;
Assert.equal(JSON.stringify(x), '{"bool":false}');
let c: objType = { obj: { 0: "ZERO" } };
x = c;
Assert.equal(JSON.stringify(x), '{"obj":{"0":"ZERO"}}');
y = { num: 0xCA, str: "ABC", bool: false, obj: c };
x = y;
Assert.equal(JSON.stringify(x), '{"num":202,"str":"ABC","bool":false,"obj":{"obj":{"0":"ZERO"}}}');
y = z;
Assert.equal(JSON.stringify(y), '{"num":202}');
y = a;
Assert.equal(JSON.stringify(y), '{"str":"QWER"}');
y = b;
Assert.equal(JSON.stringify(y), '{"bool":false}');
y = c;
Assert.equal(JSON.stringify(y), '{"obj":{"0":"ZERO"}}');