function choose<T>(x: T, y: T): T {
  return Math.random() < 0.5 ? x: y
}

let x = choose(10, 20)   // OK. choose<number>(...) is inferred.
let y = choose('10', 20) // Compile-time error

function greet<T>(): T {
  return 'Hello' as T
}
let z = greet() // Type of T is inferred as "unknown".


// right
function choose_right<T>(x: T, y: T): T {
  return Math.random() < 0.5 ? x: y
}

let x_right = choose_right(10, 20) // OK. choose<number>(...) is inferred.
let y_right = choose_right('10', 20) // Compile-time error

function greet_right<T>(): T {
  return 'Hello' as T
}
let z_right = greet_right<string>()


export let other = 1;