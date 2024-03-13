// wrong
interface StringArray {
  [index: number]: string     // should report
}
function getStringArray(): StringArray {
  return ['a', 'b', 'c']
}
const myArray: StringArray = getStringArray()
const secondItem = myArray[1] // should report


// right
class X {
  public f: string[] = []
}
let myArray_right: X = new X()
const secondItem_right = myArray_right.f[1]


export let other = 1;