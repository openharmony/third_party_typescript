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
class SendableClass1 {
  public '1': string = '';
  public '2': string = '';
  public 'abc': string = '';
}

let a1 = new SendableClass1();
a1.abc = '123'

class NonSendableClass1 {
  // public [1]: string,
  public ['2']: string = '';
  public ['abc']: string = '';
}

let a2 = new NonSendableClass1();
a2.abc = '123'


function f1(i: SendableClass1) {}
f1(new SendableClass1())