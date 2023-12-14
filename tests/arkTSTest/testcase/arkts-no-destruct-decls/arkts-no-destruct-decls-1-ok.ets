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


let numbers:number[] = [1, 2, 3, 4, 5];
let first = numbers[0];
let second = numbers[1];
let rest:number[] = [];
for (let i = 2; i < numbers.length; i++) {
  rest.push(numbers[i]);
}

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]
