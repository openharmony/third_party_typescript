class C {
  foo() {
    console.log('foo')
  }
}

function bar() {
  console.log('bar')
}

let c1 = new C()
let c2 = new C()
c2.foo = bar

c1.foo() // foo
c2.foo() // bar


class C_right {
  foo() {
    console.log('foo')
  }
}

class Derived_right extends C_right {
  foo() {
    console.log('Extra')
    super.foo()
  }
}

function bar_right() {
  console.log('bar')
}

let c1_right = new C_right()
let c2_right = new C_right()
c1_right.foo() // foo
c2_right.foo() // foo

let c3_right = new Derived_right()
c3_right.foo() // Extra foo


export let other = 1;