// wrong
class Person {
  constructor(
    protected ssn: string,     // should report
    private firstName: string, // should report
    private lastName: string   // should report
  ) {
    this.ssn = ssn
    this.firstName = firstName
    this.lastName = lastName
  }
  getFullName(): string {
    return this.firstName + ' ' + this.lastName
  }
}


// right
class Person_right {
  protected ssn: string
  private firstName: string
  private lastName: string
  constructor(ssn: string, firstName: string, lastName: string) {
    this.ssn = ssn
    this.firstName = firstName
    this.lastName = lastName
  }
  getFullName(): string {
    return this.firstName + ' ' + this.lastName
  }
}


export let other = 1;