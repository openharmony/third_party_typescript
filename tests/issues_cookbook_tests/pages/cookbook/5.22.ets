let o: {x: number, y: number} = {
  x: 2,
  y: 3
}

type S = Set<{x: number, y: number}>



class O {
  x: number = 0
  y: number = 0
}

let o_right: O = {x: 2, y: 3}

type S_right = Set<O>


export let other = 1;