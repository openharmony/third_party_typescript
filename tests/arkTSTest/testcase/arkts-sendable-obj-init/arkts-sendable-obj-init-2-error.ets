/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 

@Sendable
class BaseSendClass1 {}
class BaseNonSendableClass1 {}

interface A {
  p1: BaseSendClass1
  p2: BaseSendClass1
  p3: BaseSendClass1
  p4: BaseSendClass1
  p5: BaseSendClass1
  p6: BaseSendClass1
  p7: BaseSendClass1
  p8: BaseSendClass1 | BaseNonSendableClass1
  p9: BaseNonSendableClass1
}

interface INonSendable {};
let vArray = [1, 2];
let vObj1: INonSendable = {}

// Because vObj1 triggers rule arkts-no-structural-typing convert to arkts-no-untyped-obj-literals.
let v: A = {
  p1: new BaseSendClass1(),
  p2: 1,
  p3: '1',
  p4: vObj1,
  p5: vArray,
  p6: {},
  p7: [],
  p8: {},
  p9: {}
}