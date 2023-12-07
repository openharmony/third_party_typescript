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


const numArr:number[] = [1, 2, 3, 4, 5];
let var2 = numArr[0];
let bar2 = numArr[1];
let rest2:number[] = [];
for (let index = 2; index < numArr.length; index++) {
  rest2.push(numArr[index]);
}
// [var2, bar2, ...rest2] = numbersArr;
console.log(var2); 
console.log(bar2); 
console.log(rest2); 