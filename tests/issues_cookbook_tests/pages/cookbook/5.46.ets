function addNum(a: number, b: number): void {

  // Nested function
  function logToConsole(message: string): void {
    console.log(message)
  }

  let result = a + b

  // Invoke the nested function.
  logToConsole('result is ' + result)
}




function addNum_right(a: number, b: number): void {
  // Use lambda instead of a nested function.
  let logToConsole: (message: string) => void = (message: string): void => {
    console.log(message)
  }

  let result = a + b

  logToConsole('result is ' + result)
}


export let other = 1;