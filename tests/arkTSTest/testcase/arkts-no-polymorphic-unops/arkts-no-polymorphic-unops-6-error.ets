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


//  Counterexample: Convert a string to a numeric type
const stringValue: string = "5";
const positiveString1: number = +stringValue;
const positiveString2: number = -stringValue;
const positiveString3: number = ~stringValue;
console.log(positiveString1, positiveString2, positiveString3); // 5 -5 -6