// wrong
class Mylmage { // ..
}

function readlmage(
  path: string, callback: (err: any, image: Mylmage) => void // should report
) {
  // ..
}

function readFileSync(path: string): number[] {
  return []
}
function decodelmageSync(contents : number[]){
  // ..
}
readlmage.sync = (path: string) => { // should report 3 error
  const contents = readFileSync(path)
  return decodelmageSync(contents)
}

  // right
class Mylmage_right {
  // ...
}

async function readlmage_right(
  path: string, callback: (err: Error, image: Mylmage_right) => void
): Promise<Mylmage_right> {
  // in real world, the implementation is more complex,
  // involving real network / DB logic,etc.
  return await new Mylmage_right() // should report 1 warning
}

function readlmageSync(path: string): Mylmage_right {
  return new Mylmage_right()
}


export let other = 1;