class C {
  foo() {}
}

class C1 implements C {
  foo() {}
}


interface C_right {
  foo(): void
}

class C1_right implements C_right {
  foo() {}
}


export let other = 1;