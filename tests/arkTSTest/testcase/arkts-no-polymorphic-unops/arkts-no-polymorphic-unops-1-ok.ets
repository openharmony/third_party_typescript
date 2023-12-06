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


/* 
description：The unary operators +, -, and ~ are only available for numeric types used in classes for numeric types
type: Positive example
*/
class NumberManipulator {
  private num: number;

  constructor(num: number) {
    this.num = num;
  }

  applyUnaryPlus(): number {
    return +this.num;
  }

  applyUnaryMinus(): number {
    return -this.num;
  }

  applyBitwiseNot(): number {
    return ~this.num;
  }
}

const manipulator = new NumberManipulator(5);
console.log(manipulator.applyUnaryPlus()); // output：5
console.log(manipulator.applyUnaryMinus()); // output：-5
console.log(manipulator.applyBitwiseNot()); // output：-6