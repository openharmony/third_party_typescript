/*
 * Copyright (c) 2023-2023 Huawei Device Co., Ltd.
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

namespace ts {

import DiagnosticChecker = DiagnosticCheckerNamespace.DiagnosticChecker
// Current approach relates on error code and error message matching and it is quite fragile,
// so this place should be checked thoroughly in the case of typescript upgrade
export namespace LibraryTypeCallDiagnosticCheckerNamespace {
export const TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE = 2322;
export const TYPE_UNKNOWN_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE = /^Type '(.*)\bunknown\b(.*)' is not assignable to type '.*'\.$/;
export const TYPE_NULL_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE = /^Type 'null' is not assignable to type '.*'\.$/;
export const TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE = /^Type 'undefined' is not assignable to type '.*'\.$/;

export const ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE = 2345;
export const ARGUMENT_OF_TYPE_NULL_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE = /^Argument of type 'null' is not assignable to parameter of type '.*'\.$/;
export const ARGUMENT_OF_TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE = /^Argument of type 'undefined' is not assignable to parameter of type '.*'\.$/;

export class LibraryTypeCallDiagnosticChecker implements DiagnosticChecker {
  inLibCall: boolean = false;
  diagnosticMessages: Array<ts.DiagnosticMessageChain> | undefined;
  filteredDiagnosticMessages: DiagnosticMessageChain[] = [];

  constructor(filteredDiagnosticMessages: DiagnosticMessageChain[]) {
    this.filteredDiagnosticMessages = filteredDiagnosticMessages;
  }
  
  configure(inLibCall: boolean, diagnosticMessages: Array<ts.DiagnosticMessageChain>) {
    this.inLibCall = inLibCall;
    this.diagnosticMessages = diagnosticMessages;
  }

  checkMessageText(msg: string): boolean {
    if (this.inLibCall) {
      const match = msg.match(ARGUMENT_OF_TYPE_NULL_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE) ||
        msg.match(ARGUMENT_OF_TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE);
      return !match;
    }
    return true;
  }

  checkMessageChain(chain: ts.DiagnosticMessageChain): boolean {
    if (chain.code == TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE) {
      if (chain.messageText.match(TYPE_UNKNOWN_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE)) {
        return false;
      }
      if (this.inLibCall && chain.messageText.match(TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE)) {
        return false;
      }
      if (this.inLibCall && chain.messageText.match(TYPE_NULL_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE)) {
        return false;
      }
    }
    return chain.next == undefined ? true : this.checkMessageChain(chain.next[0]);
  };

  checkFilteredDiagnosticMessages(msgText: ts.DiagnosticMessageChain | string) {
    if (this.filteredDiagnosticMessages.length == 0) {
      return true;
    }

    if (typeof msgText !== 'string' && this.filteredDiagnosticMessages.includes(msgText)) {
      return false;
    }

    for (const msgChain of this.filteredDiagnosticMessages) {
      if (typeof msgText == 'string') {
        if (msgText == msgChain.messageText) {
          return false;
        }
        continue;
      }

      let curMsg: ts.DiagnosticMessageChain | undefined = msgText;
      let curFilteredMsg: ts.DiagnosticMessageChain | undefined = msgChain;
      while (curMsg) {
        if (!curFilteredMsg) {
          return true;
        }

        if (curMsg.code != curFilteredMsg.code) {
          return true;
        }

        if (curMsg.messageText != curFilteredMsg.messageText) {
          return true;
        }

        curMsg = curMsg.next ? curMsg.next[0]: undefined;
        curFilteredMsg = curFilteredMsg.next ? curFilteredMsg.next[0]: undefined;
      }

      return false;
    }
    return true;
  }

  checkDiagnosticMessage(msgText: string | ts.DiagnosticMessageChain): boolean {
    if (!this.diagnosticMessages) {
      return false;
    }

    if (this.inLibCall && !this.checkFilteredDiagnosticMessages(msgText)) {
      return false;
    }

    if (typeof msgText == 'string') {
      return this.checkMessageText(msgText);
    }

    if (!this.checkMessageChain(msgText)) {
      this.diagnosticMessages.push(msgText);
      return false;
    }
    return true;
  }
}
}
}