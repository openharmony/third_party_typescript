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
struct MyComponent {
  @State arr: number[] = [10, 20, 30]

  build() {
    Column({ space: 5 }) {
      Button('Reverse Array')
        .onClick(() => {
          this.arr.reverse()
        })

      ForEach(this.arr, (item: number) => {
        Text(`item value: ${item}`).fontSize(18)
        Divider().strokeWidth(2)
      }, (item: number) => item.toString())
    }
  }
}


interface DataChangeListener {
  onDataReloaded(): void;
  onDataAdd(index: number): void;
  onDataMove(from: number, to: number): void;
  onDataDelete(index: number): void;
  onDataChange(index: number): void;
}


class BasicDataSource02 implements IDataSource {
  private listeners: DataChangeListener[] = []
  public getData(index: number): any {
    return undefined;
  }
  public totalCount(): number {
    return 0;
  }

  registerDataChangeListener(listener: DataChangeListener): void {
    if (this.listeners.indexOf(listener) < 0) {
      this.listeners.push(listener)
    }
  }

  unregisterDataChangeListener(listener: DataChangeListener): void {
    const pos = this.listeners.indexOf(listener);
    if (pos >= 0) {
      this.listeners.splice(pos, 1)
    }
  }

  informDataReload(): void {
    this.listeners.forEach(listener => {
      listener.onDataReloaded()
    })
  }

  informDataAdd(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataAdd(index)
    })
  }

  informDataChange(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataChange(index)
    })
  }

  informDataDelete(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataDelete(index)
    })
  }

  informDataMove02(from: number, to: number): void {
    this.listeners.forEach(listener => {
      listener.onDataMove(from, to)
    })
  }
}

class MyDataSource02 extends BasicDataSource02 {
  private dataArray: string[] = ['/path/image0.png', '/path/image1.png', '/path/image2.png', '/path/image3.png']

  public totalCount02(): number {
    return this.dataArray.length
  }

  public getData(index: number): any {
    return this.dataArray[index]
  }

  public addData(index: number, data: string): void {
    this.dataArray.splice(index, 0, data)
    this.informDataAdd(index)
  }

  public pushData(data: string): void {
    this.dataArray.push(data)
    this.informDataAdd(this.dataArray.length - 1)
  }
}

@Entry
@Component
struct MyComponent02 {
  private data: MyDataSource02 = new MyDataSource02()

  build() {
    List({ space: 3 }) {
      LazyForEach(this.data, (item: string) => {
        ListItem() {
          Row() {
            Image(item).width(50).height(50)
          }.margin({ left: 10, right: 10 })
        }
        .onClick(() => {
          this.data.pushData('/path/image' + this.data.totalCount02() + '.png')
        })
      }, item => item)
    }
  }
}