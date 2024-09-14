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
 

import { NonSendable, SomeDecorator, SomeDecorator2 } from './arkts-sendable-class-decorator-lib-dependencie'

@NonSendable // should report, arkts-sendable-class-decorator
@Sendable
class SendableClass {
  // should report, arkts-sendable-class-decorator
  @SomeDecorator
  public prop: string = '';

  constructor() {}
  // should report, arkts-sendable-class-decorator
  @SomeDecorator
  myMethod1() {}

  // should report, arkts-sendable-class-decorator
  myMethod2(@SomeDecorator2 param: string) {}
  // should report, arkts-sendable-class-decorator
  @SomeDecorator
  get myPropertyGet(): string {
    return this.prop;
  }
  // should report, arkts-sendable-class-decorator
  @SomeDecorator
  set myProperty2Set(value: string) {
    this.prop = value;
  }
}