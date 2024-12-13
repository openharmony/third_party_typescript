/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { foo, bar, TestClassJ, TestClassK } from './oh_modules/ohos_lib'
import { foo as foo_ets, bar as bar_ets, TestClassJ as TestClassJ_ets, TestClassK as TestClassK_ets } from './oh_modules/ohos_lib_ets'

function f(a: string): number {
  return 42;
}

foo_ets(f(null));
foo_ets(null);
foo_ets(() => {
  f(null);
});

new TestClassJ(f(null));
new TestClassJ(null);
new TestClassJ(() => {
  f(null);
});

new TestClassJ_ets(f(null));
new TestClassJ_ets(null);
new TestClassJ_ets(() => {
  f(null);
});

bar_ets(() => {
  f(null);
}, null, f(null));
bar_ets(() => {
  bar_ets(() => {
    f(null);
  }, null, f(null));
}, null, foo_ets(f(null)));

new TestClassK(() => {
  f(null);
}, null, f(null));
new TestClassK(() => {
  new TestClassK(() => {
    f(null);
  }, null, f(null));
}, null, foo(f(null)));

new TestClassK_ets(() => {
  f(null);
}, null, f(null));
new TestClassK_ets(() => {
  new TestClassK_ets(() => {
    f(null);
  }, null, f(null));
}, null, foo_ets(f(null)));