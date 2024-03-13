with (Math) { // Compile-time error, but JavaScript code can still be emitted.
  let r: number = 42;
  let area: number = PI * r * r;
}


let r: number = 42;
let area: number = Math.PI * r * r;


export let other = 1;