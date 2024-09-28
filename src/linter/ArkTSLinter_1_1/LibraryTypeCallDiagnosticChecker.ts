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
export namespace ArkTSLinter_1_1 {

import DiagnosticChecker = DiagnosticCheckerNamespace.DiagnosticChecker
// Current approach relates on error code and error message matching and it is quite fragile,
// so this place should be checked thoroughly in the case of typescript upgrade
export namespace LibraryTypeCallDiagnosticCheckerNamespace {
export const TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE = 2322;
export const TYPE_UNKNOWN_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE = /^Type '(.*)\bunknown\b(.*)' is not assignable to type '.*'\.$/;
export const TYPE_NULL_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE = /^Type '(.*)\bnull\b(.*)' is not assignable to type '.*'\.$/;
export const TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE = /^Type '(.*)\bundefined\b(.*)' is not assignable to type '.*'\.$/;

export const ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE = 2345;
export const ARGUMENT_OF_TYPE_NULL_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE = /^Argument of type '(.*)\bnull\b(.*)' is not assignable to parameter of type '.*'\.$/;
export const ARGUMENT_OF_TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE = /^Argument of type '(.*)\bundefined\b(.*)' is not assignable to parameter of type '.*'\.$/;

export const NO_OVERLOAD_MATCHES_THIS_CALL_ERROR_CODE = 2769;
export const TYPE = 'Type';
export const IS_NOT_ASSIGNABLE_TO_TYPE = 'is not assignable to type';
export const ARGUMENT_OF_TYPE = 'Argument of type';
export const IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE = 'is not assignable to parameter of type';

export enum ErrorType {
  NO_ERROR,
  UNKNOW,
  NULL,
  UNDEFINED
}

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
        msg.match(ARGUMENT_OF_TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE) ||
        msg.match(TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE) ||
        msg.match(TYPE_NULL_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE);
      return !match;
    }
    return true;
  }

  static checkMessageChain(chain: ts.DiagnosticMessageChain, inLibCall: boolean): ErrorType {
    if (chain.code === TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE) {
      if (chain.messageText.match(TYPE_UNKNOWN_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE)) {
        return ErrorType.UNKNOW;
      }
      if (inLibCall && chain.messageText.match(TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE)) {
        return ErrorType.UNDEFINED;
      }
      if (inLibCall && chain.messageText.match(TYPE_NULL_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE)) {
        return ErrorType.NULL;
      }
    }
    if (chain.code === ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE) {
      if (inLibCall && chain.messageText.match(ARGUMENT_OF_TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE)) {
        return ErrorType.UNDEFINED;
      }
      if (inLibCall && chain.messageText.match(ARGUMENT_OF_TYPE_NULL_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE)) {
        return ErrorType.NULL;
      }
    }
    
    if (!chain.next?.length) {
      return ErrorType.NO_ERROR;
    }
    // 'No_overrload...' error need to check each sub-error message, others only check the first one
    if (chain.code !== NO_OVERLOAD_MATCHES_THIS_CALL_ERROR_CODE) {
      return LibraryTypeCallDiagnosticChecker.checkMessageChain(chain.next[0], inLibCall);
    }
    let result = ErrorType.NO_ERROR;
    for (const child of chain.next) {
      result = LibraryTypeCallDiagnosticChecker.checkMessageChain(child, inLibCall);
      if (result !== ErrorType.NO_ERROR) {
        break;
      }
    }
    return result;
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

    if (LibraryTypeCallDiagnosticChecker.checkMessageChain(msgText, this.inLibCall) !== ErrorType.NO_ERROR) {
      this.diagnosticMessages.push(msgText);
      return false;
    }
    return true;
  }

  static rebuildTscDiagnostics(tscStrictDiagnostics: Map<Diagnostic[]>): void {
    if (tscStrictDiagnostics.size === 0) {
      return;
    }
  
    let diagnosticMessageChainArr: Diagnostic[] = [];
    let strictArr: Diagnostic[] = [];
    tscStrictDiagnostics.forEach((strict) => {
      if (strict.length === 0) {
        return;
      }
  
      for (let i = 0; i < strict.length; i++) {
        if (typeof strict[i].messageText === 'string') {
          strictArr.push(strict[i]);
        } else {
          diagnosticMessageChainArr.push(strict[i]);
        }
      }
    });
  
    if (diagnosticMessageChainArr.length === 0 || strictArr.length === 0) {
      return;
    }
  
    /**
     * DiagnosticMessageChain in strict mode errors are reported across files and need to be traversed for DiagnosticMessageChain errors on all files
     * DiagnosticMessageChain type errors require that both type and argument error text be constructed to match those with string errors
     * TypeScriptLinter. StrictDiagnosticCache can only keep by white list DiagnosticMessageChain type error and its matching success string type errors
     */
    const textSet: Set<string> = new Set<string>();
    const unknownSet: Set<string> = new Set<string>();
    diagnosticMessageChainArr.forEach((item) => {
      const diagnosticMessageChain = item.messageText as DiagnosticMessageChain;
      const isAllowFilter: ErrorType = LibraryTypeCallDiagnosticChecker.checkMessageChain(diagnosticMessageChain, true);
      if (isAllowFilter === ErrorType.UNKNOW) {
        LibraryTypeCallDiagnosticChecker.collectDiagnosticMessage(diagnosticMessageChain, unknownSet);
        TypeScriptLinter.unknowDiagnosticCache.add(item);
        return;
      }
      if (isAllowFilter !== ErrorType.NO_ERROR) {
        LibraryTypeCallDiagnosticChecker.collectDiagnosticMessage(diagnosticMessageChain, textSet);
        TypeScriptLinter.strictDiagnosticCache.add(item);
      }
    });
    strictArr.forEach((item) => {
      const messageText = item.messageText as string;
      if (unknownSet.has(messageText)) {
        TypeScriptLinter.unknowDiagnosticCache.add(item);
      } else if (textSet.has(messageText)) {
        TypeScriptLinter.strictDiagnosticCache.add(item);
      }
    });
  }

  static collectDiagnosticMessage(diagnosticMessageChain: DiagnosticMessageChain, textSet: Set<string>): void {
    const isTypeError = diagnosticMessageChain.code === TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE;
    const typeText = isTypeError ?
      diagnosticMessageChain.messageText :
      diagnosticMessageChain.messageText.replace(ARGUMENT_OF_TYPE, TYPE)
        .replace(IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE, IS_NOT_ASSIGNABLE_TO_TYPE);
    const argumentText = isTypeError ?
      diagnosticMessageChain.messageText.replace(TYPE, ARGUMENT_OF_TYPE)
        .replace(IS_NOT_ASSIGNABLE_TO_TYPE, IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE) :
      diagnosticMessageChain.messageText;
    textSet.add(typeText);
    textSet.add(argumentText);
  }
}
}
}
}