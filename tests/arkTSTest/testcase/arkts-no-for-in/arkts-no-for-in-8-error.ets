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


import { JSDOM } from "jsdom";

// Create a virtual browser environment
const dom: ESObject = new JSDOM(`<!DOCTYPE html><div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
<div>7</div>
<div>8</div>
<div>9</div>
<div>10</div>`);

// Get div elements in a virtual browser environment
const nodeList: HTMLCollectionOf<HTMLDivElement> =
  dom.window.document.getElementsByTagName("div");

// Traverse the nodeList and print its innerText
for (let key in nodeList) {
  console.log(nodeList[key].textContent);
}
