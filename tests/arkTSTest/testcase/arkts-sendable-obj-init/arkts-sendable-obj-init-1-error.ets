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

interface INonSendable {};
let vArray = [1, 2];
let vObj1: INonSendable = {}
let vObj2: lang.ISendable = {} // should report, arkts-sendable-obj-init
interface ISendableExtend1 extends lang.ISendable {}
let vObj3: ISendableExtend1 = {} // should report, arkts-sendable-obj-init

@Sendable
class BaseSendClass1 {}
@Sendable
class BaseSendClass2 implements lang.ISendable {}

/* // cmp `let a1:BaseSendClass1 = new BaseSendClass1();` */
/* // cmp `let a2:BaseSendClass1 = 1;` */
/* // cmp `let a3:BaseSendClass1 = '1';` */
let a4:BaseSendClass1 = {}; // should report, arkts-sendable-obj-init
let a5:BaseSendClass1 = [1, 2]; // should report, arkts-sendable-obj-init
/* // cmp `let a6:BaseSendClass1 = vArray;` */
let a7:BaseSendClass1 = vObj1; // should report, arkts-no-structural-typing
let a8:BaseSendClass2 = vObj1; // should report, arkts-no-structural-typing
/* // cmp `let a9:BaseSendClass1 = true;` */