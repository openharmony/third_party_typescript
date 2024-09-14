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

@Sendable
class BaseSendableClass {}
class BaseNonSendableClass {}
interface BaseNonSendableInterface {}
interface ISendableExtend1 extends lang.ISendable {} // normal interface can extends ISendable
interface ISendableExtend2 extends lang.ISendable {
  p: string
}
interface INonSendable {}

/*
 * NonSendable class can implements only NonSendable interface
 */
class SendableClass0 implements BaseNonSendableInterface {}


/*
 * Sendable class can implements any interface
 */
@Sendable
class SendableClass1 implements lang.ISendable {}
@Sendable
class SendableClass2 implements ISendableExtend1 {}
@Sendable
class SendableClass3 implements ISendableExtend2 {
  public p = ''
}