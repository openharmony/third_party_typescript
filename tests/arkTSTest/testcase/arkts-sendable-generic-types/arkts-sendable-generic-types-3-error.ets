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

namespace collections {
    @Sendable
    export class Array<T> {
        constructor(){};
    }

    @Sendable
    export class Map<K, V> {
        constructor(){};
    }
}

class NoneSendableClassA {
    var1: number = 1;
    var2: string = '1';
}

@Sendable
class SendableClassA {
    var1: number = 1;
    var2: string = '1';
}

let arr1: collections.Array<NoneSendableClassA> = new collections.Array<NoneSendableClassA>(); // error
let arr2: collections.Array<NoneSendableClassA> = new collections.Array(); // error
let arr3: collections.Array<NoneSendableClassA> = new collections.Array<SendableClassA>(); //error
let arr4: collections.Array<SendableClassA> = new collections.Array<SendableClassA>();
let arr5: collections.Array<SendableClassA> = new collections.Array();

let map1: collections.Map<string,NoneSendableClassA> = new collections.Map<string,NoneSendableClassA>(); // error
let map2: collections.Map<string,NoneSendableClassA> = new collections.Map(); // error
let map3: collections.Map<string,NoneSendableClassA> = new collections.Map<string,SendableClassA>(); // error
let map4: collections.Map<string,SendableClassA> = new collections.Map<string,SendableClassA>();
let map5: collections.Map<string,SendableClassA> = new collections.Map();
