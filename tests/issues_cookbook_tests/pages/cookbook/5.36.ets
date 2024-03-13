let [one, two] = [1, 2]; // Semicolon is required here
[one, two] = [two, one]

let head, tail
[head, ...tail] = [1, 2, 3, 4]



let arr: number[] = [1, 2]
let one_right = arr[0]
let two_right = arr[1]

let tmp = one_right
one_right = two_right
two_right = tmp

let data: Number[] = [1, 2, 3, 4]
let head_right = data[0]
let tail_right: Number[] = []
for (let i = 1; i < data.length; ++i) {
  tail_right.push(data[i])
}


export let other = 1;