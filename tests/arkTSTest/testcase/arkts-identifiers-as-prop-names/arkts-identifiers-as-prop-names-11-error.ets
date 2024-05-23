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


enum E {
  str = 'e5'
}

interface I {
  one: string,
  2: string, // ERROR v1.1
  '3': string, // OK v1.1 rule relax case
  [E.str]: string; // OK v1.1 rule relax case
  
}

let v1: I = {
  one: 'i1',
  2: 'i2', // ERROR v1.1
  '3': 'i3', // OK v1.1
  [E.str]: 'e5' // OK v1.1
}
let v1_2: I = {
  one: 'i1',
  2: 'i2', // ERROR v1.1
  '3': 'i3', // OK v1.1
  'e5': 'e5' // OK v1.1
}


class C {
  public  one?: string = 'c1';
  public 3?: string = 'c3'; // ERROR v1.1
  public '4': string = 'c4'; // OK v1.1 rule relax case
  public [E.str]: string = 'e5'; // OK v1.1 rule relax case
}

let v2_1: C = {
  one: 'c1',
  3: 'c3', // ERROR v1.1
  '4': 'c4', // OK v1.1
  'e5': 'e5' // OK v1.1
}

let v2_2: C = {
  one: 'c1',
  3: 'c3', // ERROR v1.1
  '4': 'c4', // OK v1.1
  [E.str]: 'e5' // OK v1.1
}


export let other = 1;