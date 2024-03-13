// wrong
class C {
  static s: string
  static {
    C.s = 'aa'
  }
  static { // should report
    C.s = C.s + 'bb'
  }
}

// right
class C_right {
  static s: string
  static {
    C_right.s = 'aa'
    C_right.s = C_right.s + 'bb'
  }
}


export let other = 1;