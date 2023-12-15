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
  Positive example: Implementing code without using decorators.
*/
type MethodDecoratorType<T> = (
  target: T,
  key: string,
  descriptor: TypedPropertyDescriptor<() => void>
) => void

function methodDecorator<T>(
  target: T,
  key: string,
  descriptor: TypedPropertyDescriptor<() => void>
) {
  console.log('Method decorator called')
  console.log('Target class: ', target)
  console.log('Method name: ', key)
  console.log('Method Descriptor: ', descriptor)

  const originalMethod = descriptor.value

  descriptor.value = function () {
    console.log('Method Decorator Logic')
    originalMethod?.call(this)
  }
}

class MyClass {
  myMethod() {
    console.log('Method called')
  }
}

const myObj = new MyClass()
const methodDescriptor = Object.getOwnPropertyDescriptor(
  MyClass.prototype,
  'myMethod'
)

if (methodDescriptor && typeof methodDescriptor.value === 'function') {
  methodDecorator(MyClass.prototype, 'myMethod', methodDescriptor)
}

;(myObj.myMethod as () => void)()
