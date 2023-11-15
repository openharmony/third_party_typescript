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


// Description: Use different types of class expressions

class BaseClass {
  baseMethod() {
    console.log("Base method");
  }
}

interface MyInterface {
  interfaceMethod(): void;
}

class DerivedClass extends BaseClass implements MyInterface {
  interfaceMethod() {
    console.log("Interface method");
  }
}

const obj1 = new BaseClass(); 
const obj2 = new DerivedClass(); 