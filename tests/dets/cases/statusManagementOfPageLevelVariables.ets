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


class Model {
  value: string

  constructor(value: string) {
    this.value = value
  }
}

@Entry
@Component
struct EntryComponent05 {
  build() {
    Column() {
      MyComponent05({ count: 1, increaseBy: 2 })
      MyComponent05({ title: { value: 'Hello World 2' }, count: 7 })
    }
  }
}

@Component
struct MyComponent05 {
  @State title: Model = { value: 'Hello World' }
  @State count: number = 0
  private toggle: string = 'Hello World'
  private increaseBy: number = 1

  build() {
    Column() {
      Button('Click to change title')
        .margin(20)
        .onClick(() => {
          this.title.value = (this.toggle == this.title.value) ? 'Hello World' : 'Hello ArkUI'
        })
    }
  }
}


@Entry
@Component
struct ParentComponent {
  @State countDownStartValue: number = 10

  build() {
    Column() {
      Button('+1 - Nuggets in New Game')
        .margin(15)
        .onClick(() => {
          this.countDownStartValue += 1
        })

      Button('-1  - Nuggets in New Game')
        .margin(15)
        .onClick(() => {
          this.countDownStartValue -= 1
        })
      CountDownComponent({ count: this.countDownStartValue, costOfOneAttempt: 2 })
    }
  }
}

@Component
struct CountDownComponent {
  @Prop count: number
  private costOfOneAttempt: number

  build() {
    Column() {
      Button('count - costOfOneAttempt')
        .margin(15)
        .onClick(() => {
          this.count -= this.costOfOneAttempt
        })
    }
  }
}


@Entry
@Component
struct Player {
  @State isPlaying: boolean = false

  build() {
    Column() {
      Text(`Player is playing`).fontSize(18)
      Button('Parent:' + this.isPlaying)
        .margin(15)
        .onClick(() => {
          this.isPlaying = !this.isPlaying
        })
    }
  }
}

@Component
struct PlayButton {
  @Link buttonPlaying: boolean

  build() {
    Column() {
      Button(this.buttonPlaying ? 'pause' : 'play')
        .margin(20)
        .onClick(() => {
          this.buttonPlaying = !this.buttonPlaying
        })
    }
  }
}


@Entry
@Component
struct Parent {
  @State arr: number[] = [1, 2, 3]

  build() {
    Column() {
      Button('Parent Button: splice')
        .margin(10)
        .onClick(() => {
          this.arr.splice(0, 1, 60)
        })
      ForEach(this.arr, item => {
        Text(item.toString()).fontSize(18).margin(10)
      }, item => item.toString())
    }
  }
}


@Component
struct Child {
  @Link items: number[]

  build() {
    Column() {
      Button('Child Button1: push')
        .margin(15)
        .onClick(() => {
          this.items.push(100)
        })
      Button('Child Button2: replace whole item')
        .margin(15)
        .onClick(() => {
          this.items = [100, 200, 300]
        })
    }
  }
}


@Entry
@Component
struct ParentView {
  @State counter: number = 0

  build() {
    Column() {
      ChildA({ counterVal: this.counter })
    }
  }
}

@Component
struct ChildA {
  @Prop counterVal: number

  build() {
  }
}

@Component
struct ChildB {
  @Link counterRef: number

  build() {
  }
}


var nextID: number = 0

@Observed
class ClassA05 {
  public name: string
  public c: number
  public id: number

  constructor(c: number, name: string = 'OK') {
    this.name = name
    this.c = c
    this.id = nextID++
  }
}

@Component
struct ViewA {
  label: string = 'ViewA1'
  @ObjectLink a: ClassA05

  build() {
    Row() {
    }.margin({ top: 10 })
  }
}

@Entry
@Component
struct ViewB {
  @State arrA: ClassA05[] = [new ClassA05(0), new ClassA05(0)]

  build() {
    Column() {
      ForEach(this.arrA, (item) => {
      }, (item) => item.id.toString())
      ViewA({ label: `this.arrA[first]`, a: this.arrA[0] })
      ViewA({ label: `this.arrA[last]`, a: this.arrA[this.arrA.length - 1] })

      Button(`ViewB: reset array`)
        .margin({ top: 10 })
        .onClick(() => {
          this.arrA = [new ClassA05(0), new ClassA05(0)]
        })
      Button(`ViewB: push`)
        .margin({ top: 10 })
        .onClick(() => {
          this.arrA.push(new ClassA05(0))
        })
      Button(`ViewB: shift`)
        .margin({ top: 10 })
        .onClick(() => {
          this.arrA.shift()
        })
    }.width('100%')
  }
}


@Entry
@Component
struct CompA {
  @Provide("reviewVote") reviewVotes: number = 0;

  build() {
    Column() {
      CompB()
    }
  }
}

@Component
struct CompB {
  build() {
    Column() {
      CompC()
    }
  }
}

@Component
struct CompC {
  @Consume("reviewVote") reviewVotes: number

  build() {
    Column() {
    }.width('100%')
  }
}

@Entry
@Component
struct CompA02 {
  @State @Watch('onBasketUpdated') shopBasket: Array<number> = [7, 12, 47, 3]
  @State totalPurchase: number = 0
  @State addPurchase: number = 0

  aboutToAppear() {
    this.updateTotal()
  }

  updateTotal(): number {
    let sum = 0;
    this.shopBasket.forEach((i) => {
      sum += i
    })
    this.totalPurchase = (sum < 100) ? sum : 0.9 * sum
    return this.totalPurchase
  }

  onBasketUpdated(propName: string): void {
    this.updateTotal()
  }

  build() {
    Column() {
      Button('add to basket ' + this.addPurchase)
        .margin(15)
        .onClick(() => {
          this.addPurchase = Math.round(100 * Math.random())
          this.shopBasket.push(this.addPurchase)
        })
    }
  }
}