/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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


declare const Component: ClassDecorator;
declare const Entry: ClassDecorator;
declare const Observed: ClassDecorator;
declare const Preview: ClassDecorator;
declare const State: PropertyDecorator;
declare const Prop: PropertyDecorator;
declare const Link: PropertyDecorator;
declare const ObjectLink: PropertyDecorator;
declare const Provide: PropertyDecorator & ((value: string) => PropertyDecorator);
declare const Consume: PropertyDecorator & ((value: string) => PropertyDecorator);
declare const StorageProp: (value: string) => PropertyDecorator;
declare const StorageLink: (value: string) => PropertyDecorator;
declare const Watch: (value: string) => PropertyDecorator;
declare const Builder: MethodDecorator;
declare const CustomDialog: ClassDecorator;
declare const Extend: <T>(component: T) => MethodDecorator;
declare const Styles: MethodDecorator;

interface StateStyles {
  normal?: any;

  pressed?: any;

  disabled?: any;

  focused?: any;

  clicked?: any;
}

declare class CommonMethod<T> {

  constructor();

  width(value: number | string): T;

  height(value: number | string): T;

  size(value: { width?: number | string, height?: number | string }): T;

  constraintSize(value: { minWidth?: number | string, maxWidth?: number | string, minHeight?: number | string, maxHeight?: number | string }): T;

  layoutPriority(value: number | string): T;

  layoutWeight(value: number | string): T;

  navigationTitle(value: string): T;

  navigationSubTitle(value: string): T;

  hideNavigationBar(value: boolean): T;

  hideNavigationBackButton(value: boolean): T;

  toolBar(value: object): T;

  hideToolBar(value: boolean): T;

  translate(value: { x?: number | string, y?: number | string, z?: number | string }): T;

  scale(value: { x?: number, y?: number, z?: number, centerX?: number | string, centerY?: number | string }): T;

  gridSpan(value: number): T

  gridOffset(value: number): T

  rotate(value: { x?: number, y?: number, z?: number, centerX?: number | string, centerY?: number | string, angle: number | string }): T;

  transform(value: object): T;

  onAppear(event: () => void): T;

  onDisAppear(event: () => void): T;

  flexGrow(value: number): T;

  flexShrink(value: number): T;

  flexBasis(value: number | string): T;

  enabled(value: boolean): T;

  stateStyles(value: StateStyles): T;
}

 declare class CommonAttribute extends CommonMethod<CommonAttribute>{}

 interface CommonInterface {
   (): CommonAttribute;
 }
 
 declare const CommonInstance: CommonAttribute;
 
 declare const Common: CommonInterface;

interface ForEachInterface {
  (arr: Array<any>, itemGenerator: (item: any, index?: number) => void,
    keyGenerator?: (item: any, index?: number) => string): ForEachInterface;
}

declare const ForEach: ForEachInterface;

/**
 * Custom Component
 * @devices phone, tablet, car
 * @since 7
 */
 declare class CustomComponent {
  /**
   * Customize the pop-up content constructor.
   * @devices phone, tablet, car
   * @since 7
   */
  build(): void;

  /**
   * Private  aboutToAppear Method
   * @devices phone, tablet, car
   * @since 7
   */
  public aboutToAppear?(): void;

  /**
   * Private  aboutToDisappear Method
   * @devices phone, tablet, car
   * @since 7
   */
  public aboutToDisappear?(): void;
}