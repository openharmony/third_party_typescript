/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const libPi = 3.14;
export let libString;

export function libFoo(): string;

export enum LibRGB {
  RED,
  GREEN,
  BLUE
}

export class LibClass {
  a: number;
  static b: string;
  foo(): void;
  static bar(): void;
}

export let libClassVar: LibClass;

declare let libVar: number;
export default libVar;