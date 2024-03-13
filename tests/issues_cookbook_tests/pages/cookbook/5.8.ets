// wrong
class SomeObject {
}
type SomeConstructor = {     // should report
  new(s: string): SomeObject // should report
}
function fn(ctor: SomeConstructor) {
  return new ctor('hello')
}


// right
class SomeObject_right {
  public f: string
  constructor(s: string) {
    this.f = s
  }
}
function fn_right(s: string): SomeObject_right {
  return new SomeObject_right(s)
}


export let other = 1;