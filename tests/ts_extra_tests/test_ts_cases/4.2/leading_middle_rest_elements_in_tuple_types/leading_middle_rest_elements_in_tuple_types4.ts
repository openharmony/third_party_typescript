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
   These non-trailing rest elements can be used to model functions that take any number of leading arguments, 
   followed by a few fixed ones.
 module: ESNext
 isCurrent: true
---*/


import { Assert } from '../../../suite/assert.js'

function func1(...arg: [...arr: unknown[], num: number]) {
    return { ...arg };
}
let result1 = func1(10);
Assert.equal(JSON.stringify(result1), '{"0":10}');
let result2 = func1(5, 's', true, 10);
Assert.equal(JSON.stringify(result2), '{"0":5,"1":"s","2":true,"3":10}');

function func2(...arg: [str:string, ...arr: unknown[], num: number]) {
    return { ...arg };
}
let result3 = func2('a', 10);
Assert.equal(JSON.stringify(result3), '{"0":"a","1":10}');
let result4 = func2('s', true, 10);
Assert.equal(JSON.stringify(result4), '{"0":"s","1":true,"2":10}');