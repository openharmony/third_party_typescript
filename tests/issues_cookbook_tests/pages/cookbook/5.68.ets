// wrong
let C = function(p) {
  this.p = p // Compile-time error only when noImplicitThis is enabled
}
C.prototype = {
  m() {
    console.log(this.p)
  }
}
C.prototype.q = function(r: string) {
  return this.p == r
}



// right
class C_right {
  p: string = ''
  m() {
    console.log(this.p)
  }
  q(r: string) {
    return this.p == r
  }
}



export let other = 1;