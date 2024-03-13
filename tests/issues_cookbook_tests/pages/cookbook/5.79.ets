// wrong
function classDecorator(x: any, y: any): void { // should report 2 error
  //
}
@classDecorator                                // should report 1 error and 1 warning
class BugReport {
}



export let other = 1;