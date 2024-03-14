interface X {}

interface X1 {}

declare namespace DragControllerParam {
    export { X }// arkts-no-ns-statements

    export type Y = X1
}
declare namespace N {
    export function bar(): void

    function foo(): void;

    export { foo }
}


export let other = 1;