import { foo, bar } from './attached/5.82_attached1'

let e0: ESObject = foo(); // should report 1 warning

function f() {
  let e1 = foo();         // should report
  let e2: ESObject = 1;   // should report 1 warning
  let e3: ESObject = {};  // should report 1 warning
  let e4: ESObject = [];  // should report 1 warning
  let e5: ESObject = '';  // should report 1 warning
  e5['prop'];             // should report 1 warning
  e5[1];                  // should report 1 warning
  e5.prop;                // should report 1 warning
  let e6: ESObject = foo();
  let e7 = e6;            // should report 1 warning

  bar(e7);
}


export let other = 1;