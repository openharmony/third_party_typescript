interface I1 {
  i1p: number
}

class C1 {
  c1p: number

  constructor(p: number) {
    this.c1p = p;
  }
}

type tI1 = I1
type tC1 = C1
type tU1 = number | string

export type { tI1, tC1, tU1 }
