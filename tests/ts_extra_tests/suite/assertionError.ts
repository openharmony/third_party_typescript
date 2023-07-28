export class AssertionError extends Error {
  protected msg: string | undefined = "";

  constructor(msg: string | undefined) {
    super();
    this.msg = msg;
  }
}
