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


class MyRectangle {
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height() {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get area() {
    return this._width * this._height;
  }

  logArea(){
    console.log(`The area is ${this.area}`);
  }

}

const rectangle = new MyRectangle(10, 5);
rectangle.logArea(); // The area is 50