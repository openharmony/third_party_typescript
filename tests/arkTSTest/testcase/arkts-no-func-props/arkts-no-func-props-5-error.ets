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


function calculateFactorial(number: number): number {
  if (number === 0 || number === 1) {
    return 1;
  }
  return number * calculateFactorial(number - 1);
}

calculateFactorial.description = "This function calculates the factorial of a number.";

calculateFactorial.isEven = (number: number): boolean => {
  return number % 2 === 0;
}

calculateFactorial.isOdd = (number: number): boolean => {
  return number % 2 !== 0;
}

const factorial = calculateFactorial(5);
console.log(`The factorial of 5 is ${factorial}.`);

const isEven = calculateFactorial.isEven(6);
console.log(`Is 6 even? ${isEven}`);

const isOdd = calculateFactorial.isOdd(7);
console.log(`Is 7 odd? ${isOdd}`);

console.log(calculateFactorial.description);