class T {
  public name: string = ''
  public greet(): void {
    console.log("Hello, " + this.name)
  }
}
class U {
  public name: string = ''
  public greet(): void {
    console.log("Greetings, " + this.name)
  }
}

// wrong
let u: U = new T() // should report
function greeter(u: U) {
  console.log("To " + u.name)
  u.greet()
}
let t: T = new T()
greeter(t) // should report


//right
let t1: T = new T()
let u1: U = new U()


export let other = 1;