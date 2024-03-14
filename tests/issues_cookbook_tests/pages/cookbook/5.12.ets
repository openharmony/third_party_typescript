// wrong
interface ListItem {
  getHead(): this // should report
}

class C {
  n: number = 0
  m(c: this) { // should report
    // ...
  }
}


// right
interface ListItem_right {
  getHead(): ListItem_right
}

class C_right {
  n: number = 0
  m(c: C_right) {
    // ...
  }
}


export let other = 1;