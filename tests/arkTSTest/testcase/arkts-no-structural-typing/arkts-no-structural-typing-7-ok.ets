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
import {lang} from '@arkts.lang';

// 7. Interface implementations can be used
interface Z {
   n: number
   s: string
}
class X implements Z {
  n: number = 0
  s: string = ''
}
class Y implements Z {
  n: number = 0
  s: string = ''
}
function foo(c: Z): void {
  console.log(c.n, c.s)
}
foo(new X())
foo(new Y())

// Sendable can be thought of as implement ISendable
@Sendable
class SendableClass {
  public n: number = 0;
}
function foo(s: lang.ISendable) {
}
foo(new SendableClass())