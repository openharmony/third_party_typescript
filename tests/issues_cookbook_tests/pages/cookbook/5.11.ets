// wrong
interface Identity {
  id: number
  name: string
}
interface Contact {
  email: string
  phoneNumber: string
}
type Employee = Identity & Contact // should report


// right
interface Identity_right {
  id: number
  name: string
}
interface Contact_right {
  email: string
  phoneNumber: string
}
interface Employee_right extends Identity_right, Contact_right {}


export let other = 1;