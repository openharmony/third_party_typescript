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
 

import { lang } from '../common-lib/@arkts.lang';

class NonSendableClass2 {}
@Sendable
class SendableClass10 {}
type alias0 = number | null;
type alias1 = SendableClass10;
type alias2 = NonSendableClass2;
type alias3 = NonSendableClass2 | undefined;

@Sendable
class SendableClass4<T, U> {
  public prop1: number; // OK
  public prop2: string; // OK
  public prop3: boolean; // OK
  public prop4: bigint; // OK
  public prop5: SendableClass10; // OK
  public prop6: null; // OK
  public prop7: undefined; // OK
  public prop8: U; // OK
  public prop9: T | number | undefined; // OK
  public prop10: alias0; // OK
  public prop11: alias1; // OK

  constructor(u: U, t: T) {
    this.prop1 = 1;
    this.prop2 = '';
    this.prop3 = true;
    this.prop4 = BigInt(11111);
    this.prop5 = new SendableClass10();
    this.prop6 = null;
    this.prop7 = undefined;
    this.prop8 = u;
    this.prop9 = undefined;
    this.prop10 = null;
    this.prop11 = new SendableClass10();
  }
}


class B {}
@Sendable
class C {}

interface A extends lang.ISendable {
  a: number; // OK
  b: C; // OK
}