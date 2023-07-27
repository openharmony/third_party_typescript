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
   When an arrow function with an expression body and no return type annotation is contextually typed 
   by a function type T and a contextual signature S can be extracted from T, 
   the expression body is contextually typed by the return type of S.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../../suite/assert.js'

let myFunction = (h_x: number, h_y: number) => { return h_x + h_y; }
function myFunc(myValue: (x: number, y: number) => number) {
  return myValue;
}
Assert.isFunction(myFunc(myFunction));
function getx(x: number): number {
  return x;
}
const a: number = 10;
let x = () => { return getx(a); }
let y = () => getx(a);
Assert.equal(x(), 10);
Assert.equal(y(), 10);