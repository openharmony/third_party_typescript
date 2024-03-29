declare class X<T> {
    [Symbol.iterator](): IterableIterator<T>; // report arkts-identifiers-as-prop-names.Should NOT report
}


export let other = 1;