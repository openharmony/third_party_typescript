type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean
}

class C {
  n: number = 0
  s: string = ''
}

class CFlags {
  n: boolean = false
  s: boolean = false
}


export let other = 1;