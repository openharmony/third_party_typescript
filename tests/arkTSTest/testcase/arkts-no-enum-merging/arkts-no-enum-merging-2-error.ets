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


// example: try to merge enum type
enum Fruit {
  Apple = 1,
  Orange = 2,
  Banana = 3,
}

enum Fruit {
  Cherry = 4,
  Grape = 5,
}

type Fruits = Fruit | Fruit;

const fruit: Fruits = Fruit.Banana;
console.log(fruit);