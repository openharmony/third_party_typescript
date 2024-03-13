const str1 = 'a';

enum T {
    A = 'aaa',
    B = 'bbb'
}

let obj: Record<string, number> = { // should report error: arkts-no-untyped-obj-literals
    ['b']: 123,
    [str1]: 321,                    // should report error: arkts-identifiers-as-prop-names
    [T.A]: 112312,
    [T.B]: 123123
}

let obj2: Record<string, number> = {
    ['b']: 123,
    [T.A]: 112312,
    [T.B]: 123123
}

class A {
    ['b'] = 123;
    [str1] = 321;                   // should report error; arkts -identifiers-as-prop-names
    [T.A] = 112312;
    [T.B] = 123123;
}

export let other = 1;