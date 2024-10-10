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

import { foo_lib } from './oh_modules/ohos_lib';

export declare class ClassA {
  foo(p1: number, p2: string): void;
  foo(p1: number, p2: number): void;
}

export declare function foo_local(p11: number, p22: string): undefined;
export declare function foo_local(p11: string, p21: number): undefined;

foo_lib(1, undefined);
foo_lib(undefined, 1);
new ClassA().foo(1, foo_lib(1, undefined)); // there is excessive relaxation
new ClassA().foo(1, undefined);
new ClassA().foo(1, foo_local(1, undefined));