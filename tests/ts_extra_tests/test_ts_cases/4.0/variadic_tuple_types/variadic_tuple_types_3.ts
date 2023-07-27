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
    TypeScript 4.0 improves the inference process for rest parameters and rest tuple elements so that we can type this and have it “just work”.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

type UnknownArray = readonly unknown[];

function lockType<T extends UnknownArray, U extends UnknownArray, R>(f: (...list: [...T, ...U]) => R, ...listA: T) {
  return (...listB: U) => f(...listA, ...listB);
}
function exp(num: number, str: string, bool: boolean): string {
  let obj = { num: num, str: str, bool: bool };
  return JSON.stringify(obj);
}
const f1 = lockType(exp);
let f1str = f1(1, "A", true);
Assert.equal(f1str, '{"num":1,"str":"A","bool":true}');

const f2 = lockType(exp, 100);
let f2str = f2("B", false);
Assert.equal(f2str, '{"num":100,"str":"B","bool":false}');

const f3 = lockType(exp, 1024, "XO");
let f3str = f3(true);
Assert.equal(f3str, '{"num":1024,"str":"XO","bool":true}');

const f4 = lockType(exp, 1408, "EXP", false);
let f4str = f4();
Assert.equal(f4str, '{"num":1408,"str":"EXP","bool":false}');