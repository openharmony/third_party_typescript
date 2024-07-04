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

enum E1 {
  str = '5'
}

enum E2 {
  num = 6
}

interface I {
  one: string,
  2: string, // ERROR
  '3': string, // OK
  [E1.str]: string, // OK
  [E2.num]: string // ERROR
}

let vOne1: I = {
  one: 'i1',
  2: 'i2', // ERROR
  '3': 'i3', // OK
  [E1.str]: 'e5', // OK
  [E2.num]: 'e6' // ERROR
}

let vOne2: I = {
  one: 'i1',
  2: 'i2', // ERROR
  '3': 'i3', // OK
  '5': 'e5', // OK
  6: 'e6' // ERROR
}


class C {
  public one?: string = 'c1';
  public 3?: string = 'c3'; // ERROR
  public '4': string = 'c4'; // OK
  public [E1.str]: string = 'e5'; // OK
  public [E2.num]: string = 'e6'; // ERROR
}

let vTwo1: C = {
  one: 'c1',
  3: 'c3', // ERROR
  '4': 'c4', // OK
  [E1.str]: 'e5', // OK
  [E2.num]: 'e6' // ERROR
}

let vTwo2: C = {
  one: 'c1',
  3: 'c3', // ERROR
  '4': 'c4', // OK
  '5': 'e5', // OK
  6: 'e6' // ERROR
}