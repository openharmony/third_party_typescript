class A {
    v: Record<string, string> | null = null
}
let a: A = { v: { 'a': 'v' } } // should NOT report ,error: arkts-identifiers-as-prop-names

interface A2 {
    param: Record<string, string | number | undefined | null>
    extra?: Record<string, string | number | undefined | null>
    value: Record<string, number> | string
}

let a2: A2 = {
    param: {
        "aa": 111
    },
    extra: {
        'bbb': 222 // should NOT report ,error: arkts-identifiers-as-prop-names
    },
    value: {
        'bbb': 222 // should NOT report ,error: arkts-identifiers-as-prop-names
    }
}

class A3 {
    extra: Record<string, number> | string = ''
    para?: Record<string, number> | string = ''
}
let a3: A3 = {
    extra: {
        'bbb': 222 // should NOT report ,error: arkts-identifiers-as.prop-names
    },
    para: {
        'bbb': 222 // should NOT report ,error: arkts-identifiers-as-prop-names
    }
}


export let other = 1;