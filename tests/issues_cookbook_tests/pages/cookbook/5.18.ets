interface I1 {
  f(): string
}

interface I2 { // I2 is structurally equivalent to I1.
  f(): string
}

class X {
  n: number = 0
  s: string = ''
}

class Y { // Y is structurally equivalent to X.
  n: number = 0
  s: string = ''
}

let x = new X()
let y = new Y()

console.log('Assign X to Y')
y = x

console.log('Assign Y to X')
x = y

function foo(x: X) {
  console.log(x.n + x.s)
}


foo(new X())
foo(new Y())




// right
interface I1_right {
  f(): string
}

type I2_right = I1_right // I2 is an alias for I1.

class B {
  n: number = 0
  s: string = ''
}

// D is derived from B, which explicitly set subtype/supertype relations.
class D extends B {
  constructor() {
    super()
  }
}

let b = new B()
let d = new D()

console.log('Assign D to B')
b = d // OK. B is the superclass of D.

// An attempt to assign b to d will result in a compile-time error.
// d = b

interface Z {
  n: number
  s: string
}

// X implements interface Z, which makes relation between X and Y explicit.
class X_right implements Z {
  n: number = 0
  s: string = ''
}

// Y implements interface Z, which makes relation between X and Y explicit.
class Y_right implements Z {
  n: number = 0
  s: string = ''
}

let x_right: Z = new X_right()
let y_right: Z = new Y_right()

console.log('Assign X to Y')
y_right = x_right // ok, both are of the same type

console.log('Assign Y to X')
x_right = y_right // ok, both are of the same type

function foo_right(c: Z): void {
  console.log(c.n + c.s)
}

// X and Y implement the same interface. Therefore both calls are allowed.
foo_right(new X_right())
foo_right(new Y_right())


export let other = 1;