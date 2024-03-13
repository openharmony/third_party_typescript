//wrong
class C{
  n: number                       // should report Compile-time error only with strictPropertyinitialization
  s: string                       // should report Compile-time error only with strictPropertyinitialization
}
function foo(s: string): string { //should report
  if (s != '') {
    console.log(s)
    return s
  }
  else {
    console.log(s)
  }
}
let n: number = null              // should report Compile-time error only with strictNulliChecks


//right
class C_right {
  n: number = 0
  s: string = ''
}
function foo_right(s: string): string {
  console.log(s)
  return s
}
let n1: number | null = null
let n2: number = 0



export let other = 1;