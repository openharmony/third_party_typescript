/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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

export class A {
  constructor(
    public onAction?: () => void,
    public onH?: () => void
  ) {}
}

export function f(a: Partial<A>) {}
export function ff(a: A) {}
export function foo(func: () => void) {}
export function bar(func: () => void, a: number, b: string) {}

export class OhosLibC {}
export interface OhosLibI {}
export interface OhosLibIC extends OhosLibC {}
export interface OhosLibII extends OhosLibI {}
export class OhosLibCC extends OhosLibC {}
export class OhosLibCI implements OhosLibI {}

export interface OhosI {
  f: number;
}

export function ohFunction1({ d: OhosI }): void {} // incorrect usage, but it was an issue, so we check it too
export function ohFunction2(p: { d: OhosI }): void {}

export function fooOh(): any {}
export function barOh(a: any) {}

export interface OhosInterface {
  fld: A & {
    [key: string]: number;
  };
}

export type CallbackType = (name: string, param: unknown) => void;

export const callback = (name: string, param: Object): void => {};

export interface a {
  test:(topic: string) => void
}

export function doSomething(a: a, topic: string): void {

}

export class TestClassC {
  public ccc: null = null;
}

export class TestClassD {
  public ccc: string = '';
}


export declare function foo_lib(p1: number, p2: string): undefined;
export declare function foo_lib(p1: string, p2: number): undefined;

export class TestClassH {
  constructor(a: A) {
  }
}

export class TestClassI {
  constructor(a: a, topic: string) {
  }
}

export class TestClassJ {
  constructor(func: () => void) {
  }
}

export class TestClassK {
  constructor(func: () => void, a: number, b: string) {
  }
}

