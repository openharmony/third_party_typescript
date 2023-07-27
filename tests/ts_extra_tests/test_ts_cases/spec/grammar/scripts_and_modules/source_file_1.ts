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


export let num: number = 1408;
export function show() { return "show"; };
export function* arr3(n: number): Generator<number, void, unknown> {
    let i = 0;
    let c = 0;
    if (n > 0) {
        while (true) {
            yield i += 3;
            if (c >= n) {
                break;
            } else {
                c++;
            }
        }
    }
}
export class Color {
    Red: number;
    Green: number;
    Blue: number;
    ColorData: [number, number, number] = [0, 0, 0];
    getColor(): [number, number, number] {
        this.ColorData = [this.Red, this.Green, this.Blue];
        return this.ColorData;
    }
    constructor(red: number, green: number, blue: number) {
        this.Red = red;
        this.Green = green;
        this.Blue = blue;
        this.getColor();
    }
}
export interface Point {
    x: number;
    y: number;
}
export type ArrStrNum = string[] | number[] | (string | number)[] | string | number;
export enum ABC {
    A, B, C, D, E,
}
export namespace XXXX {
    export let x: number = 1024;
    export function showXXXX() { return "showXXXX"; };
}
export declare let dnum: number;
