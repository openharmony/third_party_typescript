export function foo(a: string): ResourceColor | undefined {
    if (a.length) {
        return ''
    }
    return undefined
}

let t: ResourceColor = foo('')