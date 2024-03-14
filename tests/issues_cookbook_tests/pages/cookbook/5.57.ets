namespace MyNamespace {
  export let x: number
}

let m = MyNamespace
m.x = 2



namespace MyNamespace_right {
  export let x: number
}

MyNamespace_right.x = 2


export let other = 1;