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


// Use in constructors function
class NumberWrapper {
  private value: number;

  constructor(num: number) {
    this.value = num;
  }

  applyUnaryPlus(): number {
    return +this.value;
  }

  applyUnaryMinus(): number {
    return -this.value;
  }

  applyBitwiseNot(): number {
    return ~this.value;
  }
}

const wrapper = new NumberWrapper(5);
console.log(wrapper.applyUnaryPlus()); // output：5
console.log(wrapper.applyUnaryMinus()); // output：-5
console.log(wrapper.applyBitwiseNot()); // output：-6