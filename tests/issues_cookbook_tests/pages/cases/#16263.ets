// Add rule arkts-sendable-definite-assignment

@Sendable
class A {
  public prop1!: string; // should report, arkts-sendable-definite-assignment
}


export let other = 1;
