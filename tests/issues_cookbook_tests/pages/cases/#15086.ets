function foo<T extends number[]>(fn: (...args: T) => void) {
    return (...args: T) => {
        fn(...args) // should not report error as T is an array type, but report enror here: arkts-no-spread
    }
}
foo((a: number = 1, b: number = 2) => { a + b })


export let other = 1;