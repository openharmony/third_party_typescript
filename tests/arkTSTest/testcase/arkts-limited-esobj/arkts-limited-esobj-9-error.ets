/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
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


const map: Map<number, ESObject> = new Map(); // OK
map.set(1, 1); // OK
map.set(1, {}); // OK
const newMap: Map<number, ESObject> = new Map<number, ESObject>(); // OK
const set: Set<ESObject> = new Set(); // OK
set.add(1); // OK
set.add({}); // OK
