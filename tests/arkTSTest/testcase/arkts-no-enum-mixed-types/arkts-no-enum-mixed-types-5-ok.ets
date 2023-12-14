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


// Initializing an enumeration member does not use calculations
/*
Constant enumeration expressions are a subset of TypeScript expressions that can be fully evaluated at compile time. An expression is a constant enumeration expression if it is:

Literal enumeration expressions (basically string literals or numeric literals)
A reference to a previously defined constant enumeration member (can be derived from a different enumeration)
Constant enumeration expressions with parentheses
One of the +、-、~ unary operators applied to a constant enumeration expression
+、-、*, /, %, <<, >>, >>>, &, |, ^ use a constant enumeration expression as a binary operator for operands
Evaluating a constant enumeration expression to NaN or Infinity is a compile-time error.

In all other cases, enumerated members are considered computational.
*/

enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  G = 3,
}
// 3
console.log(FileAccess.G)  