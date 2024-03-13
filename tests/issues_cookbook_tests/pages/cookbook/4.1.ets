class CallResult {
  public succeeded(): boolean {
    return true
  }

  public errorMessage(): string {
    return "123"
  }
}

function some_api_function(s1: string, s2: string): CallResult {
  return new CallResult();
}

//wrong
let res: any = some_api_function("hello", "world") // should report

//right
let res1: CallResult = some_api_function("hello", "world")
if (!res.succeeded()) {
  console.log("Call failed: " + res.errorMessage())
}


export let other = 1;