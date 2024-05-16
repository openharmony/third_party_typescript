/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
/**---
 description: >
    TypeScript 5.1 now looks up a type called JSX.ElementType. 
    ElementType specifies precisely what is valid to use as a tag in a JSX element. 
 module: NodeNext
 jsx: react-jsx
 isCurrent: true
 error: { code: This JSX tag's 'children' prop expects a single child of type 'Element', 
 but multiple children were provided }
 ---*/


import * as React from 'react';

interface PropsType {
  children: JSX.Element;
  name: string;
}

class Component extends React.Component<PropsType, {}> {
  render(): JSX.Element | null {
    return (
      <h2>
        { this.props.children }
      </h2>
    );
  }
}

// error: This JSX tag's 'children' prop expects a single child of type 'Element', but multiple children were provided
<Component name = 'bar'>
  <h1>Hello World</h1>
  <h2>Hello World</h2>
</Component>;