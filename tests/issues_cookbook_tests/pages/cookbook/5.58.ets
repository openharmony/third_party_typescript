
namespace A {
  export let x: number
  x = 1
}


namespace A_right {
  export let x: number

  export function init() {
    x = 1
  }
}

A_right.init()


export let other = 1;