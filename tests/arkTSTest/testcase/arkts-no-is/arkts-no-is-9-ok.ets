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


// Description: Use instanceof to check whether a variable is an interface type

interface MyInterface {
  name: string
}

let x: MyInterface = { name: 'MyInterface' } as MyInterface;
if (x instanceof MyInterface) {
  //obj is instance of MyInterface
} else {
  // ...
}