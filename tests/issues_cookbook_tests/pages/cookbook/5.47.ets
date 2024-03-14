function foo(i: string) {
  this.count = i
}

class A {
  count: string = 'a'
  m = foo
}

let a = new A();
console.log(a.count);
a.m('b');
console.log(a.count);





class A_right {
  count: string = 'a'
  m(i: string): void {
    this.count = i;
  }
}

function main(): void {
  let a = new A_right();
  console.log(a.count);
  a.m('b');
  console.log(a.count);
}


export let other = 1;