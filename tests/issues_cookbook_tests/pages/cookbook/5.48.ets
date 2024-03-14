function* counter(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

for (let num of counter(1, 5)) {
  console.log(num.toString())
}

async function complexNumberProcessing(str: string): Promise<string> {
  // ...
  return str
}

async function foo() {
  for (let i = 1; i <= 5; i++) {
    console.log(await complexNumberProcessing(i.toString()))
  }
}

foo()


export let other = 1;