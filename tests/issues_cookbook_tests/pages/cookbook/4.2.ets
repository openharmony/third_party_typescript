class Point {
  public x: number = 0
  public y: number = 0
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

// wrong
let p1 = new Point(1.0, 1.0)
delete p1.x // should report
delete (p1 as any).x // should report

let p2 = new Point(2.0, 2.0)
p2.z = "Label"; // should NOT report
(p2 as any).z = "Label" // should report

let p3 = new Point(3.0, 3.0)
let prop = Symbol(); // should report
(p3 as any)[prop] = p3.x // should report
p3[prop] = p3.x // should report

let p4 = new Point(4.0, 4.0)
p4.x = "Hello!";
(p4 as any).x = "Hello!" // should report

function distance(p1: Point, p2: Point): number {
  return Math.sqrt(
    (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y)
  )
}

// right
let p5 = new Point(5.0, 5.0)
let p6 = new Point(6.0, 6.0)
console.log("Distance between p5 and p6: " + distance(p5, p6))


export let other = 1;