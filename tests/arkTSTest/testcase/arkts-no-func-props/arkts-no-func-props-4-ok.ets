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


class Format {
  static formatName(firstName: string, lastName: string): string {
    return `${lastName}, ${firstName}`;
  }
  static fullName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`;
  }
  static getInitials = (firstName: string, lastName: string): string => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}.${lastInitial}.`;
  }

}

const formattedName1:string = Format.formatName("John", "Doe");
console.log(`Formatted name: ${formattedName1}`);

const fullName:string = Format.fullName1("John", "Doe");
console.log(`Full name: ${fullName}`);

const initials1:string = Format.getInitials("John", "Doe");
console.log(`Initials1: ${initials1}`);