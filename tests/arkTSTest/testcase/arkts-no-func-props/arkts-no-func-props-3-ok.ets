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


class Calculate {
  static calculateAverage(...numbers: number[]): number {
    const sum = numbers.reduce((total, num) => total + num, 0);
    return sum / numbers.length;
  }
  static rounded(precision: number) {
    return (num: number): number => {
      const factor = 10 ** precision;
      return Math.round(num * factor) / factor;
    };
  }
}

const average1:number = Calculate.calculateAverage(2, 4, 6, 8, 10);
console.log(`The average1 is ${average1}.`);

const roundedAverage1:number = Calculate.rounded(2)(average1);
console.log(`The rounded average1 is ${roundedAverage1}.`);
