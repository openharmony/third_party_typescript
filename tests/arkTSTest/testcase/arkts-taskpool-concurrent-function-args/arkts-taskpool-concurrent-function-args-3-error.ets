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

class MyClass {
    private name: string;
    constructor(name: string) {
        'use concurrent';
        this.name = name;
    }

    static funA() {
        'use concurrent';
    }

    funB() {
        'use concurrent';
    }
}


let taskGroup: taskpool.TaskGroup = new taskpool.TaskGroup();

let taskA1: taskpool.Task = new taskpool.Task('taskName', new MyClass().constructor, 'this is task'); // error

let taskA2: taskpool.Task = new taskpool.Task(new MyClass().constructor, 'this is task2'); // error

let taskA3: taskpool.LongTask = new taskpool.LongTask('taskName', new MyClass().constructor, 'this is longtask3'); // error

let taskA4: taskpool.LongTask = new taskpool.LongTask(new MyClass().constructor, 'this is longtask4'); // error  

let taskA5: taskpool.Task = new taskpool.GenericsTask(new MyClass().constructor); // error

let taskA6: taskpool.Task = new taskpool.GenericsTask('taskName', new MyClass().constructor); // error

taskGroup.addTask(new MyClass().constructor, 100); // error
taskGroup.addTask(taskA1); // ok
taskGroup.addTask(taskA3); // ok
taskGroup.addTask(taskA5); // ok

let taskB1: taskpool.Task = new taskpool.Task('taskName', new MyClass().funB, 'this is task'); // error

let taskB2: taskpool.Task = new taskpool.Task(new MyClass().funB, 'this is task2'); // error

let taskB3: taskpool.LongTask = new taskpool.LongTask('taskName', new MyClass().funB, 'this is longtask3'); // error

let taskB4: taskpool.LongTask = new taskpool.LongTask(new MyClass().funB, 'this is longtask4'); // error  

let taskB5: taskpool.Task = new taskpool.GenericsTask(new MyClass().funB); // error

let taskB6: taskpool.Task = new taskpool.GenericsTask('taskName', new MyClass().funB); // error

taskGroup.addTask(new MyClass().funB, 100); // error
taskGroup.addTask(taskB1); // ok
taskGroup.addTask(taskB3); // ok
taskGroup.addTask(taskB5); // ok

let taskC1: taskpool.Task = new taskpool.Task('taskName', MyClass.funA, 'this is task'); // error

let taskC2: taskpool.Task = new taskpool.Task(MyClass.funA, 'this is task2'); // error

let taskC3: taskpool.LongTask = new taskpool.LongTask('taskName', MyClass.funA, 'this is longtask3'); // error

let taskC4: taskpool.LongTask = new taskpool.LongTask(MyClass.funA, 'this is longtask4'); // error  

let taskC5: taskpool.Task = new taskpool.GenericsTask(MyClass.funA); // error

let taskC6: taskpool.Task = new taskpool.GenericsTask('taskName', MyClass.funA); // error

taskGroup.addTask(MyClass.funA, 100); // error
taskGroup.addTask(taskC1); // ok
taskGroup.addTask(taskC3); // ok
taskGroup.addTask(taskC5); // ok