class A {
    v: string = ''
}

function SetProperty<T extends Object>(oldObj: T, str: string, obj: Object): void {
    oldObj[str] = obj // will report error when nolmplicitAny is true
}

function GetProperty<T extends Object, U>(oldObj: T, str: string): U {
    return oldObj[str] //will report error when nolmplicitAny is true
}

function test() {
    let a: A = { v: 'abc' }
    SetProperty(a, 'u', 'def')
    return GetProperty<A, string>(a, 'v') + GetProperty<A, string>(a, 'u')
}


export let other = 1;