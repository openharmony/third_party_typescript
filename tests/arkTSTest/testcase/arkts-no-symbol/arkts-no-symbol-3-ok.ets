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


// There are no iterations of the generators function in class
class Classroom implements Iterable<string> {
  private students: string[]
  constructor(students: string[]) {
    this.students = students
  }
  // Implement iterators
  [Symbol.iterator](): Iterator<string> {
    let index: number = 0
    return {
      next: (): IteratorResult<string> => {
        if (index < this.students.length) {
          return { done: false, value: this.students[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
    }
  }
}
const classroom = new Classroom([
  'student1',
  'student2',
  'student3',
  'student4',
  'student5',
])

for (const student of classroom) {
  console.log(student)
}
