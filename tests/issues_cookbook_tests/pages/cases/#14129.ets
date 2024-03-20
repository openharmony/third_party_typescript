namespace A {
    export interface I { x: number }; //此处应该报错，实际上因为此处分号被视作独立语句,同下语句。
    ;;;

    class C {
        a() {
            let z = 1;
            /*start*/
            let a1: I = { x: 1 };
            return a1.x + 10; /*end*/
        }

        aa: number;
    }
}
let num = 123;;;


export let other = 1;