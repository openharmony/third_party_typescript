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

import { ff, doSomething, TestClassC, TestClassD, TestClassH, TestClassI } from "./oh_modules/ohos_lib";
import { ff as ff_ets, doSomething as doSomething_ets, TestClassC as TestClassC_ets, TestClassD as TestClassD_ets, TestClassH as TestClassH_ets, TestClassI as TestClassI_ets } from "./oh_modules/ohos_lib_ets";

ff_ets(undefined);
new TestClassH(undefined);
new TestClassH_ets(undefined);

class TestClassE {
  private c:TestClassD_ets | undefined = new TestClassD_ets();
  add() {
    doSomething_ets({
      topic: (topic: string) => {
        let a = new TestClassC_ets();
        this.c = a;
        this.c = a;
      }
    }, '');
    new TestClassI({
      topic: (topic: string) => {
        let a = new TestClassC();
        this.c = a;
        this.c = a;
      }
    }, '');
    new TestClassI_ets({
      topic: (topic: string) => {
        let a = new TestClassC_ets();
        this.c = a;
        this.c = a;
      }
    }, '');
  }
}