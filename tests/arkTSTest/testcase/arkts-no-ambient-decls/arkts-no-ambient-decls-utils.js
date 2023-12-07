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


function multiply(a, b) {
  return a * b;
}

const version = "@3.3.1";

class MyClass {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, ${this.name}!`);
  }
}

let MyNamespace;
(function (MyNamespace) {
  function sayHello(name) {
    console.log(`Hello, ${name}!`);
  }
  MyNamespace.sayHello = sayHello;
})(MyNamespace || (MyNamespace = {}));

("use strict");
var MyEnum;
(function (MyEnum) {
  MyEnum[(MyEnum["Option1"] = 1)] = "Option1";
  MyEnum[(MyEnum["Option2"] = 2)] = "Option2";
  MyEnum[(MyEnum["Option3"] = 3)] = "Option3";
})(MyEnum || (MyEnum = {}));

module.exports = {
  version,
  multiply: multiply,
  MyClass,
};
