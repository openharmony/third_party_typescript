/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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


@Styles 
export function globalFancy04() {
  .width(150)
  .height(100)
  .backgroundColor(Color.Pink)
}

@Styles 
export function globalFancy05() {
  .width(120)
  .height(120)
  .backgroundColor(Color.Green)
}

export function f1(n: number): number {
  function ff1 (x: string): number {
    return 0;
  }
  return n+1;
}

@Styles
export function notype(n: number) {
}

export namespace ns {
  @Styles
  export function funcTest2(n: number) {
  }
}