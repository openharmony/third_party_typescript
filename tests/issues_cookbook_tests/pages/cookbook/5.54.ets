class Person {
  constructor(
    name: string,
    age: number
  ) {}
}
type PersonCtor = new (name: string, age: number) => Person

function createPerson(Ctor: PersonCtor, name: string, age: number): Person
{
  return new Ctor(name, age)
}

const person = createPerson(Person, 'John', 30)



class Person_right {
  constructor(
    name: string,
    age: number
  ) {}
}
type PersonCtor_right = (n: string, a: number) => Person_right

function createPerson_right(Ctor: PersonCtor_right, n: string, a: number): Person_right {
  return Ctor(n, a)
}

let Impersonizer_right: PersonCtor_right = (n: string, a: number): Person_right => {
  return new Person_right(n, a)
}

const person_right = createPerson_right(Impersonizer_right, 'John', 30)


export let other = 1;