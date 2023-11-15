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


// Use in type aliases
type NumberUnaryOperator = (num: number) => number;

const applyUnaryPlus: NumberUnaryOperator = (num) => +num;
const applyUnaryMinus: NumberUnaryOperator = (num) => -num;
const applyBitwiseNot: NumberUnaryOperator = (num) => ~num;

console.log(applyUnaryPlus(5)); // output：5
console.log(applyUnaryMinus(5)); // output：-5
console.log(applyBitwiseNot(5)); // output：-6


