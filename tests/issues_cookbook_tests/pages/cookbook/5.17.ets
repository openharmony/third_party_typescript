class Point {
  x: string = ''
  y: string = ''
}
let p: Point = {x: '1', y: '2'}
console.log(p['x'])

class Person {
  name: string = ''
  age: number = 0; // A semicolon is required here.
  [key: string]: string | number // should report
}

let person: Person = {
  name: 'John',
  age: 30,
  email: '***@example.com',
  phoneNumber: '18*********',
}


class Point_right {
  x: string = ''
  y: string = ''
}
let p_right: Point_right = {x: '1', y: '2'}
console.log(p_right.x)

class Person_right {
  name: string
  age: number
  email: string
  phoneNumber: string

  constructor(name: string, age: number, email: string,
              phoneNumber: string) {
    this.name = name
    this.age = age
    this.email = email
    this.phoneNumber = phoneNumber
  }
}

let person_right = new Person_right('John', 30, '***@example.com', '18*********');
console.log(person_right['name']); // Compile-time error
console.log(person_right.unknownProperty); // Compile-time error

let arr = new Int32Array(1);
arr[0];


export let other = 1;