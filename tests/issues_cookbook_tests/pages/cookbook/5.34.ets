// wrong
class X {
  // ...
}
let a = (new X()) instanceof Object
let b = (new X()) instanceof X
let c= X instanceof Object
let d = X instanceof X

class X_right {
  // ...
}
let a_right = (new X_right()) instanceof Object
let b_right = (new X_right()) instanceof X_right
let c_right= X instanceof Object
let d_right = X_right instanceof X_right


export let other = 1;