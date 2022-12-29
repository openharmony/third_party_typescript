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


@Builder
function func() {
}

@Component
@Entry()
@Entry
struct MyTestable {
  @Consume("1")
  private property1: number;
  @Consume private property2;
  @Consume("1")
  protected property3;
  @Consume protected property4;
  @Consume("1")
  public property5: string;
  @Consume public property6: number;

  #a = 1;
  #b = 1;
}

struct index02 {
  @Styles
  method3() {
    .width(100)
    .height(200)
  }
}

@Entry
struct MainPage02 {
  @State
  message: string = 'hello world';
  @State
  data: any;
  @Extend
  Build() {
  }
}
