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


// The class contains iterations of the generators function
interface IterableIteratort<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIteratort<T>;
}

class MyIterable {
  arr: number[];

  constructor(arr: number[]) {
    this.arr = arr;
  }

  *[Symbol.iterator](): IterableIteratort<number> {
    for (let i = 0; i < this.arr.length; i++) {
      yield this.arr[i];
    }
  }
}

const iterable = new MyIterable([1, 2, 3]);

