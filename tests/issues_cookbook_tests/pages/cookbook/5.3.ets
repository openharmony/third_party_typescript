//wrong
class C {
  #foo: number = 42 // should report
}

//right
class C_right {
  private foo: number = 42
}


export let other = 1;