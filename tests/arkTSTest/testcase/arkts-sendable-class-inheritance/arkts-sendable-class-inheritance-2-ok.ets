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
@Sendable
class BaseSendableClass2 implements lang.ISendable {}
interface ISendableExtend extends lang.ISendable {}
interface INonSendable {}

/*
 * Sendable class can extend only Sendable class
 */
@Sendable
class SendableClass1 extends BaseSendableClass {} // OK


/*
 * Sendable class can implements any interface(plus version)
 */
@Sendable
class SendableClass4 extends BaseSendableClass implements INonSendable {}
@Sendable
class SendableClass5 implements INonSendable {}
@Sendable
class SendableClass6 extends BaseSendableClass implements lang.ISendable {}