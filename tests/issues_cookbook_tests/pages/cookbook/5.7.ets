// wrong
type DescribableFunction = { // should report
  description: string
  (someArg: string): string  // should report
}

function doSomething(fn: DescribableFunction): void {
  console.log(fn.description + ' returned ' + fn('6'))
}


// right
class DescribableFunction_right {
  description: string

  public invoke(someArg: string): string {
    return someArg
  }

  constructor() {
    this.description = 'desc'
  }
}

function doSomething_right(fn: DescribableFunction_right): void {
  console.log(fn.description + ' returned ' + fn.invoke('6'))
}

doSomething_right(new DescribableFunction_right())


export let other = 1;