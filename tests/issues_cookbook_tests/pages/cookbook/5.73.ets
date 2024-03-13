// wrong
let x = 'hello' as const           // should report
let y = [10, 20] as const          // should report
let z = { text: 'hello' } as const // should report 2error


// right
let x_right: string = 'hello'
let y_right: number[] = [10, 20]
class Label {
  text: string = ''
}
let z_right: Label = {
  text: 'hello'
}

export let other = 1;