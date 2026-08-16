/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
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

import collections from '../common-lib/@arkts.collections';

function acceptArrayOrBuiltinArray(values: collections.Array<number> | number[]): void {}
function acceptSendableArray(values: collections.Array<number>): void {}

let numberValues = [1, 2];
acceptArrayOrBuiltinArray(numberValues);
acceptArrayOrBuiltinArray([1, 2]);
acceptSendableArray([1, 2]); // should report, arkts-sendable-obj-init

new collections.Int8Array([1, 2]);
new collections.Map<number, number>([[1, 2]]);
new collections.Set<number>([1, 2]);

const sendableArray = new collections.Array(1, 2, 3);
const sendableArray2 = new collections.Array(1, 2, 3);
sendableArray.containsAll(sendableArray2);
let normalArr = [14, 1];
sendableArray.containsAll(normalArr); // should not report
sendableArray.containsAll([14, 1]); // should not report

class NonSendableCls {}
interface INonSendable {}

@Sendable
class LocalSendCls {}

// Pure Sendable: object literal initializes a Sendable type -> report
let o1: LocalSendCls = {}; // should report, arkts-sendable-obj-init

// Pure non-Sendable: should not report
let o3: NonSendableCls = {}; // should not report

// Union (Sendable | non-Sendable): {} only matches the non-Sendable arm -> should not report (key false-positive, contrast array L23)
let o7: collections.Array<number> | INonSendable = {}; // should not report

// Union (two non-Sendable): should not report
let o8: NonSendableCls | INonSendable = {}; // should not report

// Union (two Sendable): {} only matches the empty Sendable class -> report
let o9: LocalSendCls | collections.Array<number> = {}; // should report, arkts-sendable-obj-init

// Function argument + ambiguous union: should not report
function acceptObj(x: LocalSendCls | NonSendableCls): void {}
acceptObj({}); // should not report

// Non-Sendable variable -> pure Sendable target: structural typing forbidden
// (contrast: non-Sendable var -> union matches the non-Sendable arm, no report)
let nonSendVar: NonSendableCls = {};
let sendTarget: LocalSendCls = nonSendVar; // should report, arkts-no-structural-typing
