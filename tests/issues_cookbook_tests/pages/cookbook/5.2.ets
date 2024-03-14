// wrong
const sym = Symbol() // should report
let o2 = {           // should report
  [sym]: "value"     // should report
}


// right
class SomeClass {
  public someProperty : string = ""
}
let o = new SomeClass()


export let other = 1;