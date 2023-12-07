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
  Counterexample: Parameter decorator.
*/
function parameterDecorator(target: any, key: string, index: number) {
  console.log('Parameter decorator called')
  console.log('Target class: ', target)
  console.log('Method name: ', key)
  console.log('index: ', index)
}

class MyClass {
  myMethod(@parameterDecorator param: string) {
    console.log('Method called with parameters: ', param)
  }
}

const myObj = new MyClass()
myObj.myMethod('Hello, World!')
