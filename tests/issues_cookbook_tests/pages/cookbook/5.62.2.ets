// wrong
export = Point // should report
class Point {
  constructor(x: number, y: number) {}
  static origin = new Point(0, 0)
}


export let other = 1;