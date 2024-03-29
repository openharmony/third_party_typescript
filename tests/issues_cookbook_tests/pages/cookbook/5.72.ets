// wrong
const person = {                            // should report
  firstName: "aa",
  fullName: function (): string {           // should report 2 error
    return this.firstName
  }
}
const person1 = {                           // should report
  firstName: "Mary"
}
console.log(person.fullName.apply(person1)) // should report


// right
class Person_right {
  firstName: string
  constructor(firstName: string) {
    this.firstName = firstName
  }
  fullName(): string {
    return this.firstName
  }
}
let person_right = new Person_right('')
let person1_right = new Person_right('Mary')
console.log(person1_right.fullName())


export let other = 1;