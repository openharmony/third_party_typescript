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


/* 
description：The let keyword can be used to declare variables in a block-level scope, helping programmers avoid errors. Therefore, ArkTS does not support var, please declare variables with let.
type: Positive example
*/
let funcs: Function[] = [];

for (let i = 0; i < 5; i++) {
  funcs.push(() => i);
}

console.log(funcs[0]()); // output 0，Instead of 5
