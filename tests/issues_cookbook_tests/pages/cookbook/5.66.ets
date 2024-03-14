// wrong
class CustomError extends Error {
  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype) // should report 3 error
  }
}


// right
class CustomError_right extends Error {
  constructor(message?: string) {
    super(message)
    let result_boolean = this instanceof Error
  }
}
let ce = new CustomError_right()




export let other = 1;