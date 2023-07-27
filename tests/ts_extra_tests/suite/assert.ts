import { AssertionError } from "./assertionError.js"

export class Assert {
    private static defaultMessage(actual: any, expect: any, flag: boolean = true) {
        if (flag == true) {
            return "expected '" + expect + "' ,but was '" + actual + "'.";
        } else {
            return "expected not '" + expect + "' ,but was '" + actual + "'.";
        }

    }
    static equal(actual: any, expect: any, msg?: string) {
        if (actual != expect) {
            throw new AssertionError(msg ? msg : this.defaultMessage(actual, expect));
        }
    }
    static notEqual(actual: any, expect: any, msg?: string) {
        if (actual == expect) {
            throw new AssertionError(msg ? msg : this.defaultMessage(actual, expect, false));
        }
    }
    static isTrue(actual: any, msg?: string) {
        this.equal(actual, true, msg);
    }
    static isFalse(flag: any, msg?: string) {
        this.equal(flag, false, msg);
    }
    static isNumber(x: any, msg?: string) {
        this.equal(typeof x, "number", msg);
    }
    static isString(s: any, msg?: string) {
        this.equal(typeof s, "string", msg);
    }
    static isBoolean(s: any, msg?: string) {
        this.equal(typeof s, "boolean", msg);
    }
    static isSymbol(actual: any, msg?: string) {
        this.equal(typeof actual, "symbol", msg);
    }
    static isFunction(fun: any, msg?: string) {
        this.equal(typeof fun, "function", msg);
    }
    static notNULL(v: any, msg?: string) {
        this.notEqual(v, null, msg);
    }
    static isUndefined(actual: any, msg?: string) {
        this.equal(actual, undefined, msg);
    }
   static isObject(obj: any, msg?: string) {
    this.equal(typeof obj, "object", msg);
  }
}