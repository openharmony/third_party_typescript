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


export let exp: any = 0;
export const econ: 0x1000 = 0x1000;
export function getGArr(g: Generator<any, any, any>): number[] {
  let arr: number[] = [];
  while (true) {
    let next = g.next();
    if (next.done == true) {
      break;
    }
    arr.push(next.value);
  }
  return arr;
}
export function* arrList(start: number, count: number) {
  let i = 1;
  yield start;
  while (true) {
    if (i >= count) { break; }
    yield start += 1;
    i++;
  }
}
export default class newColor {
  cname: string;
  color: [number, number, number];
  constructor(cname: string, color: [number, number, number]) {
    this.cname = cname;
    this.color = color;
  }
}
export interface Point { x: number; y: number, pname?: string }
export type NumStrKey = keyof number & keyof string;
export enum Color {
  Red = 0xFF0000,
  Green = 0x00FF00,
  Blue = 0x0000FF,
}
export namespace N {
  export let x: number = 1024;
  export interface Color {
    cname: string;
    color: [number, number, number];
  }
  export type ColorKey = keyof Color;
};
