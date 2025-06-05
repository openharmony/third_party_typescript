//// [variables.ts] ////
export const a = 1;
export let b = 2;
export var c = 3;
//// [interface.ts] ////
export interface Foo {
    a: string;
    readonly b: string;
    c?: string;
}
//// [class.ts] ////
const i = Symbol();
export class Bar {
    a: string;
    b?: string;
    declare c: string;
    #d: string;
    public e: string;
    protected f: string;
    private g: string;
    ["h"]: string;
    [i]: string;
}

export abstract class Baz {
    abstract a: string;
    abstract method(): void;
}
//// [namespace.ts] ////
export namespace ns {
    namespace internal {
        export class Foo {}
    }
    export namespace nested {
        export import inner = internal;
    }
}
//// [alias.ts] ////
export type A<T> = { x: T };
//// [variables.js] ////
export const a = 1;
export let b = 2;
export var c = 3;
//// [interface.js] ////
export {};
//// [class.js] ////
var _Bar_d;
const i = Symbol();
export class Bar {
    constructor() {
        _Bar_d.set(this, void 0);
    }
}
_Bar_d = new WeakMap();
export class Baz {
}
//// [namespace.js] ////
export var ns;
(function (ns) {
    let internal;
    (function (internal) {
        class Foo {
        }
        internal.Foo = Foo;
    })(internal || (internal = {}));
    let nested;
    (function (nested) {
        nested.inner = internal;
    })(nested = ns.nested || (ns.nested = {}));
})(ns || (ns = {}));
//// [alias.js] ////
export {};
