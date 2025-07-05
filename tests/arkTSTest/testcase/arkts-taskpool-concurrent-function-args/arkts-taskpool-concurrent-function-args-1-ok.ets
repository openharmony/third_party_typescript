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

@Concurrent
function funA() {

}

function funB() {
    'use concurrent';
}

let task: taskpool.Task = new taskpool.Task('taskName', funA, "this is task") // ok

let task2: taskpool.Task = new taskpool.Task(funA, "this is task2") // ok

let task3: taskpool.LongTask = new taskpool.LongTask('taskName', funA, "this is longtask3") // ok

let task4: taskpool.LongTask = new taskpool.LongTask(funA, "this is longtask4") // ok  

let task5: taskpool.Task = new taskpool.GenericsTask(funA) // ok

let task6: taskpool.Task = new taskpool.GenericsTask('taskfunA', funA) // ok

let task7: taskpool.Task = new taskpool.Task('taskName', funB, "this is task") // ok

function funD(taskFun: Function) {
    let task = new taskpool.Task(taskFun, "this is task2");  // ok 
}

funD(funB)