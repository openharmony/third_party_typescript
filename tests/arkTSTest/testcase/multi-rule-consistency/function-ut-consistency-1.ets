// [Warnning]
// This testcase is used to ensure the consistency before and after the changes
// of the functions within the linter. Please make sure that you know what you
// are doing; otherwise, do not change the test results.

class Shape {}
class Circle extends Shape { public x: unknown = 5}
interface Paralle {
  pi: string
}
function createShape(param: Paralle): Shape {
  return new Circle()
}

let varIsObjAndRef = createShape({ pi: '' }) // create node isObject && isReference
let varIsObjAndRefAlias = varIsObjAndRef
let vShape = createShape({ pi: { x: (varIsObjAndRefAlias as Circle).x as unknown } as any })
let vShape2 = (vShape2Param?:(pp2:string)=>{})=>{}
class CShape3 {
  public pShape3a1 = createShape({ pi: { x: (varIsObjAndRefAlias as Circle).x as unknown } as any })
}