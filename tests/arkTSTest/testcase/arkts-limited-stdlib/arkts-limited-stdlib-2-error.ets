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


// Description: Use Object.hasOwnProperty

interface O {
  prop1?: string
  prop2?: string
}

const obj: O = {
  prop1: 'value1',
  prop2: 'value2'
};

if (obj.hasOwnProperty('prop1')) {
  console.log('obj has prop1 Property。');
} else {
  console.log('obj doesn't has prop1 Property。');
}

