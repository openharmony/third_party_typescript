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
class SendableClass3 {
  public prop1: string[]; // should report, arkts-sendable-prop-types
  public prop2: NonSendableClass2; // should report, arkts-sendable-prop-types
  public prop3: NonSendableClass2 | null; // should report, arkts-sendable-prop-types
  public prop4: NonSendableClass2 | undefined; // should report, arkts-sendable-prop-types
  public prop5: NonSendableClass2 | null | undefined; // should report, arkts-sendable-prop-types
  public prop6: alias2; // should report, arkts-sendable-prop-types
  public prop7: alias3; // should report, arkts-sendable-prop-types

  constructor() {
    this.prop1 = ['']
    this.prop2 = new NonSendableClass2(); // should report, arkts-sendable-imported-variables
    this.prop3 = null;
    this.prop4 = undefined;
    this.prop5 = undefined;
    this.prop6 = new NonSendableClass2(); // should report, arkts-sendable-imported-variables
    this.prop7 = undefined;
  }
}


class B {}

@Sendable
class C {}

interface A extends lang.ISendable {
  c: B; // should report, arkts-sendable-prop-types
}