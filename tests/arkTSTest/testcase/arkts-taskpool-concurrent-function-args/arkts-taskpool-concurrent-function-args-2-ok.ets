/*
* Copyright (c) 2025 Huawei Device Co., Ltd.
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

import taskpool from '../common-lib/@ohos.taskpool';
import { dEtsFoo } from '../common-lib/concurrent-function-ets';
import { dTsFoo } from '../common-lib/concurrent-function-ts';

@Concurrent
function funB() {

}





taskpool.execute(funB, 100);

taskpool.execute(funB, 100).then((d: object) => {
  console.info(`task1 res is: ${d}`);
}).catch((e: object) => {
  console.error(`task1 catch e: ${e}`);
})

let taskGroup: taskpool.TaskGroup = new taskpool.TaskGroup();
taskGroup.addTask(funB, 100);

let taskB1: taskpool.Task = new taskpool.Task('taskName', funB, 'this is task');

taskpool.execute(taskB1);

taskpool.execute(dEtsFoo, 100);
taskpool.execute(dTsFoo, 100);