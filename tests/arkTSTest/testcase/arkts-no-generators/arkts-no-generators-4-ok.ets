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

 
// Positive example: Using async or await mechanisms for parallel task processing.

async function randomRangeGenerator(min: number, max: number): Promise<number> {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function printRandomNumbers(): Promise<void> {
  for (let i = 0; i < 10; i++) {
    const randomNum: number = await randomRangeGenerator(10, 20)
    console.log(randomNum)
  }
}

printRandomNumbers()
