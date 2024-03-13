
export let other = 1;

declare class X<T> {
    [Symbol.iterator](): IterableIterator<T>; // report arkts-identifiers-as-prop-names.Should NOT report
}
