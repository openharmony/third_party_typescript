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
struct ComponentA {
  @StorageLink('varA') varA: number = 2
  @StorageProp('languageCode') languageCode: string = 'en'
  private label: string = 'count'

  aboutToAppear() {
    this.label = (this.languageCode === 'zh') ? '数量' : 'Count'
  }

  build() {
    Column() {
      Row({ space: 20 }) {
        Button(`${this.label}: ${this.varA}`)
          .onClick(() => {
            AppStorage.Set<number>('varA', AppStorage.Get<number>('varA') + 1)
          })
        Button(`language: ${this.languageCode}`)
          .onClick(() => {
            if (AppStorage.Get<string>('languageCode') === 'zh') {
              AppStorage.Set<string>('languageCode', 'en')
            } else {
              AppStorage.Set<string>('languageCode', 'zh')
            }
            this.label = (this.languageCode === 'zh') ? '数量' : 'Count'
          })
      }
      .margin({ bottom: 50 })

      Row() {
        Button(`更改@StorageLink修饰的变量：${this.varA}`).height(40).fontSize(14)
          .onClick(() => {
            this.varA++
          })
      }.margin({ bottom: 50 })

      Row() {
        Button(`更改@StorageProp修饰的变量：${this.languageCode}`).height(40).fontSize(14)
          .onClick(() => {
            if (this.languageCode === 'zh') {
              this.languageCode = 'en'
            } else {
              this.languageCode = 'zh'
            }
          })
      }
    }
  }
}

class MainAbility {
  storage: LocalStorage
}

let storage03 = LocalStorage.GetShared()

@Entry(storage)
@Component
struct LocalStorageComponent02 {
  @LocalStorageLink('storageSimpleProp') simpleVarName: number = 0

  build() {
    Column() {
      Button(`LocalStorageLink: ${this.simpleVarName.toString()}`)
        .margin(20)
        .onClick(() => {
          this.simpleVarName += 1
        })
      Text(JSON.stringify(this.simpleVarName))
        .fontSize(50)
      LocalStorageComponentProp()
    }.width('100%')
  }
}

@Component
struct LocalStorageComponentProp {
  @LocalStorageProp('storageSimpleProp') simpleVarName: number = 0

  build() {
    Column() {
      Button(`LocalStorageProp: ${this.simpleVarName.toString()}`)
        .margin(20)
        .onClick(() => {
          this.simpleVarName += 1
        })
      Text(JSON.stringify(this.simpleVarName))
        .fontSize(50)
    }.width('100%')
  }
}

let storage02 = new LocalStorage({ "PropA": 47 })

@Entry(storage02)
@Component
struct ComA {
  @LocalStorageLink("PropA") storageLink: number = 1

  build() {
    Column() {
      Text(`Parent from LocalStorage ${this.storageLink}`)
        .fontSize(18)
        .margin(20)
        .onClick(() => this.storageLink += 1)
      Child06()
    }
  }
}

@Component
struct Child06 {
  @LocalStorageLink("PropA") storageLink: number = 1

  build() {
    Text(`Child06 from LocalStorage ${this.storageLink}`)
      .fontSize(18)
      .margin(20)
      .onClick(() => this.storageLink += 1)
  }
}

PersistentStorage.PersistProp('highScore', '0')

@Entry
@Component
struct PersistentComponent {
  @StorageLink('highScore') highScore: string = '0'
  @State currentScore: number = 0

  build() {
    Column() {
    }.width('100%')
  }
}