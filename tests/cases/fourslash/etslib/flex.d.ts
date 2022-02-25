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

declare enum FlexAlign {
    Start,
    Center,
    End,
    SpaceBetween,
    SpaceAround,
    SpaceEvenly
}

declare enum ItemAlign {
    Auto,
    Start,
    Center,
    End,
    Baseline,
    Stretch
}

declare enum FlexDirection {
    Row,
    Column,
    RowReverse,
    ColumnReverse
}

declare enum FlexWrap {
    NoWrap,
    Wrap,
    WrapReverse
}

declare enum VerticalAlign {
    Top,
    Center,
    Bottom
}

interface FlexInterface {
    (value?: { direction?: FlexDirection, wrap?: FlexWrap, justifyContent?: FlexAlign, alignItems?: ItemAlign, alignContent?: FlexAlign }): FlexAttribute;
}

declare class FlexAttribute extends CommonMethod<FlexAttribute> {
}

declare const Flex: FlexInterface;

declare const FlexInstance: FlexAttribute;