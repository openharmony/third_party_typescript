interface I1 { name: string }
interface I2 { name: string }

// Call
function greet(this: I1, greeting: string) {
    console.log("$(greeting).$(this.name)!");
}
const person: I2 = {
    name: 'Alice'
}
greet.call(person, 'Hello'); // should report error: arkts-no-func-apply-call

// Bind
function introduce(age: number) {
    console.log('$(this.name),${age} years old.')
}
const newUser: I2 = {
    name: 'Bob'
}
const boundintroduce = introduce.bind(newUser); // should report 1 war: arkts-no-func-bind, 1 error: arkts-no-any-unknown
boundintroduce(30);

// Apply
function displayInfo(this: I1, city: string, country: string) {
    console.log('${this.name} lives in ${city}, ${country}.');
}
const user: I2 = { name: 'Emma' }
const infoContext = ['New York', 'USA'];
displayInfo.apply(user, infoContext); // should report error; arkts-no-func-apply-call export let other - 1;


export let other = 1;