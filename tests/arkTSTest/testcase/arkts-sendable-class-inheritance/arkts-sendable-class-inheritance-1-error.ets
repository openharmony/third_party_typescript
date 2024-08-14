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

interface BaseNonSendableInterface {}
interface ISendableExtend1 extends lang.ISendable {} // normal interface can extends ISendable
interface ISendableExtend2 extends lang.ISendable {
  p: string
}

/*
 * NonSendable class cannot implements ISendable interface
 */
class NonSendableClass1 implements lang.ISendable {} // ERROR, arkts-sendable-class-inheritance

class NonSendableClass2 implements ISendableExtend1 {} // ERROR, arkts-sendable-class-inheritance

class NonSendableClass3 implements ISendableExtend2 { // ERROR, arkts-sendable-class-inheritance
  public p = ''
}