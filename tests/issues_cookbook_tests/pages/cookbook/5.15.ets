// wrong
interface I {
  new (s: string): I
}
function fn(i: I) {
  return new i('hello')
}


// right
interface I_right {
  create(s: string): I_right
}
function fn_right(i: I_right) {
  return i.create('hello')
}


export let other = 1;