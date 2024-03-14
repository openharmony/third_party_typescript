let o1 = {n: 42, s: 'foo'}
let o2: Object = {n: 42, s: 'foo'}
let o3: object = {n: 42, s: 'foo'}
let oo: Object[] = [{n: 1, s: '1'}, {n: 2, s: '2'}]
class C2 {
  s: string
  constructor(s: string) {
    this.s = 's =' + s
  }
}
let o4: C2 = {s: 'foo'}
class C3 {
  readonly n: number = 0
  readonly s: string = ''
}
let o5: C3 = {n: 42, s: 'foo'}
abstract class A {}
let o6: A = {}
class C4 {
  n: number = 0
  s: string = ''
  f() {
    console.log('Hello')
  }
}
let o7: C4 = {n: 42, s: 'foo', f: () => {}}
class Point {
  x: number = 0
  y: number = 0
}
function id_x_y(o: Point): Point {
  return o
}
// Structural typing is used to deduce that p is Point.
let p = {x: 5, y: 10}
id_x_y(p)

// A literal can be contextually (i.e., implicitly) typed as Point.
id_x_y({x: 5, y: 10})


export let other = 1;