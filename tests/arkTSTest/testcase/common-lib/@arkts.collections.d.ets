/*
 * Copyright (c) 2024-2026 Huawei Device Co., Ltd.
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
 
declare namespace collections {
  @Sendable
  class BitVector {
    [index: number]: number;
  }

  type ArrayOrBuiltinArray<T> = Array<T> | BuiltinArray<T>;

  @Sendable
  class Array<T> {
    readonly length: number;
    constructor();
    constructor(first: T, ...left: T[]);
    constructor(...items: T[]);
    containsAll(elements: ArrayOrBuiltinArray<T>): boolean;
  }

  class Map<K, V> {
    readonly size: number;
    constructor(entries?: readonly (readonly [K, V])[] | null);
    constructor(iterable: Iterable<readonly [K, V]>);
  }

  class Set<T> {
    readonly size: number;
    constructor(values?: readonly T[] | null);
    constructor(iterable: Iterable<T>);
  }

  class ArrayBuffer {
    readonly byteLength: number;
    constructor(byteLength: number);
  }

  class Int8Array {
    static readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBuffer;
    constructor();
    constructor(length: number);
    constructor(elements: Iterable<number>);
    constructor(array: ArrayLike<number> | ArrayBuffer);
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
  }
}

type BuiltinArray<T> = Array<T>;

export default collections;
