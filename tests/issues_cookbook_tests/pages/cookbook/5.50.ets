function foo(x: number, y: number, z: number) {
  // ...
}

let args: [number, number, number] = [0, 1, 2];
foo(...args);

let point2d = { x: 1, y: 2 };
let point3d = { ...point2d, z: 3 };



function log_numbers(x: number, y: number, z: number) {
  // ...
}
let numbers: number[] = [1, 2, 3];
log_numbers(numbers[0], numbers[1], numbers[2]);
class Point2D {
  x: number = 0; y: number = 0
}
class Point3D {
  x: number = 0; y: number = 0; z: number = 0
  constructor(p2d: Point2D, z: number) {
    this.x = p2d.x;
    this.y = p2d.y;
    this.z = z;
  }
}
let p3d = new Point3D({ x: 1, y: 2 } as Point2D, 3);
class DerivedFromArray extends Uint16Array {};
let arr1 = [1, 2, 3];
let arr2 = new Uint16Array([4, 5, 6]);
let arr3 = new DerivedFromArray([7, 8, 9]);
let arr4 = [...arr1, 10, ...arr2, 11, ...arr3];


export let other = 1;