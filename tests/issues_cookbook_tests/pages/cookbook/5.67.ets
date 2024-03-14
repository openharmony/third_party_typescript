// wrong
let x!: number
initialize()
function initialize() {
  x = 10
}
console.log('x = ' + x)


// right
function initialize_right(): number {
  return 10
}
let x_right: number = initialize_right()
console.log('x = ' + x_right)


export let other = 1;