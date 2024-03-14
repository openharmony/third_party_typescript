// wrong
var x_wrong = { "name": 1, 2: 3 } // should report 4 error
console.log(x_wrong["name"]) // should report
console.log(x_wrong[2]) // should report


// right
class X {
  public name: number = 0
}
let x: X = { name: 1 }
console.log(x.name)
let y = [1, 2, 3]
console.log(y[2])
let z = new Map<Object, number>()
z.set("name", 1)
z.set(2, 2)
console.log(z.get("name"))
console.log(z.get(2))


export let other = 1;