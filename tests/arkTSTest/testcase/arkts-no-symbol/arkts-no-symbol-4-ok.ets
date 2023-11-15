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


type CustomIterable<T> = {
  [Symbol.iterator](): Iterator<T>;
};

// Use the custom type CustomIterable
function printValues<T>(iterable: CustomIterable<T>): void {
  for (const item of iterable) {
    console.log(item);
  }
}

// An implementation of an array
const arrayIterable: CustomIterable<number> = {
  [Symbol.iterator](): Iterator<number> {
    const data = [1, 2, 3];
    let index = 0;

    return {
      next(): IteratorResult<number> {
        return {
          value: data[index++],
          done: index > data.length,
        };
      },
    };
  },
};

printValues(arrayIterable); // output: 1, 2, 3
