// wrong
function f(shouldInitialize: boolean) {
  if (shouldInitialize) {
    var x = 'b'
  }
  return x           // should report
}
console.log(f(true))
console.log(f(false))
let upper_let = 0
{
  var scoped_var = 0 // should report
  let scoped_let = 0
  upper_let = 5
}
scoped_var = 5
scoped_let = 5       // should report


// right
function f_right(shouldInitialize: boolean): string {
  let x: string = 'a';
  if (shouldInitialize) {
    x = 'b';
  }
  return x;
}
console.log(f_right(true));
console.log(f_right(false));
let upper_let_right = 0
let scoped_var_right = 0
{
  let scoped_let_right = 0
  upper_let_right = 5
}
scoped_var_right = 5
scoped_let_right = 5


export let other = 1;