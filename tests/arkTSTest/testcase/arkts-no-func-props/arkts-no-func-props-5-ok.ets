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


class CalculateFactorial {
  static calculateFactorial(number: number): number {
    if (number === 0 || number === 1) {
      return 1;
    }
    return number * CalculateFactorial.calculateFactorial(number - 1);
  }
  static isEven = (number: number): boolean => {
    return number % 2 === 0;
  }
  static isOdd = (number: number): boolean => {
    return number % 2 !== 0;
  }
}

const factorial1 = CalculateFactorial.calculateFactorial(5);
console.log(`The factorial1 of 5 is ${factorial1}.`);

const isEven1 = CalculateFactorial.isEven(6);
console.log(`Is 6 even? ${isEven1}`);

const isOdd1 = CalculateFactorial.isOdd(7);
console.log(`Is 7 odd? ${isOdd1}`);