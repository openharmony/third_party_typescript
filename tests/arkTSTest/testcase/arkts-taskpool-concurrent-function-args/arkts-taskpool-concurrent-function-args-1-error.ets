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


function funB() {

}




let taskB1: taskpool.Task = new taskpool.Task('taskName', funB, 'this is task') // error

let taskB2: taskpool.Task = new taskpool.Task(funB, 'this is task2') // error

let taskB3: taskpool.LongTask = new taskpool.LongTask('taskName', funB, 'this is longtask3') // error

let taskB4: taskpool.LongTask = new taskpool.LongTask(funB, 'this is longtask4') // error  

let taskB5: taskpool.Task = new taskpool.GenericsTask(funB) // error

let taskB6: taskpool.Task = new taskpool.GenericsTask('taskName', funB) // errorss

let taskD1: taskpool.Task = new taskpool.Task('taskName', () => { }, 'this is task') // error

let taskD2: taskpool.Task = new taskpool.Task(() => { }, 'this is task2') // error

let taskD3: taskpool.LongTask = new taskpool.LongTask('taskName', () => { }, 'this is longtask3') // error

let taskD4: taskpool.LongTask = new taskpool.LongTask(() => { }, 'this is longtask4') // error  

let taskD5: taskpool.Task = new taskpool.GenericsTask(() => { }) // error

let taskD6: taskpool.Task = new taskpool.GenericsTask('123', () => { }) // error