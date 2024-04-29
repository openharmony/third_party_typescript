// Add rule arkts-sendable-definite-assignment

@Sendable
class A {
  public prop1!: string; // should report, arkts-sendable-definite-assignment
  constructor() {
    this.prop1 = ''
  }
}


export let other = 1;
