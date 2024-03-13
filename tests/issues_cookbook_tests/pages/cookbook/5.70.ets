// wrong
type Person = { // should report
  name: string
  age: number
  location: string
}
type QuantumPerson = Omit<Person, "location"> // should report
let persons: Record<string, Person> = {
  "Alice": {
    // should report
    name: "Alice", age: 32,
    location: "Shanghai"
  },
  "Bob": {
    // should report
    name: "Bob", age: 48,
    location: "New York"
  }
}
console.log(persons['Bob'].age.toString())
console.log(persons['Rob'].age.toString())


// right
class Person_right {
  name: string = ''
  age: number = 0
  location: string = ''
}
class QuantumPerson_right {
  name: string = ''
  age: number = 0
}
type OptionalPerson_right = Person_right | undefined
let persons_right: Record<string, OptionalPerson_right> = {
  "Alice": {
    name: "Alice",
    age: 32,
    location: "Shanghai"
  },
  "Bob": {
    name: "Bob", age: 48,
    location: "New York"
  }
}
console.log(persons_right["Bob"]!.age.toString())
if (persons_right["Rob"]) {
  console.log(persons_right["Rob"].age.toString())
}


export let other = 1;