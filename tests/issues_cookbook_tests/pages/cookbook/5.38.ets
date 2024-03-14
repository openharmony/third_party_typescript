class Point {
  x: number = 0.0
  y: number = 0.0
}

function returnZeroPoint(): Point {
  return new Point()
}

let {x, y} = returnZeroPoint()


class Point_right {
  x: number = 0.0
  y: number = 0.0
}

function returnZeroPoint_right(): Point_right {
  return new Point_right()
}

// Create an intermediate object and work with it field by field without name restrictions.
let zp = returnZeroPoint_right()
let x_right = zp.x
let y_right = zp.y


export let other = 1;