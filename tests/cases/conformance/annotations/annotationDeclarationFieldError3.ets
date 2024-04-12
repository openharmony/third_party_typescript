//@etsAnnotationsEnable: true
// @experimentalDecorators: true
function foo(target: any, key: string) {}

@interface Anno {
    @foo a: number
}