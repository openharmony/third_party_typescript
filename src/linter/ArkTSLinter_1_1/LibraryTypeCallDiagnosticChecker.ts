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
import * as ts from "../_namespaces/ts";
import { Diagnostic, Map, Set, ESMap } from "../_namespaces/ts";

// Current approach relates on error code and error message matching and it is quite fragile,
// so this place should be checked thoroughly in the case of typescript upgrade
export const TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE = 2322;
export const TYPE_UNKNOWN_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE = /^Type '(.*)\bunknown\b(.*)' is not assignable to type '.*'\.$/;
export const TYPE_NULL_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE = /^Type '(.*)\bnull\b(.*)' is not assignable to type '.*'\.$/;
export const TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE = /^Type '(.*)\bundefined\b(.*)' is not assignable to type '.*'\.$/;

export const ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE = 2345;
export const OBJECT_IS_POSSIBLY_UNDEFINED_ERROR_CODE = 2532;
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
  POSSIBLY_UNDEFINED,
}

interface CheckRange {
  begin: number;
  end: number;
}

export class LibraryTypeCallDiagnosticChecker {
  private static _instance: LibraryTypeCallDiagnosticChecker;

  static get instance(): LibraryTypeCallDiagnosticChecker {
    if (!LibraryTypeCallDiagnosticChecker._instance) {
      LibraryTypeCallDiagnosticChecker._instance = new LibraryTypeCallDiagnosticChecker();
    }
    return LibraryTypeCallDiagnosticChecker._instance;
  }

  private _diagnosticErrorTypeMap: ESMap<ts.Diagnostic, ErrorType> = new Map();

  private constructor() {}

  clear(): void {
    this._diagnosticErrorTypeMap = new Map();
  }

  // eslint-disable-next-line max-lines-per-function
  rebuildTscDiagnostics(tscStrictDiagnostics: ESMap<string, ts.Diagnostic[]>): void {
    this.clear();
    if (tscStrictDiagnostics.size === 0) {
      return;
    }

    const diagnosticMessageChainArr: Diagnostic[] = [];
    const strictArr: Diagnostic[] = [];
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

    /**
     * When there are multiple errors with the same origin,
     * only the first error message will retain the complete error reason,
     * while the rest will only have a single line of error information.
     *
     * So need to check all the complete error messages first,
     * and then check the single-line error messages by matching the first line of text.
     */
    const nullSet: Set<string> = new Set<string>();
    const unknownSet: Set<string> = new Set<string>();
    diagnosticMessageChainArr.forEach((item) => {
      const diagnosticMessageChain = item.messageText as ts.DiagnosticMessageChain;
      const errorType: ErrorType = MessageUtils.checkMessageChainErrorType(diagnosticMessageChain);
      if (errorType === ErrorType.UNKNOW) {
        MessageUtils.collectDiagnosticMessage(diagnosticMessageChain, unknownSet);
        this._diagnosticErrorTypeMap.set(item, ErrorType.UNKNOW);
      } else if (errorType === ErrorType.NULL) {
        MessageUtils.collectDiagnosticMessage(diagnosticMessageChain, nullSet);
        this._diagnosticErrorTypeMap.set(item, ErrorType.NULL);
      }
    });
    strictArr.forEach((item) => {
      const messageText = item.messageText as string;
      let errorType: ErrorType;
      if (unknownSet.has(messageText)) {
        errorType = ErrorType.UNKNOW;
      } else if (nullSet.has(messageText)) {
        errorType = ErrorType.NULL;
      } else {
        errorType = MessageUtils.checkMessageErrorType(item.code, messageText);
      }

      if (errorType === ErrorType.NO_ERROR) {
        return;
      }
      this._diagnosticErrorTypeMap.set(item, errorType);
    });
  }

