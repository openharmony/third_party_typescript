class Foo {
  foo: string = ''
  common: string = ''
}

class Bar {
  bar: string = ''
  common: string = ''
}

function isFoo(arg: any): arg is Foo {
  return arg.foo !== undefined
}

function doStuff(arg: Foo | Bar) {
  if (isFoo(arg)) {
    console.log(arg.foo)  // OK
    console.log(arg.bar)  // Compile-time error
  } else {
    console.log(arg.foo)  // Compile-time error
    console.log(arg.bar)  // OK
  }
}

doStuff({ foo: 123, common: '123' })
doStuff({ bar: 123, common: '123' })



class Foo_right {
  foo: string = ''
  common: string = ''
}

class Bar_right {
  bar: string = ''
  common: string = ''
}

function isFoo_right(arg: Object): boolean {
  return arg instanceof Foo_right
}

function doStuff_right(arg: Object): void {
  if (isFoo_right(arg)) {
    let fooArg = arg as Foo_right
    console.log(fooArg.foo)   // OK
    console.log(arg.bar)    // Compile-time error
  } else {
    let barArg = arg as Bar_right
    console.log(arg.foo)    // Compile-time error
    console.log(barArg.bar)   // OK
  }
}

function main(): void {
  doStuff_right(new Foo_right())
  doStuff_right(new Bar_right())
}


export let other = 1;