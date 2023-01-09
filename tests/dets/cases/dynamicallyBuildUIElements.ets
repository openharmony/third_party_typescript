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


@Component
struct CompB02 {
  @State CompValue: string = ''

  aboutToAppear() {
  }

  aboutToDisappear() {
  }

  build() {
    Column() {
      Button(this.CompValue)
        .margin(5)
    }
  }
}

@Entry
@Component
struct CompA04 {
  size1: number = 100
  @State CompValue1: string = "Hello,CompValue1"
  @State CompValue2: string = "Hello,CompValue2"
  @State CompValue3: string = "Hello,CompValue3"

  @Builder CompC(value: string) {
    CompB02({ CompValue: value })
  }

  @Builder SquareText(label: string) {
    Text(label)
      .fontSize(18)
      .width(1 * this.size1)
      .height(1 * this.size1)
  }

  @Builder RowOfSquareTexts(label1: string, label2: string) {
    Row() {
      this.SquareText(label1)
      this.SquareText(label2)
    }
    .width(2 * this.size1)
    .height(1 * this.size1)
  }

  build() {
    Column() {
      Row() {
        this.SquareText("A")
        this.SquareText("B")
      }
      .width(2 * this.size1)
      .height(1 * this.size1)

      this.RowOfSquareTexts("C", "D")
      Column() {
        this.CompC(this.CompValue1)
        this.CompC(this.CompValue2)
        this.CompC(this.CompValue3)
      }
      .width(2 * this.size1)
      .height(2 * this.size1)
    }
    .width(2 * this.size1)
    .height(2 * this.size1)
  }
}

@Component
struct CustomContainer {
  header: string = ''
  @BuilderParam noParam: () => void
  @BuilderParam withParam: any
  footer: string = ''

  build() {
    Column() {
      Text(this.header)
        .fontSize(30)
      this.noParam()
      this.withParam()
      Text(this.footer)
        .fontSize(30)
    }
  }
}

@Entry
@Component
struct CustomContainerUser {
  @Builder specificNoParam() {
    Column() {
      Text('noParam').fontSize(30)
    }
  }

  @Builder SpecificWithParam(label: string) {
    Column() {
      Text(label).fontSize(30)
    }
  }

  build() {
    Column() {
      CustomContainer({
        header: 'HeaderA',
        noParam: this.specificNoParam,
        withParam: this.SpecificWithParam('WithParamA'),
        footer: 'FooterA'
      })
      Divider()
        .strokeWidth(3)
        .margin(10)
      CustomContainer({
        header: 'HeaderB',
        noParam: this.specificNoParam,
        withParam: this.SpecificWithParam('WithParamB'),
        footer: 'FooterB'
      })
    }
  }
}

@Component
struct CustomContainer02 {
  header: string = ''
  @BuilderParam closer: () => void

  build() {
    Column() {
      Text(this.header)
        .fontSize(30)
      this.closer()
    }
  }
}

@Builder function specificParam(label1: string, label2: string) {
  Column() {
    Text(label1)
      .fontSize(30)
    Text(label2)
      .fontSize(30)
  }
}

@Entry
@Component
struct CustomContainerUser02 {
  @State text: string = 'header'

  build() {
    Column() {
      CustomContainer02({
        header: this.text,
      }) {
        Column() {
          specificParam('testA', 'testB')
        }.backgroundColor(Color.Yellow)
        .onClick(() => {
          this.text = 'changeHeader'
        })
      }
    }
  }
}

@Styles function globalFancy () {
  .width(150)
  .height(100)
  .backgroundColor(Color.Pink)
}

@Entry
@Component
struct FancyUse {
  @Styles componentFancy() {
    .width(100)
    .height(200)
    .backgroundColor(Color.Yellow)
  }

  build() {
    Column({ space: 10 }) {
      Text('FancyA')
        .globalFancy()
        .fontSize(30)
      Text('FancyB')
        .globalFancy()
        .fontSize(20)
      Text('FancyC')
        .componentFancy()
        .fontSize(30)
      Text('FancyD')
        .componentFancy()
        .fontSize(20)
    }
  }
}

@Styles function globalFancy02 () {
  .width(120)
  .height(120)
  .backgroundColor(Color.Green)
}

@Entry
@Component
struct FancyUse02 {
  @Styles componentFancy() {
    .width(80)
    .height(80)
    .backgroundColor(Color.Red)
  }

  build() {
    Row({ space: 10 }) {
      Button('Fancy')
        .stateStyles({
          normal: {
            .width(100)
            .height(100)
            .backgroundColor(Color.Blue)
          },
          disabled: this.componentFancy,
          pressed: globalFancy02
        })
    }
  }
}

// xxx.ets
@Extend(Text) function fancy (fontSize: number) {
  .fontColor(Color.Red)
  .fontSize(fontSize)
  .fontStyle(FontStyle.Italic)
  .fontWeight(600)
}

@Entry
@Component
struct FancyUse03 {
  build() {
    Row({ space: 10 }) {
      Text("Fancy")
        .fancy(16)
      Text("Fancy")
        .fancy(24)
      Text("Fancy")
        .fancy(32)
    }
  }
}

@CustomDialog
struct DialogExample02 {
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

@Entry
@Component
struct CustomDialogUser {
  dialogController: CustomDialogController = new CustomDialogController({
    builder: DialogExample02({ action: this.onAccept }),
    cancel: this.existApp,
    autoCancel: true
  });

  onAccept() {
  }

  existApp() {
  }

  build() {
    Column() {
      Button('Click to open Dialog')
        .onClick(() => {
          this.dialogController.open()
        })
    }
  }
}