  // eslint-disable-next-line max-lines-per-function
  filterDiagnostics(
    tscDiagnostics: readonly ts.Diagnostic[],
    expr: ts.CallExpression | ts.NewExpression,
    isLibCall: boolean,
    filterHandle: (diagnositc: ts.Diagnostic, errorType: ErrorType) => void
  ): void {
    const exprRange: CheckRange = { begin: expr.getStart(), end: expr.getEnd() };
    let validArgsRanges: CheckRange[];

    /*
     * When the "Object is possibly 'undefined'." error may be caused by another filterable error in the current callExpression,
     * only then is it necessary to filter the "Object is possibly 'undefined'." error.
     */
    let hasFiltered: boolean = false;
    ArrayUtils.forEachWithDefer(
      tscDiagnostics,
      (diagnostic) => {
        return this.getErrorType(diagnostic) === ErrorType.POSSIBLY_UNDEFINED;
      },
      (diagnostic) => {
        const errorType = this.getErrorType(diagnostic);
        if (
          errorType === ErrorType.NO_ERROR ||
          diagnostic.category === ts.DiagnosticCategory.Warning ||
          !LibraryTypeCallDiagnosticChecker.isValidErrorType(errorType, isLibCall, hasFiltered) ||
          !LibraryTypeCallDiagnosticChecker.isValidDiagnosticRange(
            diagnostic,
            exprRange,
            validArgsRanges || (validArgsRanges = RangeUtils.getValidArgsRanges(expr.arguments))
          )
        ) {
          return;
        }

        hasFiltered = false;
        filterHandle(diagnostic, errorType);
      }
    );
  }

  private getErrorType(diagnostic: ts.Diagnostic): ErrorType {
    return this._diagnosticErrorTypeMap.get(diagnostic) ?? ErrorType.NO_ERROR;
  }

  private static isValidErrorType(errorType: ErrorType, isLibCall: boolean, hasFiltered: boolean): boolean {
    switch (errorType) {
      case ErrorType.UNKNOW:
        return true;
      case ErrorType.NULL:
        return isLibCall;
      case ErrorType.POSSIBLY_UNDEFINED:
        return isLibCall && hasFiltered;
      default:
        return false;
    }
  }

  private static isValidDiagnosticRange(
    diagnostic: ts.Diagnostic,
    exprRange: CheckRange,
    validArgsRanges: CheckRange[]
  ): boolean {
    if (diagnostic.start === undefined) {
      return false;
    }
    // Some strict mode errors caused by actual parameters. The error message will be mounted on the entire function call node.
    const isFullCall = !!diagnostic.length && exprRange.end === diagnostic.start + diagnostic.length;
    switch (diagnostic.code) {
      case ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE:
        return RangeUtils.isInRanges(diagnostic.start, validArgsRanges);
      case NO_OVERLOAD_MATCHES_THIS_CALL_ERROR_CODE:
        return isFullCall || RangeUtils.isInRanges(diagnostic.start, validArgsRanges);
      case TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE:
        return RangeUtils.isInRanges(diagnostic.start, validArgsRanges);
      case OBJECT_IS_POSSIBLY_UNDEFINED_ERROR_CODE:
        return isFullCall;
      default:
        return false;
    }
  }
}

class MessageUtils {
  static collectDiagnosticMessage(diagnosticMessageChain: ts.DiagnosticMessageChain, textSet: Set<string>): void {
    const isTypeError = diagnosticMessageChain.code === TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE;
    const typeText = isTypeError ?
      diagnosticMessageChain.messageText :
      diagnosticMessageChain.messageText.
        replace(ARGUMENT_OF_TYPE, TYPE).
        replace(IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE, IS_NOT_ASSIGNABLE_TO_TYPE);
    const argumentText = isTypeError ?
      diagnosticMessageChain.messageText.
        replace(TYPE, ARGUMENT_OF_TYPE).
        replace(IS_NOT_ASSIGNABLE_TO_TYPE, IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE) :
      diagnosticMessageChain.messageText;
    textSet.add(typeText);
    textSet.add(argumentText);
  }

