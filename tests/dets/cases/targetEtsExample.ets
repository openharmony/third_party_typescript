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


@Entry
@Component
struct EntryComponent {
  build() {
    Text("hello")
  }
}

let storage = LocalStorage.GetShared()

@Entry(storage)
@Component
struct LocalStorageComponent {
  @LocalStorageLink('storageSimpleProp') simpleVarName: number = 0

  build() {
    Column() {
      Button(`LocalStorageLink: ${this.simpleVarName.toString()}`)
        .margin(20)
        .onClick(() => {
          this.simpleVarName += 1
        })
    }.width('100%')
  }
}

@Preview
@Component
struct index {
  build() {
    Text("heelo")
  }
}

@Component
struct index2 {
  build() {
    Text("heelo")
  }
}


@CustomDialog
@Component
struct DialogExample {
  controller: CustomDialogController
  action: () => void

  build() {
    Row() {
      Button('Close CustomDialog')
        .onClick(() => {
          this.controller.close()
          this.action()
        })
    }.padding(20)
  }
}

@Observed
class ClassA {
  public name: string
  public c: number

  constructor(c: number, name: string = 'OK') {
    this.name = name
    this.c = c
  }
}

@Component
struct PropertyAndMethod {
  @Consume("reviewVote") reviewVotes: number
  @Link buttonPlaying: boolean
  @LocalStorageLink("PropA") storageLink: number = 1;
  @LocalStorageProp('storageSimpleProp') simpleVarName: number = 0
  @ObjectLink a: string;
  @Prop property5: number
  @Provide("property") property6: number;
  @State count: number = 0
  @StorageLink('varA') varA: number = 2
  @StorageProp('languageCode') languageCode: string = 'en'
  @State @Watch('onBasketUpdated') shopBasket: Array<number> = [7, 12, 47, 3]
  @BuilderParam noParam: () => void

  @Builder CompC(value: string) {
    Text("hello").fontSize(value)
  };

  @Styles globalFancy() {
    .width(150)
    .height(100)
    .backgroundColor(Color.Pink)
  };

  build() {
  }
}

@Builder function specificParam02(label1: string, label2: string) {
  Column() {
    Text(label1)
      .fontSize(30)
    Text(label2)
      .fontSize(30)
  }
}
