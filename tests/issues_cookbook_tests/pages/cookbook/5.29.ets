class Shape {}
class Circle extends Shape {x: number = 5}
class Square extends Shape {y: string = 'a'}
function createShape(): Shape {
  return new Circle()
}
let c1 = <Circle> createShape()
let c2 = createShape() as Circle
let c3 = createShape() as Square
console.log(c3.y)
let e1 = (5.0 as Number) instanceof Number
let e2 = (new Number(5.0)) instanceof Number


// right
class Shape_right {}
class Circle_right extends Shape_right {x: number = 5}
class Square_right extends Shape_right {y: string = 'a'}
function createShape_right(): Shape_right {
  return new Circle_right()
}
let c2_right = createShape_right() as Circle_right
let c3_right = createShape_right() as Square_right
let e2_right = (new Number(5.0)) instanceof Number


export let other = 1;