// wrong
type Point = {
  x: number,
  y: number
}
type N = Point['x']


// right
class Point_right {
  x: number = 0;
  y: number = 0
}
type N_right = number


export let other = 1;