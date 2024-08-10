//@etsAnnotationsEnable: true
const enum E {
	A = 10,
	B = 20,
	C = 30
}

const enum E1 {
	A = "A",
	B = "B"
}

@interface Anno {
	a: number
	b = [(10 + 3), E.A]
	c: string
	d: boolean
	e: E[] = [E.A, E.B, E.C]
	f: number[]
	g: number[][][]
	h: E
	i: E[][][]
	j: E1
	k: E1[][][]
}


@Anno({a: E.A + 10, c: "a" + "b", d: (1 === 1), f: [], g: [[[0]]], h: E.A, i: [], j: E1.B, k: []})
class C{

	@Anno({a: 10, b: [1, 2, 3], c: "cde", d: true, f: [1], g:[[[0], [1]]], h: E.A, i: [[[E.A], [E.B]]], j: E1.B, k: [[[E1.A], [E1.B]]]})
	public foo() {}
}