  static checkMessageErrorType(code: number, messageText: string): ErrorType {
    if (code === TYPE_0_IS_NOT_ASSIGNABLE_TO_TYPE_1_ERROR_CODE) {
      if (messageText.match(TYPE_UNKNOWN_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE)) {
        return ErrorType.UNKNOW;
      }
      if (messageText.match(TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE)) {
        return ErrorType.NULL;
      }
      if (messageText.match(TYPE_NULL_IS_NOT_ASSIGNABLE_TO_TYPE_1_RE)) {
        return ErrorType.NULL;
      }
    }
    if (code === ARGUMENT_OF_TYPE_0_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_ERROR_CODE) {
      if (messageText.match(ARGUMENT_OF_TYPE_UNDEFINED_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE)) {
        return ErrorType.NULL;
      }
      if (messageText.match(ARGUMENT_OF_TYPE_NULL_IS_NOT_ASSIGNABLE_TO_PARAMETER_OF_TYPE_1_RE)) {
        return ErrorType.NULL;
      }
    }
    if (code === OBJECT_IS_POSSIBLY_UNDEFINED_ERROR_CODE) {
      return ErrorType.POSSIBLY_UNDEFINED;
    }
    return ErrorType.NO_ERROR;
  }

  static checkMessageChainErrorType(chain: ts.DiagnosticMessageChain): ErrorType {
    let errorType = MessageUtils.checkMessageErrorType(chain.code, chain.messageText);
    if (errorType !== ErrorType.NO_ERROR || !chain.next?.length) {
      return errorType;
    }
    // 'No_overrload... 'Errors need to check each sub-error message, others only check the first one
    if (chain.code !== NO_OVERLOAD_MATCHES_THIS_CALL_ERROR_CODE) {
      return MessageUtils.checkMessageChainErrorType(chain.next[0]);
    }

    for (const child of chain.next) {
      errorType = MessageUtils.checkMessageChainErrorType(child);
      if (errorType !== ErrorType.NO_ERROR) {
        break;
      }
    }
    return errorType;
  }
}

class RangeUtils {
  static isInRanges(pos: number, ranges: CheckRange[]): boolean {
    for (let i = 0; i < ranges.length; i++) {
      if (pos >= ranges[i].begin && pos < ranges[i].end) {
        return true;
      }
    }
    return false;
  }

  static getValidArgsRanges(args: ts.NodeArray<ts.Expression> | undefined): CheckRange[] {
    if (!args) {
      return [];
    }
    const nonFilteringRanges = RangeUtils.findNonFilteringRangesFunctionCalls(args);
    const rangesToFilter: CheckRange[] = [];
    if (nonFilteringRanges.length !== 0) {
      const rangesSize = nonFilteringRanges.length;
      rangesToFilter.push({ begin: args.pos, end: nonFilteringRanges[0].begin });
      rangesToFilter.push({ begin: nonFilteringRanges[rangesSize - 1].end, end: args.end });
      for (let i = 0; i < rangesSize - 1; i++) {
        rangesToFilter.push({ begin: nonFilteringRanges[i].end, end: nonFilteringRanges[i + 1].begin });
      }
    } else {
      rangesToFilter.push({ begin: args.pos, end: args.end });
    }
    return rangesToFilter;
  }

  private static findNonFilteringRangesFunctionCalls(args: ts.NodeArray<ts.Expression>): CheckRange[] {
    const result: CheckRange[] = [];
    for (const arg of args) {
      if (ts.isArrowFunction(arg)) {
        const arrowFuncExpr = arg;
        result.push({ begin: arrowFuncExpr.body.pos, end: arrowFuncExpr.body.end });
      } else if (ts.isCallExpression(arg)) {
        result.push({ begin: arg.arguments.pos, end: arg.arguments.end });
      }
      // there may be other cases
    }
    return result;
  }
}

class ArrayUtils {

  /*
   * When performing a 'forEach' operation on an array,
   * elements that meet the conditions are allowed to be executed at the end.
   */
  static forEachWithDefer<T>(
    list: readonly T[],
    deferChecker: (value: T, index: number, array: readonly T[]) => boolean,
    callbackfn: (value: T, index: number, array: readonly T[]) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any
  ): void {
    if (!list.length) {
      return;
    }

    const temp: number[] = [];
    list.forEach((item, index, array) => {
      if (deferChecker(item, index, array)) {
        temp.push(index);
        return;
      }
      callbackfn.call(thisArg, item, index, array);
    });

    temp.forEach((index) => {
      callbackfn.call(thisArg, list[index], index, list);
    });
  }
}