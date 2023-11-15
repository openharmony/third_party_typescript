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


class animalsInfo {
  type: string = "";
  age: number = 0;
  hasHair: boolean = false;
}

const zoo :animalsInfo[]= [
  { type: "lion", age: 5, hasHair: true },
  { type: "elephent", age: 10, hasHair: false },
  { type: "tiger", age: 3, hasHair: true }
];