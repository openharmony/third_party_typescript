//// [tests/cases/conformance/annotations/annotationApplicationError21.ets] ////

//// [A.d.ets]
export @interface Available {
    minApiVersion: string = "1";
}

//// [B.ets]
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export class C {
    @Available({minApiVersion: 'OpenHarmony 20'})
    prop1: string = "1";

    @Available({minApiVersion: 'OpenHarmony 20'})
    func1(): void {};

    @Available({minApiVersion: 'OpenHarmony 20'})
    static sFunc1(): void {};

    @Available({minApiVersion: 'OpenHarmony 20'})
    get prop(): string {
        return this.prop1;
    }

    @Available({minApiVersion: 'OpenHarmony 20'})
    set prop(value: string) {
        this.prop1 = value;
    }
}

//// [B.js]
"use strict";
exports.__esModule = true;
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
        this.prop1 = "1";
    }
    C.prototype.func1 = function () { };
    ;
    C.sFunc1 = function () { };
    ;
    Object.defineProperty(C.prototype, "prop", {
        get: function () {
            return this.prop1;
        },
        set: function (value) {
            this.prop1 = value;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
exports.C = C;
