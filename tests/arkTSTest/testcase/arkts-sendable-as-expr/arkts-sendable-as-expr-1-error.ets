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

// Only object, Object, and any type can be casted to Sendable type
// If other types are casted to Sendable, an error occurs

@Sendable
class SendableClass {}

function myFunctionA(obj: number) {
  obj as SendableClass; // ERROR
}

function myFunctionB(obj: string) {
  obj as SendableClass; // ERROR
}

function myFunctionC(obj: boolean) {
  obj as SendableClass; // ERROR
}

function myFunctionD(obj: never) {
  obj as SendableClass; // ERROR
}

function myFunctionE(obj: void) {
  obj as SendableClass; // ERROR
}

function myFunctionF(obj: [number, string]) {
  obj as SendableClass; // ERROR
}

function myFunctionG(obj: number | string) {
  obj as SendableClass; // ERROR
}