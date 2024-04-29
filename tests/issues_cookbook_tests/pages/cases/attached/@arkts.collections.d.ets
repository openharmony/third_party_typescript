/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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

/**
 * @file
 * @kit ArkTS
 */

/**
 * ArkTS collections.
 *
 * @namespace collections
 * @syscap SystemCapability.Utils.Lang
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace collections {
  type TypedArrayFromMapFn<FromElementType, ToElementType> = (value: FromElementType, index: number) => ToElementType;
  type TypedArrayPredicateFn<ElementType, ArrayType> =
  (value: ElementType, index: number, array: ArrayType) => boolean;
  type TypedArrayForEachCallback<ElementType, ArrayType> =
  (value: ElementType, index: number, array: ArrayType) => void;
  type TypedArrayReduceCallback<AccType, ElementType, ArrayType> =
  (previousValue: AccType, currentValue: ElementType, currentIndex: number, array: ArrayType) => AccType;
  type TypedArrayCompareFn<ElementType> = (first: ElementType, second: ElementType) => number;
  @Sendable
  class Array<T> {
    constructor();
    constructor(first: T, ...left: T[]);
    static create<T>(arrayLength: number, initialValue: T): Array<T>;
    static from<T>(arrayLike: ArrayLike<T>): Array<T>;
    readonly length: number;
    pop(): T | undefined;
    push(...items: T[]): number;
    join(separator?: string): string;
    shift(): T | undefined;
    unshift(...items: T[]): number;
    slice(start?: number, end?: number): Array<T>;
    sort(compareFn?: (a: T, b: T) => number): Array<T>;
    indexOf(searchElement: T, fromIndex?: number): number;
    forEach(callbackFn: (value: T, index: number, array: Array<T>) => void): void;
    map<U>(callbackFn: (value: T, index: number, array:  Array<T>) => U): Array<U>;
    filter(predicate: (value: T, index: number, array: Array<T>) => boolean): Array<T>;
    reduce(callbackFn: (previousValue: T, currentValue: T, currentIndex: number, array: Array<T>) => T): T;
    reduce<U>(callbackFn: (previousValue: U, currentValue: T, currentIndex: number, array: Array<T>) => U, initialValue: U): U;
    at(index: number): T | undefined;
    entries(): IterableIterator<[number, T]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<T>;
    find(predicate: (value: T, index: number, obj: Array<T>) => boolean): T | undefined;
    includes(searchElement: T, fromIndex?: number): boolean;
    findIndex(predicate: (value: T, index: number, obj: Array<T>) => boolean): number;
    fill(value: T, start?: number, end?: number): Array<T>;
    shrinkTo(arrayLength: number): void;
    extendTo(arrayLength: number, initialValue: T): void;
    [index: number]: T;
  }

  @Sendable
  class Map<K, V> {
    constructor(entries?: readonly (readonly [K, V])[] | null)
    entries(): IterableIterator<[K, V]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackFn: (value: V, key: K, map: Map<K, V>) => void): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): Map<K, V>;
    readonly size: number;
  }

  @Sendable
  class Set<T> {
    constructor(values?: readonly T[] | null);
    entries(): IterableIterator<[T, T]>;
    keys(): IterableIterator<T>;
    values(): IterableIterator<T>;
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackFn: (value: T, value2: T, set: Set<T>) => void): void;
    has(value: T): boolean;
    readonly size: number;
  }
  @Sendable
  class ArrayBuffer {
    readonly byteLength: number;
    constructor(byteLength: number);
    slice(begin: number, end?: number): ArrayBuffer;
  }

  @Sendable
  class Int8Array {
    static readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBuffer;
    readonly byteLength: number;
    readonly byteOffset: number;
    readonly length: number;
    constructor();
    constructor(length: number);
    constructor(array: ArrayLike<number> | ArrayBuffer);
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    static from(arrayLike: ArrayLike<number>): Int8Array;
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Int8Array;
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Int8Array;
    copyWithin(target: number, start: number, end?: number): Int8Array;
    every(predicate: TypedArrayPredicateFn<number, Int8Array>): boolean;
    fill(value: number, start?: number, end?: number): Int8Array;
    filter(predicate: TypedArrayPredicateFn<number, Int8Array>): Int8Array;
    find(predicate: TypedArrayPredicateFn<number, Int8Array>): number | undefined;
    findIndex(predicate: TypedArrayPredicateFn<number, Int8Array>): number;
    forEach(callbackFn: TypedArrayForEachCallback<number, Int8Array>): void;
    indexOf(searchElement: number, fromIndex?: number): number;
    join(separator?: string): string;
    map(callbackFn: TypedArrayForEachCallback<number, Int8Array>): Int8Array;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int8Array>): number;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int8Array>, initialValue: number): number;
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Int8Array>, initialValue: U): U;
    reverse(): Int8Array;
    set(array: ArrayLike<number>, offset?: number): void;
    slice(start?: number, end?: number): Int8Array;
    some(predicate: TypedArrayPredicateFn<number, Int8Array>): boolean;
    sort(compareFn?: TypedArrayCompareFn<number>): Int8Array;
    subarray(begin?: number, end?: number): Int8Array;
    at(index: number): number | undefined;
    entries(): IterableIterator<[number, number]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
    includes(searchElement: number, fromIndex?: number): boolean;
    [index: number]: number;
  }

  @Sendable
  class Uint8Array {
    static readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBuffer;
    readonly byteLength: number;
    readonly byteOffset: number;
    readonly length: number;
    constructor();
    constructor(length: number);
    constructor(array: ArrayLike<number> | ArrayBuffer);
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    static from(arrayLike: ArrayLike<number>): Uint8Array;
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Uint8Array;
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Uint8Array;
    copyWithin(target: number, start: number, end?: number): Uint8Array;
    every(predicate: TypedArrayPredicateFn<number, Uint8Array>): boolean;
    fill(value: number, start?: number, end?: number): Uint8Array;
    filter(predicate: TypedArrayPredicateFn<number, Uint8Array>): Uint8Array;
    find(predicate: TypedArrayPredicateFn<number, Uint8Array>): number | undefined;
    findIndex(predicate: TypedArrayPredicateFn<number, Uint8Array>): number;
    forEach(callbackFn: TypedArrayForEachCallback<number, Uint8Array>): void;
    indexOf(searchElement: number, fromIndex?: number): number;
    join(separator?: string): string;
    map(callbackFn: TypedArrayForEachCallback<number, Uint8Array>): Uint8Array;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint8Array>): number;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint8Array>, initialValue: number): number;
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Uint8Array>, initialValue: U): U;
    reverse(): Uint8Array;
    set(array: ArrayLike<number>, offset?: number): void;
    slice(start?: number, end?: number): Uint8Array;
    some(predicate: TypedArrayPredicateFn<number, Uint8Array>): boolean;
    sort(compareFn?: TypedArrayCompareFn<number>): Uint8Array;
    subarray(begin?: number, end?: number): Uint8Array;
    at(index: number): number | undefined;
    entries(): IterableIterator<[number, number]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
    includes(searchElement: number, fromIndex?: number): boolean;
    [index: number]: number;
  }

  @Sendable
  class Int16Array {
    static readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBuffer;
    readonly byteLength: number;
    readonly byteOffset: number;
    readonly length: number;
    constructor();
    constructor(length: number);
    constructor(array: ArrayLike<number> | ArrayBuffer);
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    static from(arrayLike: ArrayLike<number>): Int16Array;
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Int16Array;
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Int16Array;
    copyWithin(target: number, start: number, end?: number): Int16Array;
    every(predicate: TypedArrayPredicateFn<number, Int16Array>): boolean;
    fill(value: number, start?: number, end?: number): Int16Array;
    filter(predicate: TypedArrayPredicateFn<number, Int16Array>): Int16Array;
    find(predicate: TypedArrayPredicateFn<number, Int16Array>): number | undefined;
    findIndex(predicate: TypedArrayPredicateFn<number, Int16Array>): number;
    forEach(callbackFn: TypedArrayForEachCallback<number, Int16Array>): void;
    indexOf(searchElement: number, fromIndex?: number): number;
    join(separator?: string): string;
    map(callbackFn: TypedArrayForEachCallback<number, Int16Array>): Int16Array;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int16Array>): number;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int16Array>, initialValue: number): number;
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Int16Array>, initialValue: U): U;
    reverse(): Int16Array;
    set(array: ArrayLike<number>, offset?: number): void;
    slice(start?: number, end?: number): Int16Array;
    some(predicate: TypedArrayPredicateFn<number, Int16Array>): boolean;
    sort(compareFn?: TypedArrayCompareFn<number>): Int16Array;
    subarray(begin?: number, end?: number): Int16Array;
    at(index: number): number | undefined;
    entries(): IterableIterator<[number, number]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
    includes(searchElement: number, fromIndex?: number): boolean;
    [index: number]: number;
  }

  @Sendable
  class Uint16Array {
    static readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBuffer;
    readonly byteLength: number;
    readonly byteOffset: number;
    readonly length: number;
    constructor();
    constructor(length: number);
    constructor(array: ArrayLike<number> | ArrayBuffer);
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    static from(arrayLike: ArrayLike<number>): Uint16Array;
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Uint16Array;
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Uint16Array;
    copyWithin(target: number, start: number, end?: number): Uint16Array;
    every(predicate: TypedArrayPredicateFn<number, Uint16Array>): boolean;
    fill(value: number, start?: number, end?: number): Uint16Array;
    filter(predicate: TypedArrayPredicateFn<number, Uint16Array>): Uint16Array;
    find(predicate: TypedArrayPredicateFn<number, Uint16Array>): number | undefined;
    findIndex(predicate: TypedArrayPredicateFn<number, Uint16Array>): number;
    forEach(callbackFn: TypedArrayForEachCallback<number, Uint16Array>): void;
    indexOf(searchElement: number, fromIndex?: number): number;
    join(separator?: string): string;
    map(callbackFn: TypedArrayForEachCallback<number, Uint16Array>): Uint16Array;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint16Array>): number;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint16Array>, initialValue: number): number;
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Uint16Array>, initialValue: U): U;
    reverse(): Uint16Array;
    set(array: ArrayLike<number>, offset?: number): void;
    slice(start?: number, end?: number): Uint16Array;
    some(predicate: TypedArrayPredicateFn<number, Uint16Array>): boolean;
    sort(compareFn?: TypedArrayCompareFn<number>): Uint16Array;
    subarray(begin?: number, end?: number): Uint16Array;
    at(index: number): number | undefined;
    entries(): IterableIterator<[number, number]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
    includes(searchElement: number, fromIndex?: number): boolean;
    [index: number]: number;
  }

  @Sendable
  class Int32Array {
    static readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBuffer;
    readonly byteLength: number;
    readonly byteOffset: number;
    readonly length: number;
    constructor();
    constructor(length: number);
    constructor(array: ArrayLike<number> | ArrayBuffer);
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    static from(arrayLike: ArrayLike<number>): Int32Array;
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Int32Array;
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Int32Array;
    copyWithin(target: number, start: number, end?: number): Int32Array;
    every(predicate: TypedArrayPredicateFn<number, Int32Array>): boolean;
    fill(value: number, start?: number, end?: number): Int32Array;
    filter(predicate: TypedArrayPredicateFn<number, Int32Array>): Int32Array;
    find(predicate: TypedArrayPredicateFn<number, Int32Array>): number | undefined;
    findIndex(predicate: TypedArrayPredicateFn<number, Int32Array>): number;
    forEach(callbackFn: TypedArrayForEachCallback<number, Int32Array>): void;
    indexOf(searchElement: number, fromIndex?: number): number;
    join(separator?: string): string;
    map(callbackFn: TypedArrayForEachCallback<number, Int32Array>): Int32Array;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int32Array>): number;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Int32Array>, initialValue: number): number;
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Int32Array>, initialValue: U): U;
    reverse(): Int32Array;
    set(array: ArrayLike<number>, offset?: number): void;
    slice(start?: number, end?: number): Int32Array;
    some(predicate: TypedArrayPredicateFn<number, Int32Array>): boolean;
    sort(compareFn?: TypedArrayCompareFn<number>): Int32Array;
    subarray(begin?: number, end?: number): Int32Array;
    at(index: number): number | undefined;
    entries(): IterableIterator<[number, number]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
    includes(searchElement: number, fromIndex?: number): boolean;
    [index: number]: number;
  }

  @Sendable
  class Uint32Array {
    static readonly BYTES_PER_ELEMENT: number;
    readonly buffer: ArrayBuffer;
    readonly byteLength: number;
    readonly byteOffset: number;
    readonly length: number;
    constructor();
    constructor(length: number);
    constructor(array: ArrayLike<number> | ArrayBuffer);
    constructor(buffer: ArrayBuffer, byteOffset?: number, length?: number);
    static from(arrayLike: ArrayLike<number>): Uint32Array;
    static from<T>(arrayLike: ArrayLike<T>, mapFn: TypedArrayFromMapFn<T, number>): Uint32Array;
    static from(arrayLike: Iterable<number>, mapFn?: TypedArrayFromMapFn<number, number>): Uint32Array;
    copyWithin(target: number, start: number, end?: number): Uint32Array;
    every(predicate: TypedArrayPredicateFn<number, Uint32Array>): boolean;
    fill(value: number, start?: number, end?: number): Uint32Array;
    filter(predicate: TypedArrayPredicateFn<number, Uint32Array>): Uint32Array;
    find(predicate: TypedArrayPredicateFn<number, Uint32Array>): number | undefined;
    findIndex(predicate: TypedArrayPredicateFn<number, Uint32Array>): number;
    forEach(callbackFn: TypedArrayForEachCallback<number, Uint32Array>): void;
    indexOf(searchElement: number, fromIndex?: number): number;
    join(separator?: string): string;
    map(callbackFn: TypedArrayForEachCallback<number, Uint32Array>): Uint32Array;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint32Array>): number;
    reduce(callbackFn: TypedArrayReduceCallback<number, number, Uint32Array>, initialValue: number): number;
    reduce<U>(callbackFn: TypedArrayReduceCallback<U, number, Uint32Array>, initialValue: U): U;
    reverse(): Uint32Array;
    set(array: ArrayLike<number>, offset?: number): void;
    slice(start?: number, end?: number): Uint32Array;
    some(predicate: TypedArrayPredicateFn<number, Uint32Array>): boolean;
    sort(compareFn?: TypedArrayCompareFn<number>): Uint32Array;
    subarray(begin?: number, end?: number): Uint32Array;
    at(index: number): number | undefined;
    entries(): IterableIterator<[number, number]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
    includes(searchElement: number, fromIndex?: number): boolean;
    [index: number]: number;
  }
}

export default collections;