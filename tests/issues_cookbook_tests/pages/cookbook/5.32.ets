class Point {
  x?: number = 0.0
  y?: number = 0.0
}

let p = new Point()
delete p.y



class Point_right {
  x: number | null = 0
  y: number | null = 0
}

let p_right = new Point_right()
p_right.y = null


export let other = 1;