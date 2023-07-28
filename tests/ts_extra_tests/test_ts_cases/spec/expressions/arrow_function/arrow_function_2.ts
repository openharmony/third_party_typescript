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
   1.( ... ) => expr  is exactly equivalent to ( ... ) => { return expr ; }
   2.id => { ... }           id => expr        are exactly equivalent to
   ( id ) => { ... }     ( id ) => expr
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

const myFunctionA = (num: string): string => {
  return num;
};
const resultA = myFunctionA("hello,world");
Assert.equal(resultA, "hello,world");
const myFunctionB: () => string = () => "hello,world";
const resultB = myFunctionB();
Assert.equal(resultB, "hello,world");
let getTempItem = (id: any) => ({ id: id, name: "Temp" });
const TempAResult = getTempItem(123);
Assert.equal(TempAResult.id, 123);
let getTempItemB = function (id: any) {
  return {
    id: id,
    name: "Temp",
  };
};
const TempBResult = getTempItemB(123);
Assert.equal(TempBResult.id, 123);