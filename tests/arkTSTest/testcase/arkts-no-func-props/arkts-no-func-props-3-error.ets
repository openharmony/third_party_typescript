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


function calculateAverage(...numbers: number[]): number {
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
}

calculateAverage.rounded = (precision: number) => {
  return (num: number): number => {
    const factor = 10 ** precision;
    return Math.round(num * factor) / factor;
  };
}

const average = calculateAverage(2, 4, 6, 8, 10);
console.log(`The average is ${average}.`);

const roundedAverage = calculateAverage.rounded(2)(average);
console.log(`The rounded average is ${roundedAverage}.`);