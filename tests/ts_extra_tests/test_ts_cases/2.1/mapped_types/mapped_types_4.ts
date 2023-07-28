/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
/**---
 description: >
  Pick<Type, Keys>
  Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.
 module: ESNext
 isCurrent: true
 ---*/


import { Assert } from '../../../suite/assert.js'

interface TodoInter {
    title: string;
    description: string;
    completed: boolean;
}

type TodoTitle = Pick<TodoInter, "title">;
type TodoTitleOrCompleted = Pick<TodoInter, "title" | "completed">;
type TodoAll = Pick<TodoInter, "title" | "description" | "completed">;

const title: TodoTitle = {
    title: "Clean room",
};
Assert.equal("title" in title, true);
Assert.equal("description" in title, false);
Assert.equal("completed" in title, false);

const titleAndCompleted: TodoTitleOrCompleted = {
    title: "Clean room",
    completed: false,
};
Assert.equal("title" in titleAndCompleted, true);
Assert.equal("completed" in titleAndCompleted, true);
Assert.equal("description" in titleAndCompleted, false);

const testAll: TodoAll = {
    title: "Clean room",
    description: "clean the whole room",
    completed: false,
};
Assert.equal("title" in testAll, true);
Assert.equal("description" in testAll, true);
Assert.equal("completed" in testAll, true);
