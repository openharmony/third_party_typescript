class Person {
  name: string = ''
}
let p = new Person()

let b = 'name' in p



class Person_right {
  name: string = ''
}
let p_right = new Person_right()

let b_right = p_right instanceof Person_right


export let other = 1;